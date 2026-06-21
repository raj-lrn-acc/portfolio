<script lang="ts">
	import { browser } from '$app/environment';

	let cleanup: (() => void) | undefined;

	function mountCanvas(node: HTMLCanvasElement) {
		if (!browser) return;

		let animId: number;
		let scene: any, camera: any, renderer: any, composer: any;
		let particles: any, shapes: any, torusKnot: any, rings: any;
		let isDragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0, dragRotX = 0, dragRotY = 0;
		let mouseX = 1, mouseY = 0;
		let time = 0;

		async function init() {
			const THREE = await import('three');
			const pp = await import('postprocessing');

			const w = window.innerWidth;
			const h = window.innerHeight;

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 50);
			camera.position.set(0, 0, 6);

			renderer = new THREE.WebGLRenderer({
				canvas: node,
				antialias: true,
				alpha: true,
				powerPreference: 'high-performance'
			});
			renderer.setSize(w, h);
			renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
			renderer.setClearColor(0x212121, 0);

			composer = new pp.EffectComposer(renderer);
			composer.addPass(new pp.RenderPass(scene, camera));
			composer.addPass(new pp.EffectPass(camera, new pp.BloomEffect({
				intensity: 0.25, radius: 0.5, threshold: 0.6
			})));

			scene.add(new THREE.AmbientLight(0xffffff, 0.2));
			const l1 = new THREE.PointLight(0xefded9, 0.4, 20);
			l1.position.set(5, 5, 5);
			scene.add(l1);
			const l2 = new THREE.PointLight(0xffffff, 0.2, 20);
			l2.position.set(-5, -3, -5);
			scene.add(l2);

			const pCount = 2000;
			const pGeo = new THREE.BufferGeometry();
			const pPos = new Float32Array(pCount * 3);
			const pSiz = new Float32Array(pCount);
			for (let i = 0; i < pCount; i++) {
				pPos[i * 3] = (Math.random() - 0.5) * 40;
				pPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
				pPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
				pSiz[i] = 0.01 + Math.random() * 0.04;
			}
			pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
			pGeo.setAttribute('size', new THREE.BufferAttribute(pSiz, 1));
			particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
				color: 0xefded9, size: 0.04, transparent: true, opacity: 0.3,
				sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false
			}));
			scene.add(particles);

			shapes = new THREE.Group();
			const colors = [0xefded9, 0xd4c4bc, 0xc4b4ac, 0xe8d8d0, 0xf0e0d8];
			for (let i = 0; i < 10; i++) {
				const mesh = new THREE.Mesh(
					new THREE.IcosahedronGeometry(0.3, 0),
					new THREE.MeshPhysicalMaterial({
						color: colors[i % colors.length], transparent: true,
						opacity: 0.06 + Math.random() * 0.08, wireframe: true,
						metalness: 0.4, roughness: 0.3
					})
				);
				mesh.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, -2 - Math.random() * 8);
				mesh.scale.setScalar(0.5 + Math.random() * 1);
				mesh.userData = {
					rotSpeed: 0.003 + Math.random() * 0.012,
					basePos: mesh.position.clone(),
					depthFactor: 1 + mesh.position.z * 0.06
				};
				shapes.add(mesh);
			}
			scene.add(shapes);

			torusKnot = new THREE.Mesh(
				new THREE.TorusKnotGeometry(1.4, 0.4, 128, 16),
				new THREE.MeshPhysicalMaterial({
					color: 0xefded9, metalness: 0.2, roughness: 0.1,
					transparent: true, opacity: 0.1, wireframe: true,
					emissive: 0xefded9, emissiveIntensity: 0.06
				})
			);
			torusKnot.position.set(0, 0, -2);
			scene.add(torusKnot);

			rings = new THREE.Group();
			rings.position.set(0, 0, -3);
			for (let i = 0; i < 6; i++) {
				const ring = new THREE.Mesh(
					new THREE.RingGeometry(1.8 + i * 0.3, 1.82 + i * 0.3, 80),
					new THREE.MeshBasicMaterial({
						color: 0xefded9, transparent: true,
						opacity: 0.025 + i * 0.015, side: THREE.DoubleSide, depthWrite: false
					})
				);
				ring.rotation.x = Math.PI / 2 + (i / 6) * 0.3;
				ring.rotation.y = (i / 6) * Math.PI;
				rings.add(ring);
			}
			scene.add(rings);

			// Events
			node.addEventListener('pointerdown', (e: PointerEvent) => {
				isDragging = true; prevX = e.clientX; prevY = e.clientY;
				velX = 0; velY = 0;
				node.setPointerCapture(e.pointerId);
			});

			const onMove = (e: PointerEvent) => {
				mouseX = (e.clientX / window.innerWidth) * 2 - 1;
				mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
				if (isDragging) {
					const dx = e.clientX - prevX;
					const dy = e.clientY - prevY;
					dragRotY += dx * 0.005;
					dragRotX += dy * 0.005;
					velX = dx * 0.3; velY = dy * 0.3;
					prevX = e.clientX; prevY = e.clientY;
				}
			};
			const onUp = () => { isDragging = false; };
			window.addEventListener('pointermove', onMove);
			window.addEventListener('pointerup', onUp);

			const onResize = () => {
				const w = window.innerWidth;
				const h = window.innerHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
				composer.setSize(w, h);
			};
			window.addEventListener('resize', onResize);

			function animate() {
				animId = requestAnimationFrame(animate);
				time += 0.01;

				if (!isDragging) {
					velX *= 0.92; velY *= 0.92;
					dragRotY += velX * 0.002;
					dragRotX += velY * 0.002;
				}

				scene.rotation.x += (dragRotX - scene.rotation.x) * 0.06;
				scene.rotation.y += (dragRotY - scene.rotation.y) * 0.06;

				if (particles) {
					particles.rotation.y = time * 0.003;
					particles.rotation.x = mouseY * 0.005;
				}

				if (shapes?.children) {
					(shapes.children as any[]).forEach((mesh: any) => {
						const ud = mesh.userData;
						if (!ud.basePos) return;
						const df = ud.depthFactor || 1;
						mesh.position.x = ud.basePos.x + mouseX * df * 1.2;
						mesh.position.y = ud.basePos.y + mouseY * df * 1.0;
						mesh.rotation.x += ud.rotSpeed * 0.6;
						mesh.rotation.y += ud.rotSpeed;
					});
				}

				if (torusKnot) {
					torusKnot.position.x = mouseX * 0.5;
					torusKnot.position.y = mouseY * 0.4;
					torusKnot.rotation.x = time * 0.15 + mouseY * 0.08;
					torusKnot.rotation.y = time * 0.1 + mouseX * 0.08;
					torusKnot.position.y += Math.sin(time * 3) * 0.1;
				}

				if (rings) {
					rings.rotation.x = Math.sin(time * 0.06) * 0.08 + mouseY * 0.03;
					rings.rotation.y = time * 0.04 + mouseX * 0.03;
				}

				composer.render();
			}

			animate();

			cleanup = () => {
				cancelAnimationFrame(animId);
				window.removeEventListener('pointermove', onMove);
				window.removeEventListener('pointerup', onUp);
				window.removeEventListener('resize', onResize);
				renderer?.dispose();
				composer?.dispose();
			};
		}

		init();

		return {
			destroy() {
				cleanup?.();
			}
		};
	}
</script>

<canvas use:mountCanvas class="fixed inset-0 z-0 touch-none" style="touch-action: none"></canvas>

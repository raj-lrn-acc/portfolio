<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { viewState, detailProject } from '$lib/stores';
	import { projects } from '$lib/data';
	import type { Project } from '$lib/data';

	let cleanup: (() => void) | undefined;

	function mountCanvas(node: HTMLCanvasElement) {
		if (!browser) return;

		let animId: number;
		let THREE: typeof import('three');
		let pp: typeof import('postprocessing');
		let createBrain: typeof import('$lib/brain').createProceduralBrain;

		async function initThree() {
			THREE = await import('three');
			pp = await import('postprocessing');
			const brainMod = await import('$lib/brain');
			createBrain = brainMod.createProceduralBrain;
			setupScene();
		}
		initThree();

		function setupScene() {
			const w = window.innerWidth, h = window.innerHeight;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 80);
			camera.position.set(0, 0.5, 7);

			const renderer = new THREE.WebGLRenderer({ canvas: node, antialias: true, alpha: true, powerPreference: 'high-performance' });
			renderer.setSize(w, h);
			renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
			renderer.setClearColor(0x0a0a0a, 1);

			const composer = new pp.EffectComposer(renderer);
			composer.addPass(new pp.RenderPass(scene, camera));
			composer.addPass(new pp.EffectPass(camera, new pp.BloomEffect({ intensity: 0.35, radius: 0.6, threshold: 0.4 })));

			scene.add(new THREE.AmbientLight(0xffffff, 0.25));

			const key = new THREE.DirectionalLight(0xe0e0e0, 0.6);
			key.position.set(5, 8, 6);
			scene.add(key);
			const fill = new THREE.DirectionalLight(0x808080, 0.2);
			fill.position.set(-4, -2, -5);
			scene.add(fill);
			const rim = new THREE.DirectionalLight(0xffffff, 0.15);
			rim.position.set(0, -5, -4);
			scene.add(rim);

			const pCount = 1500;
			const pGeo = new THREE.BufferGeometry();
			const pPos = new Float32Array(pCount * 3);
			const pSiz = new Float32Array(pCount);
			for (let i = 0; i < pCount; i++) {
				pPos[i * 3] = (Math.random() - 0.5) * 40;
				pPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
				pPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
				pSiz[i] = 0.02 + Math.random() * 0.05;
			}
			pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
			pGeo.setAttribute('size', new THREE.BufferAttribute(pSiz, 1));
			const pMat = new THREE.PointsMaterial({ color: 0xe0e0e0, size: 0.04, transparent: true, opacity: 0.4, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false });
			const particles = new THREE.Points(pGeo, pMat);
			scene.add(particles);

			const brainMat = new THREE.MeshPhysicalMaterial({ color: 0xdddddd, metalness: 0.2, roughness: 0.06, clearcoat: 0.6, clearcoatRoughness: 0.2, transparent: true, opacity: 0, emissive: 0x444444, emissiveIntensity: 0.1 });
			const brain = createBrain(brainMat);
			brain.position.set(0, -0.2, 0);
			brain.scale.setScalar(0);
			scene.add(brain);

			const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false });
			const ring = new THREE.Mesh(new THREE.RingGeometry(3.6, 3.7, 64), ringMat);
			ring.rotation.x = -Math.PI / 2.5;
			ring.position.y = -0.5;
			scene.add(ring);

			const cardMeshes: THREE.Mesh[] = [];
			const cardGroups: THREE.Group[] = [];
			const cardVerts: { theta: number; y: number }[] = [];

			function cardTex(p: Project) {
				const c = document.createElement('canvas');
				c.width = 400; c.height = 260;
				const ctx = c.getContext('2d')!;
				ctx.fillStyle = '#141414';
				ctx.beginPath(); ctx.roundRect(0, 0, 400, 260, 14); ctx.fill();
				ctx.fillStyle = '#1c1c1c';
				ctx.beginPath(); ctx.roundRect(0, 0, 400, 90, [14, 14, 0, 0]); ctx.fill();
				ctx.fillStyle = p.color;
				ctx.fillRect(0, 0, 4, 90);
				ctx.fillStyle = '#e0e0e0';
				ctx.font = '500 22px "Inter", sans-serif';
				ctx.fillText(p.title, 22, 40);
				ctx.fillStyle = '#777';
				ctx.font = '300 14px "Inter", sans-serif';
				ctx.fillText(p.tagline, 22, 66);
				p.tags.forEach((tag, i) => {
					const x = 22 + i * (tag.length * 9 + 32);
					ctx.fillStyle = '#2a2a2a';
					ctx.beginPath(); ctx.roundRect(x, 106, tag.length * 9 + 20, 24, 12); ctx.fill();
					ctx.fillStyle = '#999';
					ctx.font = '12px "Inter", sans-serif';
					ctx.fillText(tag, x + 10, 122);
				});
				ctx.fillStyle = '#444';
				ctx.font = '300 13px "Inter", sans-serif';
				ctx.fillText(p.description.length > 100 ? p.description.slice(0, 97) + '...' : p.description, 22, 154);
				return new THREE.CanvasTexture(c);
			}

			projects.forEach((p, i) => {
				const tex = cardTex(p);
				tex.needsUpdate = true;
				const mesh = new THREE.Mesh(
					new THREE.PlaneGeometry(2.4, 1.6),
					new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })
				);
				mesh.userData.projectId = p.id;
				const angle = (i / projects.length) * Math.PI * 2;
				const yOff = (i % 3 - 1) * 1.0;
				const group = new THREE.Group();
				group.add(mesh);
				group.position.set(Math.sin(angle) * 3.8, yOff, Math.cos(angle) * 3.8);
				cardVerts.push({ theta: angle, y: yOff });
				cardMeshes.push(mesh);
				cardGroups.push(group);
				scene.add(group);
			});

			const cpCount = 800;
			const cpPos = new Float32Array(cpCount * 3);
			for (let i = 0; i < cpCount; i++) {
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.acos(2 * Math.random() - 1);
				const r = 2 + Math.random() * 1.5;
				cpPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
				cpPos[i * 3 + 1] = r * Math.cos(phi) * 0.4;
				cpPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
			}
			const cpGeo = new THREE.BufferGeometry();
			cpGeo.setAttribute('position', new THREE.BufferAttribute(cpPos, 3));
			const cpMat = new THREE.PointsMaterial({ color: 0xe0e0e0, size: 0.03, transparent: true, opacity: 0, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false });
			const contactP = new THREE.Points(cpGeo, cpMat);
			scene.add(contactP);

			let currentState = 'home';
			let bOp = 0, bSc = 0, cOp = 0, ctOp = 0;
			let rotY = 0, spd = 0.004, drag = 0;
			let dragging = false, px = 0, py = 0, totalMoved = 0, time = 0;

			const raycaster = new THREE.Raycaster();
			const ptr = new THREE.Vector2();

			const onDown = (e: PointerEvent) => {
				if (get(detailProject) !== null) return;
				if (currentState !== 'projects') return;
				dragging = true; px = e.clientX; py = e.clientY; totalMoved = 0; drag = 0;
				node.setPointerCapture(e.pointerId);
			};
			const onMove = (e: PointerEvent) => {
				if (!dragging || currentState !== 'projects') return;
				const dx = e.clientX - px;
				const dy = e.clientY - py;
				totalMoved += Math.abs(dx);
				drag = dx * 0.008;
				rotY += drag;
				px = e.clientX; py = e.clientY;
			};
			const onUp = (e: PointerEvent) => {
				dragging = false;
				if (currentState !== 'projects' || get(detailProject) !== null) return;
				if (totalMoved > 5) return;
				const rect = node.getBoundingClientRect();
				ptr.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
				ptr.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
				raycaster.setFromCamera(ptr, camera);
				const hits = raycaster.intersectObjects(cardMeshes);
				if (hits.length > 0 && hits[0].object.userData.projectId) {
					detailProject.set(hits[0].object.userData.projectId);
				}
			};

			node.addEventListener('pointerdown', onDown);
			window.addEventListener('pointermove', onMove);
			window.addEventListener('pointerup', onUp);

			const onResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
				composer.setSize(window.innerWidth, window.innerHeight);
			};

			const unsubView = viewState.subscribe(s => { currentState = s; });
			const unsubDet = detailProject.subscribe(() => {});

			function loop() {
				animId = requestAnimationFrame(loop);
				time += 0.016;

				const t = 0.04;
				if (currentState === 'home') {
					bOp += (0 - bOp) * t; bSc += (0 - bSc) * t; cOp += (0 - cOp) * t; ctOp += (0 - ctOp) * t;
					pMat.opacity += (0.25 - pMat.opacity) * t;
				} else if (currentState === 'projects') {
					bOp += (1 - bOp) * t; bSc += (1 - bSc) * t; cOp += (1 - cOp) * t; ctOp += (0 - ctOp) * t;
					pMat.opacity += (0.1 - pMat.opacity) * t;
				} else {
					bOp += (0 - bOp) * t; bSc += (0 - bSc) * t; cOp += (0 - cOp) * t; ctOp += (1 - ctOp) * t;
					pMat.opacity += (0.35 - pMat.opacity) * t;
				}

				brainMat.opacity = bOp;
				brain.scale.setScalar(bSc < 0.01 ? 0 : bSc);
				cardMeshes.forEach(m => { m.material.opacity = cOp; });
				cpMat.opacity = ctOp;

				if (bSc > 0.01) {
					const br = 1 + Math.sin(time * 0.8) * 0.008;
					brain.scale.setScalar(bSc * br);
					brain.position.y = -0.2 + Math.sin(time * 0.5) * 0.03;
					brainMat.emissiveIntensity = 0.08 + Math.sin(time * 1.2) * 0.04;
				}

				if (!dragging) drag *= 0.92;
				rotY += spd + drag;
				brain.rotation.y = rotY;

				cardGroups.forEach((g, i) => {
					const a = (i / projects.length) * Math.PI * 2 + rotY;
					const r = 3.8 + Math.sin(time * 0.3 + i) * 0.05;
					const y = cardVerts[i].y + Math.sin(time * 0.4 + i * 0.7) * 0.05;
					g.position.set(Math.sin(a) * r, y, Math.cos(a) * r);
					g.lookAt(camera.position);
				});

				ring.rotation.z = rotY * 0.1;
				ring.material.opacity = Math.max(bOp * 0.06, 0.02);
				particles.rotation.y = time * 0.002;
				contactP.rotation.y = time * 0.15;
				composer.render();
			}
			loop();

			cleanup = () => {
				cancelAnimationFrame(animId);
				node.removeEventListener('pointerdown', onDown);
				node.removeEventListener('pointerup', onUp);
				window.removeEventListener('pointermove', onMove);
				window.removeEventListener('resize', onResize);
				unsubView(); unsubDet();
				renderer?.dispose(); composer?.dispose();
			};
		}
	}

	onDestroy(() => { cleanup?.(); });
</script>

<canvas use:mountCanvas class="fixed inset-0 z-0 touch-none" style="touch-action: none"></canvas>

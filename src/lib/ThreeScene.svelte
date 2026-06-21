<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { mouse } from '$lib/stores';
	import * as THREE from 'three';
	import { EffectComposer, RenderPass, EffectPass, BloomEffect } from 'postprocessing';

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let composer: EffectComposer;
	let animId: number;
	let mounted = $state(false);

	let particles: THREE.Points;
	let shapes: THREE.Group;
	let torusKnot: THREE.Mesh;
	let rings: THREE.Group;

	let isDragging = false;
	let prevX = 0;
	let prevY = 0;
	let velX = 0;
	let velY = 0;
	let dragRotX = 0;
	let dragRotY = 0;

	let mouseX = 0;
	let mouseY = 0;

	const unsubMouse = mouse.subscribe(($m) => {
		mouseX = $m.x;
		mouseY = $m.y;
	});

	onMount(() => {
		mounted = true;
		init();
	});

	onDestroy(() => {
		unsubMouse();
		if (typeof cancelAnimationFrame !== 'undefined') {
			cancelAnimationFrame(animId);
		}
		renderer?.dispose();
		composer?.dispose();
	});

	function init() {
		const w = window.innerWidth;
		const h = window.innerHeight;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 50);
		camera.position.set(0, 0, 6);

		renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
			powerPreference: 'high-performance'
		});
		renderer.setSize(w, h);
		renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
		renderer.setClearColor(0x212121, 0);

		composer = new EffectComposer(renderer);
		composer.addPass(new RenderPass(scene, camera));
		composer.addPass(new EffectPass(camera, new BloomEffect({
			intensity: 0.25,
			radius: 0.5,
			threshold: 0.6
		})));

		const ambient = new THREE.AmbientLight(0xffffff, 0.2);
		scene.add(ambient);
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
			color: 0xefded9,
			size: 0.04,
			transparent: true,
			opacity: 0.3,
			sizeAttenuation: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		}));
		scene.add(particles);

		shapes = new THREE.Group();
		const colors = [0xefded9, 0xd4c4bc, 0xc4b4ac, 0xe8d8d0, 0xf0e0d8];
		for (let i = 0; i < 10; i++) {
			const mesh = new THREE.Mesh(
				new THREE.IcosahedronGeometry(0.3, 0),
				new THREE.MeshPhysicalMaterial({
					color: colors[i % colors.length],
					transparent: true,
					opacity: 0.06 + Math.random() * 0.08,
					wireframe: true,
					metalness: 0.4,
					roughness: 0.3
				})
			);
			mesh.position.set(
				(Math.random() - 0.5) * 12,
				(Math.random() - 0.5) * 8,
				-2 - Math.random() * 8
			);
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
				color: 0xefded9,
				metalness: 0.2,
				roughness: 0.1,
				transparent: true,
				opacity: 0.1,
				wireframe: true,
				emissive: 0xefded9,
				emissiveIntensity: 0.06
			})
		);
		torusKnot.position.set(0, 0, -2);
		scene.add(torusKnot);

		rings = new THREE.Group();
		rings.position.set(0, 0, -3);
		for (let i = 0; i < 6; i++) {
			const mesh = new THREE.Mesh(
				new THREE.RingGeometry(1.8 + i * 0.3, 1.82 + i * 0.3, 80),
				new THREE.MeshBasicMaterial({
					color: 0xefded9,
					transparent: true,
					opacity: 0.025 + i * 0.015,
					side: THREE.DoubleSide,
					depthWrite: false
				})
			);
			mesh.rotation.x = Math.PI / 2 + (i / 6) * 0.3;
			mesh.rotation.y = (i / 6) * Math.PI;
			rings.add(mesh);
		}
		scene.add(rings);

		canvas.addEventListener('pointerdown', (e: PointerEvent) => {
			isDragging = true;
			prevX = e.clientX;
			prevY = e.clientY;
			velX = 0;
			velY = 0;
			canvas.setPointerCapture(e.pointerId);
		});

		window.addEventListener('pointermove', (e: PointerEvent) => {
			mouse.set({
				x: (e.clientX / window.innerWidth) * 2 - 1,
				y: -(e.clientY / window.innerHeight) * 2 + 1,
				dx: e.movementX,
				dy: e.movementY
			});
			if (isDragging) {
				const dx = e.clientX - prevX;
				const dy = e.clientY - prevY;
				dragRotY += dx * 0.005;
				dragRotX += dy * 0.005;
				velX = dx * 0.3;
				velY = dy * 0.3;
				prevX = e.clientX;
				prevY = e.clientY;
			}
		});

		window.addEventListener('pointerup', () => { isDragging = false; });

		window.addEventListener('resize', () => {
			const w = window.innerWidth;
			const h = window.innerHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
			composer.setSize(w, h);
		});

		let time = 0;

		function animate() {
			animId = requestAnimationFrame(animate);
			time += 0.01;

			if (!isDragging) {
				velX *= 0.92;
				velY *= 0.92;
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
				(shapes.children as THREE.Mesh[]).forEach((mesh) => {
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
	}
</script>

{#if mounted}
	<canvas bind:this={canvas} class="fixed inset-0 z-0 touch-none" style="touch-action: none"></canvas>
{/if}

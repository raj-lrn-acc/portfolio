<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { mouse, scroll } from '$lib/stores';
	import * as THREE from 'three';
	import { EffectComposer, RenderPass, EffectPass, BloomEffect } from 'postprocessing';

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let composer: EffectComposer;
	let animId: number;

	// Objects
	let particles: THREE.Points;
	let shapes: THREE.InstancedMesh | THREE.Mesh[] = [];
	let torusKnot: THREE.Mesh;
	let rings: THREE.Group;

	// Drag state
	let isDragging = false;
	let prevX = 0;
	let prevY = 0;
	let velX = 0;
	let velY = 0;
	let dragRotX = 0;
	let dragRotY = 0;

	// Mouse state
	let mouseX = 0;
	let mouseY = 0;

	const unsubMouse = mouse.subscribe(($m) => {
		mouseX = $m.x;
		mouseY = $m.y;
	});

	onMount(() => {
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

		// Scene
		scene = new THREE.Scene();

		// Camera
		camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 50);
		camera.position.set(0, 0, 6);

		// Renderer
		renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
			powerPreference: 'high-performance'
		});
		renderer.setSize(w, h);
		renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
		renderer.setClearColor(0x212121, 0);

		// Post-processing
		composer = new EffectComposer(renderer);
		composer.addPass(new RenderPass(scene, camera));
		const bloom = new BloomEffect({
			intensity: 0.25,
			radius: 0.5,
			threshold: 0.6
		});
		composer.addPass(new EffectPass(camera, bloom));

		// Lights
		const ambient = new THREE.AmbientLight(0xffffff, 0.2);
		scene.add(ambient);
		const light1 = new THREE.PointLight(0xefded9, 0.4, 20);
		light1.position.set(5, 5, 5);
		scene.add(light1);
		const light2 = new THREE.PointLight(0xffffff, 0.2, 20);
		light2.position.set(-5, -3, -5);
		scene.add(light2);

		// Create scene objects
		createParticles();
		createFloatingShapes();
		createTorusKnot();
		createRings();

		// Events
		canvas.addEventListener('pointerdown', onPointerDown);
		canvas.addEventListener('pointermove', onPointerMove);
		canvas.addEventListener('pointerup', onPointerUp);
		canvas.addEventListener('pointerleave', onPointerUp);
		window.addEventListener('resize', onResize);

		animate();
	}

	function createParticles() {
		const count = 2000;
		const geo = new THREE.BufferGeometry();
		const pos = new Float32Array(count * 3);
		const sizes = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			pos[i * 3] = (Math.random() - 0.5) * 40;
			pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
			pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
			sizes[i] = 0.01 + Math.random() * 0.04;
		}
		geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
		geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

		const mat = new THREE.PointsMaterial({
			color: 0xefded9,
			size: 0.04,
			transparent: true,
			opacity: 0.3,
			sizeAttenuation: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		particles = new THREE.Points(geo, mat);
		scene.add(particles);
	}

	function createFloatingShapes() {
		const group = new THREE.Group();
		const colors = [0xefded9, 0xd4c4bc, 0xc4b4ac, 0xe8d8d0, 0xf0e0d8];
		for (let i = 0; i < 10; i++) {
			const geo = new THREE.IcosahedronGeometry(0.3, 0);
			const mat = new THREE.MeshPhysicalMaterial({
				color: colors[i % colors.length],
				transparent: true,
				opacity: 0.06 + Math.random() * 0.08,
				wireframe: true,
				metalness: 0.4,
				roughness: 0.3
			});
			const mesh = new THREE.Mesh(geo, mat);
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
			group.add(mesh);
		}
		shapes = group;
		scene.add(group);
	}

	function createTorusKnot() {
		const geo = new THREE.TorusKnotGeometry(1.4, 0.4, 128, 16);
		const mat = new THREE.MeshPhysicalMaterial({
			color: 0xefded9,
			metalness: 0.2,
			roughness: 0.1,
			transparent: true,
			opacity: 0.1,
			wireframe: true,
			emissive: 0xefded9,
			emissiveIntensity: 0.06
		});
		torusKnot = new THREE.Mesh(geo, mat);
		torusKnot.position.set(0, 0, -2);
		scene.add(torusKnot);
	}

	function createRings() {
		rings = new THREE.Group();
		rings.position.set(0, 0, -3);
		for (let i = 0; i < 6; i++) {
			const geo = new THREE.RingGeometry(1.8 + i * 0.3, 1.82 + i * 0.3, 80);
			const mat = new THREE.MeshBasicMaterial({
				color: 0xefded9,
				transparent: true,
				opacity: 0.025 + i * 0.015,
				side: THREE.DoubleSide,
				depthWrite: false
			});
			const mesh = new THREE.Mesh(geo, mat);
			mesh.rotation.x = Math.PI / 2 + (i / 6) * 0.3;
			mesh.rotation.y = (i / 6) * Math.PI;
			rings.add(mesh);
		}
		scene.add(rings);
	}

	function onPointerDown(e: PointerEvent) {
		isDragging = true;
		prevX = e.clientX;
		prevY = e.clientY;
		velX = 0;
		velY = 0;
		canvas.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		// Update mouse store for parallax (normalized -1 to 1)
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
	}

	function onPointerUp() {
		isDragging = false;
	}

	function onResize() {
		const w = window.innerWidth;
		const h = window.innerHeight;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h);
		composer.setSize(w, h);
	}

	let time = 0;

	function animate() {
		animId = requestAnimationFrame(animate);
		time += 0.01;

		// Inertia
		if (!isDragging) {
			velX *= 0.92;
			velY *= 0.92;
			dragRotY += velX * 0.002;
			dragRotX += velY * 0.002;
		}

		// Scene rotation (from drag)
		const sceneTarget = scene;
		sceneTarget.rotation.x += (dragRotX - sceneTarget.rotation.x) * 0.06;
		sceneTarget.rotation.y += (dragRotY - sceneTarget.rotation.y) * 0.06;

		// Particles
		if (particles) {
			particles.rotation.y = time * 0.003;
			particles.rotation.x = mouseY * 0.005;
		}

		// Floating shapes parallax
		if (shapes && shapes.children) {
			(shapes.children as THREE.Mesh[]).forEach((mesh) => {
				if (!mesh.userData.basePos) return;
				const bp = mesh.userData.basePos;
				const df = mesh.userData.depthFactor || 1;
				mesh.position.x = bp.x + mouseX * df * 1.2;
				mesh.position.y = bp.y + mouseY * df * 1.0;
				mesh.rotation.x += mesh.userData.rotSpeed * 0.6;
				mesh.rotation.y += mesh.userData.rotSpeed;
			});
		}

		// Torus knot
		if (torusKnot) {
			torusKnot.position.x = mouseX * 0.5;
			torusKnot.position.y = mouseY * 0.4;
			torusKnot.rotation.x = time * 0.15 + mouseY * 0.08;
			torusKnot.rotation.y = time * 0.1 + mouseX * 0.08;
			torusKnot.position.y += Math.sin(time * 3) * 0.1;
		}

		// Rings
		if (rings) {
			rings.rotation.x = Math.sin(time * 0.06) * 0.08 + mouseY * 0.03;
			rings.rotation.y = time * 0.04 + mouseX * 0.03;
		}

		composer.render();
	}
</script>

<canvas
	bind:this={canvas}
	class="fixed inset-0 z-0 touch-none"
	style="touch-action: none"
></canvas>

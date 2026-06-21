<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { viewState, detailProject } from '$lib/stores';
	import { projects } from '$lib/data';

	let cleanup: (() => void) | undefined;

	function mountCanvas(node: HTMLCanvasElement) {
		if (!browser) return;

		let T: typeof import('three'), PP: typeof import('postprocessing'), crBrain: Function;

		(async () => {
			T = await import('three');
			PP = await import('postprocessing');
			crBrain = (await import('$lib/brain')).createBrain;
			start();
		})();

		function start() {
			const w = window.innerWidth, h = window.innerHeight;

			const scene = new T.Scene();
			scene.background = new T.Color(0x0a0a0a);

			const camera = new T.PerspectiveCamera(55, w / h, 0.1, 60);
			camera.position.set(0, 0.3, 6.5);

			const renderer = new T.WebGLRenderer({ canvas: node, antialias: true });
			renderer.setSize(w, h);
			renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

			const composer = new PP.EffectComposer(renderer);
			composer.addPass(new PP.RenderPass(scene, camera));
			composer.addPass(new PP.EffectPass(camera, new PP.BloomEffect({ intensity: 0.3, radius: 0.5, threshold: 0.5 })));

			const al = new T.AmbientLight(0xffffff, 0.3);
			scene.add(al);
			const dl = new T.DirectionalLight(0xe0e0e0, 0.8);
			dl.position.set(4, 6, 5);
			scene.add(dl);
			const fl = new T.DirectionalLight(0x666666, 0.2);
			fl.position.set(-3, -2, -4);
			scene.add(fl);

			/* Particles */
			const pN = 1200;
			const pg = new T.BufferGeometry();
			const ppa = new Float32Array(pN * 3);
			for (let i = 0; i < pN; i++) {
				ppa[i * 3] = (Math.random() - 0.5) * 50;
				ppa[i * 3 + 1] = (Math.random() - 0.5) * 30;
				ppa[i * 3 + 2] = (Math.random() - 0.5) * 30 - 8;
			}
			pg.setAttribute('position', new T.BufferAttribute(ppa, 3));
			const pm = new T.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.3, sizeAttenuation: true, blending: T.AdditiveBlending, depthWrite: false });
			const pts = new T.Points(pg, pm);
			scene.add(pts);

			/* Brain */
			const bm = new T.MeshPhysicalMaterial({ color: 0xcccccc, metalness: 0.15, roughness: 0.08, clearcoat: 0.5, clearcoatRoughness: 0.2, transparent: true, opacity: 0, emissive: 0x444444, emissiveIntensity: 0.05 });
			const brain = crBrain(bm);
			brain.scale.setScalar(0);
			brain.position.y = -0.2;
			scene.add(brain);

			/* Cards — small squares */
			const cardMeshes: T.Mesh[] = [];
			const cardGroups: T.Group[] = [];
			const cardData: { a: number; y: number }[] = [];

			function makeTex(p: { title: string; color: string; tagline: string }) {
				const c = document.createElement('canvas');
				c.width = 200; c.height = 200;
				const ctx = c.getContext('2d')!;
				ctx.fillStyle = '#181818';
				ctx.beginPath(); ctx.roundRect(0, 0, 200, 200, 10); ctx.fill();
				ctx.fillStyle = p.color;
				ctx.fillRect(0, 0, 200, 3);
				ctx.fillStyle = '#e8e8e8';
				ctx.font = '500 15px "Inter", sans-serif';
				ctx.fillText(p.title, 12, 38);
				ctx.fillStyle = '#666';
				ctx.font = '300 10px "Inter", sans-serif';
				const t = p.tagline.length > 28 ? p.tagline.slice(0, 25) + '…' : p.tagline;
				ctx.fillText(t, 12, 56);
				return new T.CanvasTexture(c);
			}

			projects.forEach((p, i) => {
				const tex = makeTex(p);
				tex.needsUpdate = true;
				const mesh = new T.Mesh(
					new T.PlaneGeometry(1.4, 1.4),
					new T.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, side: T.DoubleSide })
				);
				mesh.userData.projectId = p.id;
				const a = (i / projects.length) * Math.PI * 2;
				const y = (i % 3 - 1) * 0.8;
				const grp = new T.Group();
				grp.add(mesh);
				grp.position.set(Math.sin(a) * 3.2, y, Math.cos(a) * 3.2);
				cardData.push({ a, y });
				cardMeshes.push(mesh);
				cardGroups.push(grp);
				scene.add(grp);
			});

			/* Contact ring */
			const cn = 600;
			const cg = new T.BufferGeometry();
			const ca = new Float32Array(cn * 3);
			for (let i = 0; i < cn; i++) {
				const t = Math.random() * Math.PI * 2;
				const p = Math.acos(2 * Math.random() - 1);
				const r = 1.8 + Math.random() * 1.2;
				ca[i * 3] = r * Math.sin(p) * Math.cos(t);
				ca[i * 3 + 1] = Math.cos(p) * 0.6;
				ca[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
			}
			cg.setAttribute('position', new T.BufferAttribute(ca, 3));
			const cpm = new T.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0, sizeAttenuation: true, blending: T.AdditiveBlending, depthWrite: false });
			const cp = new T.Points(cg, cpm);
			scene.add(cp);

			/* State */
			let state = 'home', bO = 0, bS = 0, cO = 0, ctO = 0, rot = 0, spd = 0.004, dragV = 0, drag = false, px = 0, totalMove = 0, t = 0;

			const onDown = (e: PointerEvent) => {
				if (get(detailProject) !== null || state !== 'projects') return;
				drag = true; px = e.clientX; totalMove = 0; dragV = 0;
				node.setPointerCapture(e.pointerId);
			};
			const onMove = (e: PointerEvent) => {
				if (!drag || state !== 'projects') return;
				const dx = e.clientX - px;
				totalMove += Math.abs(dx);
				dragV = dx * 0.006;
				rot += dragV;
				px = e.clientX;
			};
			const onUp = (e: PointerEvent) => {
				drag = false;
				if (state !== 'projects' || get(detailProject) !== null || totalMove > 3) return;
				const rc = new T.Raycaster();
				const mp = new T.Vector2(
					((e.clientX - node.getBoundingClientRect().left) / node.clientWidth) * 2 - 1,
					-((e.clientY - node.getBoundingClientRect().top) / node.clientHeight) * 2 + 1
				);
				rc.setFromCamera(mp, camera);
				const hits = rc.intersectObjects(cardMeshes);
				if (hits.length && hits[0].object.userData.projectId) detailProject.set(hits[0].object.userData.projectId);
			};
			node.addEventListener('pointerdown', onDown);
			window.addEventListener('pointermove', onMove);
			window.addEventListener('pointerup', onUp);
			window.addEventListener('resize', () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
				composer.setSize(window.innerWidth, window.innerHeight);
			});

			const unsubView = viewState.subscribe(s => state = s);
			const unsubDet = detailProject.subscribe(() => {});

			function loop() {
				requestAnimationFrame(loop);
				t += 0.016;
				const rate = 0.04;

				if (state === 'home') {
					bO += (0 - bO) * rate; bS += (0 - bS) * rate; cO += (0 - cO) * rate; ctO += (0 - ctO) * rate;
					pm.opacity += (0.3 - pm.opacity) * rate;
				} else if (state === 'projects') {
					bO += (1 - bO) * rate; bS += (1 - bS) * rate; cO += (1 - cO) * rate; ctO += (0 - ctO) * rate;
					pm.opacity += (0.08 - pm.opacity) * rate;
				} else {
					bO += (0 - bO) * rate; bS += (0 - bS) * rate; cO += (0 - cO) * rate; ctO += (1 - ctO) * rate;
					pm.opacity += (0.35 - pm.opacity) * rate;
				}

				bm.opacity = bO;
				brain.scale.setScalar(bS < 0.01 ? 0 : bS);
				cardMeshes.forEach(m => { m.material.opacity = cO; });
				cpm.opacity = ctO;

				if (bS > 0.01) {
					const br = 1 + Math.sin(t * 0.7) * 0.006;
					brain.scale.setScalar(bS * br);
					brain.position.y = -0.2 + Math.sin(t * 0.4) * 0.02;
					bm.emissiveIntensity = 0.04 + Math.sin(t * 1.0) * 0.03;
				}

				if (!drag) dragV *= 0.9;
				rot += spd + dragV;
				brain.rotation.y = rot;

				cardGroups.forEach((g, i) => {
					const a = cardData[i].a + rot;
					const r = 3.2 + Math.sin(t * 0.2 + i) * 0.04;
					const y = cardData[i].y + Math.sin(t * 0.3 + i * 0.5) * 0.03;
					g.position.set(Math.sin(a) * r, y, Math.cos(a) * r);
					g.lookAt(camera.position);
				});

				pts.rotation.y = t * 0.002;
				cp.rotation.y = t * 0.12;
				composer.render();
			}
			loop();

			cleanup = () => {
				node.removeEventListener('pointerdown', onDown);
				window.removeEventListener('pointermove', onMove);
				window.removeEventListener('pointerup', onUp);
				unsubView(); unsubDet();
				renderer?.dispose(); composer?.dispose();
			};
		}
	}

	onDestroy(() => { cleanup?.(); });
</script>

<canvas use:mountCanvas class="fixed inset-0 z-0 touch-none"></canvas>

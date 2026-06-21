<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { viewState, detailProject, mouse } from '$lib/stores';
	import { projects } from '$lib/data';

	let clean: (() => void) | undefined;

	function mount(canvas: HTMLCanvasElement) {
		if (!browser) return;

		let T: typeof import('three'), PP: typeof import('postprocessing'), brainFn: Function;

		(async () => {
			T = await import('three');
			PP = await import('postprocessing');
			brainFn = (await import('$lib/brain')).buildBrain;
			run(canvas);
		})();

		function run(cv: HTMLCanvasElement) {
			const W = window.innerWidth, H = window.innerHeight;

			const scene = new T.Scene();
			scene.background = new T.Color(0x0a0a0a);

			const cam = new T.PerspectiveCamera(50, W / H, 0.1, 60);
			cam.position.set(0, 0.2, 7);

			const ren = new T.WebGLRenderer({ canvas: cv, antialias: true });
			ren.setSize(W, H);
			ren.setPixelRatio(Math.min(devicePixelRatio, 2));

			const comp = new PP.EffectComposer(ren);
			comp.addPass(new PP.RenderPass(scene, cam));
			comp.addPass(new PP.EffectPass(cam, new PP.BloomEffect({ intensity: 0.25, radius: 0.4, threshold: 0.5 })));

			scene.add(new T.AmbientLight(0xffffff, 0.3));
			const dl = new T.DirectionalLight(0xffffff, 0.7);
			dl.position.set(3, 5, 4); scene.add(dl);
			const fl = new T.DirectionalLight(0x666666, 0.2);
			fl.position.set(-3, -1, -3); scene.add(fl);

			/* particles */
			const pn = 1000, pg = new T.BufferGeometry(), pa = new Float32Array(pn * 3);
			for (let i = 0; i < pn; i++) {
				pa[i * 3] = (Math.random() - 0.5) * 50;
				pa[i * 3 + 1] = (Math.random() - 0.5) * 30;
				pa[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
			}
			pg.setAttribute('position', new T.BufferAttribute(pa, 3));
			const pm = new T.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.25, sizeAttenuation: true, blending: T.AdditiveBlending, depthWrite: false });
			const ppart = new T.Points(pg, pm);
			scene.add(ppart);

			/* brain */
			const bm = new T.MeshPhysicalMaterial({ color: 0xcccccc, metalness: 0.1, roughness: 0.05, clearcoat: 0.5, clearcoatRoughness: 0.15, transparent: true, opacity: 0, emissive: 0x444444, emissiveIntensity: 0.05 });
			const brain = brainFn(bm);
			brain.scale.setScalar(0);
			brain.position.y = -0.1;
			scene.add(brain);

			/* cards - small squares */
			const meshes: T.Mesh[] = [], groups: T.Group[] = [], cinfo: { a: number; y: number }[] = [];

			function ct(p: { title: string; color: string }) {
				const c = document.createElement('canvas');
				c.width = 200; c.height = 200;
				const ctx = c.getContext('2d')!;
				ctx.fillStyle = '#181818';
				ctx.beginPath(); ctx.roundRect(0, 0, 200, 200, 8); ctx.fill();
				ctx.fillStyle = p.color; ctx.fillRect(0, 0, 200, 2);
				ctx.fillStyle = '#e8e8e8'; ctx.font = '500 14px "Inter", sans-serif';
				ctx.fillText(p.title, 12, 35);
				return new T.CanvasTexture(c);
			}

			projects.forEach((p, i) => {
				const tex = ct(p); tex.needsUpdate = true;
				const m = new T.Mesh(new T.PlaneGeometry(1.3, 1.3), new T.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, side: T.DoubleSide }));
				m.userData.pid = p.id;
				const a = (i / 6) * Math.PI * 2, y = ((i % 3) - 1) * 0.7;
				const grp = new T.Group();
				grp.add(m);
				grp.position.set(Math.sin(a) * 3, y, Math.cos(a) * 3);
				cinfo.push({ a, y }); meshes.push(m); groups.push(grp);
				scene.add(grp);
			});

			/* contact particles */
			const cn = 500, cg = new T.BufferGeometry(), ca = new Float32Array(cn * 3);
			for (let i = 0; i < cn; i++) {
				const t = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1), r = 1.5 + Math.random() * 1;
				ca[i * 3] = r * Math.sin(phi) * Math.cos(t);
				ca[i * 3 + 1] = Math.cos(phi) * 0.5;
				ca[i * 3 + 2] = r * Math.sin(phi) * Math.sin(t);
			}
			cg.setAttribute('position', new T.BufferAttribute(ca, 3));
			const cpm = new T.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0, sizeAttenuation: true, blending: T.AdditiveBlending, depthWrite: false });
			const cpart = new T.Points(cg, cpm);
			scene.add(cpart);

			/* interaction */
			let state = 'home', bo = 0, bs = 0, co = 0, cto = 0;
			let rot = 0, speed = 0.003, dragV = 0, dragging = false, lastX = 0, moved = 0, time = 0, aid = 0;

			const pd = (e: PointerEvent) => {
				if (get(detailProject) !== null || state !== 'projects') return;
				dragging = true; lastX = e.clientX; moved = 0; dragV = 0;
				cv.setPointerCapture(e.pointerId);
			};
			const pm_ = (e: PointerEvent) => {
				mouse.set({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
				if (!dragging || state !== 'projects') return;
				const dx = e.clientX - lastX;
				moved += Math.abs(dx);
				dragV = dx * 0.005;
				rot += dragV;
				lastX = e.clientX;
			};
			const pu = (e: PointerEvent) => {
				dragging = false;
				if (state !== 'projects' || get(detailProject) !== null || moved > 4) return;
				const rc = new T.Raycaster(), mp = new T.Vector2();
				const rect = cv.getBoundingClientRect();
				mp.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
				mp.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
				rc.setFromCamera(mp, cam);
				const hits = rc.intersectObjects(meshes, false);
				if (hits.length && hits[0].object.userData.pid) detailProject.set(hits[0].object.userData.pid);
			};
			cv.addEventListener('pointerdown', pd);
			window.addEventListener('pointermove', pm_);
			window.addEventListener('pointerup', pu);
			window.addEventListener('resize', () => {
				cam.aspect = window.innerWidth / window.innerHeight;
				cam.updateProjectionMatrix();
				ren.setSize(window.innerWidth, window.innerHeight);
				comp.setSize(window.innerWidth, window.innerHeight);
			});

			const unsubV = viewState.subscribe(s => state = s);
			const unsubD = detailProject.subscribe(() => {});

			/* loop */
			function anim() {
				aid = requestAnimationFrame(anim);
				time += 0.016;

				const r = 0.035;
				if (state === 'home') {
					bo += (0 - bo) * r; bs += (0 - bs) * r; co += (0 - co) * r; cto += (0 - cto) * r;
					pm.opacity += (0.25 - pm.opacity) * r;
				} else if (state === 'projects') {
					bo += (1 - bo) * r; bs += (1 - bs) * r; co += (1 - co) * r; cto += (0 - cto) * r;
					pm.opacity += (0.08 - pm.opacity) * r;
				} else {
					bo += (0 - bo) * r; bs += (0 - bs) * r; co += (0 - co) * r; cto += (1 - cto) * r;
					pm.opacity += (0.3 - pm.opacity) * r;
				}

				bm.opacity = bo;
				brain.scale.setScalar(bs < 0.01 ? 0 : bs);
				meshes.forEach(m => m.material.opacity = co);
				cpm.opacity = cto;

				if (bs > 0.01) {
					const br = 1 + Math.sin(time * 0.6) * 0.005;
					brain.scale.setScalar(bs * br);
					brain.position.y = -0.1 + Math.sin(time * 0.35) * 0.015;
					bm.emissiveIntensity = 0.04 + Math.sin(time * 0.8) * 0.03;
				}

				if (!dragging) dragV *= 0.88;
				rot += speed + dragV;
				brain.rotation.y = rot;

				groups.forEach((g, i) => {
					const a = cinfo[i].a + rot;
					g.position.set(Math.sin(a) * 3, cinfo[i].y + Math.sin(time * 0.2 + i) * 0.03, Math.cos(a) * 3);
					g.lookAt(cam.position);
				});

				ppart.rotation.y = time * 0.002;
				cpart.rotation.y = time * 0.1;
				comp.render();
			}

			clean = () => {
				cancelAnimationFrame(aid);
				cv.removeEventListener('pointerdown', pd);
				window.removeEventListener('pointermove', pm_);
				window.removeEventListener('pointerup', pu);
				unsubV(); unsubD();
				ren?.dispose(); comp?.dispose();
			};
			anim();
		}
	}

	onDestroy(() => clean?.());
</script>

<canvas use:mount class="fixed inset-0 z-0 touch-none"></canvas>

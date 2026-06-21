<script lang="ts">
	import { loaderVisible } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { onEnter }: { onEnter: () => void } = $props();

	let progress = $state(0);
	let visible = $state(true);
	let eyes = $state({ lx: 0, ly: 0, rx: 0, ry: 0 });
  let container = $state<HTMLDivElement | null>(null);

	onMount(() => {
		const t = setInterval(() => {
			progress = Math.min(progress + Math.random() * 15, 100);
		}, 400);
		const t2 = setTimeout(() => {
			clearInterval(t);
			progress = 100;
		}, 3000);

		const handleMouse = (e: MouseEvent) => {
			if (!container) return;
			const rect = container.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = (e.clientX - cx) / cx;
			const dy = (e.clientY - cy) / cy;
			eyes = {
				lx: Math.min(Math.max(dx * 6, -6), 6),
				ly: Math.min(Math.max(dy * 3, -3), 3),
				rx: Math.min(Math.max(dx * 6, -6), 6),
				ry: Math.min(Math.max(dy * 3, -3), 3)
			};
		};
		window.addEventListener('mousemove', handleMouse);

		return () => {
			clearInterval(t);
			clearTimeout(t2);
			window.removeEventListener('mousemove', handleMouse);
		};
	});

	function handleEnter() {
		visible = false;
		setTimeout(onEnter, 800);
	}
</script>

{#if visible}
	<div
		bind:this={container}
		transition:fade={{ duration: 800 }}
		class="fixed inset-0 z-[12000] bg-[#212121] flex flex-col items-center justify-center select-none"
	>
		<div class="flex flex-col items-center relative">
			<div class="perspective-[32rem] mb-4">
				<div class="loader-box">
					{#each ['U', 'N', 'S', 'E', 'N', 'E'] as letter}
						<div class="loader-box-face">{letter}</div>
					{/each}
				</div>
			</div>

			<span class="text-sm tracking-tight uppercase mb-1 font-sans" style="color: #424242">
				Rajveer Singh&reg;
			</span>
			<p class="text-sm leading-snug mb-7 text-center max-w-xs font-sans" style="color: #424242; letter-spacing: -0.025rem">
				Enterprise infrastructure.
				<br />
				IAM, automation &amp; full-stack.
			</p>

			{#if progress < 100}
				<div class="w-48 h-px bg-[#333] relative overflow-hidden">
					<div
						class="h-full bg-[#efded9] absolute top-0 left-0 transition-all duration-500 ease-out"
						style="width: {progress}%"
					></div>
				</div>
			{:else}
				<div class="flex flex-col items-center gap-4 animate-fadeIn">
					<button
						onclick={handleEnter}
						class="text-xs font-medium uppercase tracking-wider text-white/60 hover:text-white bg-transparent border-0 py-1 transition-colors duration-300"
					>
						Enter without audio
					</button>

					<button
						onclick={handleEnter}
						class="inline-flex items-center gap-3 px-8 py-3.5 bg-[#efded9] text-[#212121] text-xs font-medium uppercase tracking-wider rounded-full hover:opacity-85 transition-all duration-300"
					>
						Enter
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M1 7h10M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>

					<p class="text-[10px] text-white/30 mt-1 font-sans tracking-widest uppercase">
						Click or press any key
					</p>
				</div>
			{/if}
		</div>

		<!-- Animated eyes -->
		<div class="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
			<svg viewBox="0 0 311.3 233.3" class="w-full opacity-15">
				<defs>
					<clipPath id="ml"><path d="M139.5,101.5c2.5-7.8,6-14.8,10.3-21c-3.8-11.2-11.1-19-20.6-22c-2.8-0.9-5.6-1.3-8.5-1.3c-7,0-14.2,2.5-21,7.5C89.8,71.3,82.2,82.4,78,95.5c-4.1,13.1-4.3,26.5-0.4,37.9c3.8,11.2,11.1,19,20.6,22c9.4,3,19.9,0.8,29.5-6.1c3.5-2.5,6.7-5.6,9.6-9.1C134.6,128,135.3,114.6,139.5,101.5z"/></clipPath>
					<clipPath id="mr"><path d="M206,58.9c-3.8-1.2-7.6-1.8-11.4-1.8c-21.7,0-43.6,18.2-52.2,45.3c-4.9,15.5-4.8,31.6,0.3,45.3c5.1,13.6,14.5,23.1,26.6,27c12,3.8,25.3,1.4,37.2-6.7c12.1-8.2,21.5-21.3,26.4-36.8C243,99.2,230.9,66.8,206,58.9z"/></clipPath>
				</defs>
				<ellipse cx="113.6" cy="106.8" rx="52.5" ry="38.8" fill="none" stroke="#3a3a3a" stroke-width="2" />
				<ellipse cx="187.6" cy="116.8" rx="62.3" ry="49" fill="none" stroke="#3a3a3a" stroke-width="2" />
				<g clip-path="url(#ml)">
					<circle cx={113.6 + eyes.lx} cy={106.8 + eyes.ly} r="18" fill="none" stroke="#3a3a3a" stroke-width="2" />
					<circle cx={120 + eyes.lx} cy={115 + eyes.ly} r="5" fill="#3a3a3a" />
				</g>
				<g clip-path="url(#mr)">
					<circle cx={187.6 + eyes.rx} cy={116.8 + eyes.ry} r="22" fill="none" stroke="#3a3a3a" stroke-width="2" />
					<circle cx={195 + eyes.rx} cy={125 + eyes.ry} r="6" fill="#3a3a3a" />
				</g>
			</svg>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
</style>

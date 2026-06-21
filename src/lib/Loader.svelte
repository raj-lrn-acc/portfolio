<script lang="ts">
	import { loaderVisible } from '$lib/stores';

	let progress = $state(0);
	let ready = $state(false);
	let interval: ReturnType<typeof setInterval>;

	$effect(() => {
		if (!loaderVisible.value) return;
		interval = setInterval(() => {
			progress += 1 + Math.random() * 3;
			if (progress >= 100) {
				progress = 100;
				clearInterval(interval);
				setTimeout(() => { ready = true; }, 300);
			}
		}, 40);

		return () => clearInterval(interval);
	});

	function enter() {
		loaderVisible.set(false);
	}
</script>

{#if $loaderVisible}
	<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]" style="animation: fade-in 0.5s ease-out">
		<div class="loader-cube mb-16">
			<div class="cube-face front">U</div>
			<div class="cube-face back">N</div>
			<div class="cube-face right">S</div>
			<div class="cube-face left">E</div>
			<div class="cube-face top">N</div>
			<div class="cube-face bottom">E</div>
		</div>

		<div class="w-48 h-px bg-[#222] mb-3 overflow-hidden rounded-full">
			<div class="h-full bg-[#e0e0e0] transition-all duration-300 ease-out rounded-full" style="width: {progress}%"></div>
		</div>

		<p class="text-xs text-[#555] mb-12 font-mono tracking-widest uppercase">{Math.floor(progress)}%</p>

		<button
			onclick={enter}
			class="px-10 py-3 border border-[#333] text-[#ccc] text-sm tracking-widest uppercase
				hover:bg-white hover:text-black hover:border-white
				transition-all duration-700 ease-out
				{ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
			style="transition-property: opacity, transform, background-color, color, border-color; transition-duration: 0.7s; {ready ? '' : 'pointer-events: none;'}"
		>
			Enter
		</button>
	</div>
{/if}

<style>
	.loader-cube {
		width: 80px;
		height: 80px;
		position: relative;
		transform-style: preserve-3d;
		animation: loader-cube 6s ease-in-out infinite;
	}
	.cube-face {
		position: absolute;
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Playfair Display', serif;
		font-size: 28px;
		font-weight: 300;
		color: #e0e0e0;
		background: rgba(20, 20, 20, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.06);
		backface-visibility: visible;
	}
	.front  { transform: translateZ(40px); }
	.back   { transform: rotateY(180deg) translateZ(40px); }
	.right  { transform: rotateY(90deg) translateZ(40px); }
	.left   { transform: rotateY(-90deg) translateZ(40px); }
	.top    { transform: rotateX(90deg) translateZ(40px); }
	.bottom { transform: rotateX(-90deg) translateZ(40px); }
</style>

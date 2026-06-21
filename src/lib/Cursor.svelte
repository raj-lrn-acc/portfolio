<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { cursorHover } from '$lib/stores';

	let x = $state(-100);
	let y = $state(-100);
	let dot: HTMLDivElement;

	let unsub: () => void;

	onMount(() => {
		const handleMove = (e: MouseEvent) => {
			x = e.clientX;
			y = e.clientY;
		};

		const over = () => { cursorHover.set(true); };
		const out = () => { cursorHover.set(false); };

		window.addEventListener('mousemove', handleMove, { passive: true });

		const els = document.querySelectorAll('a, button, input, textarea, [role="button"]');
		els.forEach((el) => {
			el.addEventListener('mouseenter', over);
			el.addEventListener('mouseleave', out);
		});

		document.body.style.cursor = 'none';
		const style = document.createElement('style');
		style.textContent = 'a, button, input, textarea, [role="button"] { cursor: none !important; }';
		style.id = 'cursor-style';
		document.head.appendChild(style);

		return () => {
			document.body.style.cursor = '';
			style.remove();
			window.removeEventListener('mousemove', handleMove);
			els.forEach((el) => {
				el.removeEventListener('mouseenter', over);
				el.removeEventListener('mouseleave', out);
			});
		};
	});
</script>

<div class="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block" style="transform: translate({x}px, {y}px)">
	<div
		bind:this={dot}
		class="-translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#efded9] transition-all duration-150 ease-out"
		class:scale-150={$cursorHover}
	></div>
	<div
		class="-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#efded9]/30 absolute transition-all duration-150 ease-out"
		class:scale-75={$cursorHover}
	></div>
</div>

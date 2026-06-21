<script lang="ts">
	import { cursorHover } from '$lib/stores';
	import { onMount } from 'svelte';

	let show = $state(false);

	onMount(() => {
		setTimeout(() => show = true, 100);
	});
</script>

<div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
	<div class="space-y-6" style="animation: {show ? 'fade-up 0.8s ease-out forwards' : 'none'}; opacity: {show ? 1 : 0};">
		<h1 class="font-serif text-6xl md:text-8xl lg:text-9xl text-white/90 tracking-tight">
			Rajveer Singh
		</h1>

		<p class="text-lg md:text-xl text-[#666] font-light max-w-xl mx-auto leading-relaxed" style="animation-delay: 0.2s;">
			Full-stack engineer building secure, scalable infrastructure
			<span class="text-white/30">— with a touch of craft.</span>
		</p>

		<div class="pt-8" style="animation-delay: 0.4s;">
			<a
				href="/projects"
				class="inline-block px-8 py-3 border border-[#333] text-[#aaa] text-sm tracking-[0.25em] uppercase
					hover:bg-white hover:text-black hover:border-white
					transition-all duration-700 ease-out"
				onmouseenter={() => cursorHover.set(true)}
				onmouseleave={() => cursorHover.set(false)}
			>
				View my work
			</a>
		</div>
	</div>

	<div class="absolute bottom-12 left-1/2 -translate-x-1/2" style="animation: pulse-subtle 3s ease-in-out infinite;">
		<svg width="16" height="24" viewBox="0 0 16 24" fill="none" class="text-[#333]">
			<rect x="1.5" y="1.5" width="13" height="21" rx="6.5" stroke="currentColor" stroke-width="2"/>
			<circle cx="8" cy="8" r="1.5" fill="currentColor" class="animate-bounce"/>
		</svg>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';

	let show = $state(false);
	onMount(() => setTimeout(() => show = true, 100));
</script>

<div class="min-h-screen flex flex-col items-center justify-center text-center px-6 pb-16" style="opacity: {show ? 1 : 0}; transition: opacity 0.8s ease-out">
	<h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-white/90 tracking-tight mb-4" style="animation: {show ? 'fade-up 0.7s ease-out' : 'none'}">
		Rajveer Singh
	</h1>
	<p class="text-base md:text-lg text-[#666] font-light max-w-lg leading-relaxed mb-10" style="animation: {show ? 'fade-up 0.7s ease-out 0.15s both' : 'none'}">
		Full-stack engineer building secure infrastructure at scale.
	</p>
	<a
		href="/projects"
		class="inline-block px-8 py-3 border border-[#333] text-[#999] text-xs tracking-[0.2em] uppercase
			hover:bg-white hover:text-black hover:border-white transition-all duration-500"
		style="animation: {show ? 'fade-up 0.7s ease-out 0.3s both' : 'none'}"
	>
		View Projects
	</a>
</div>

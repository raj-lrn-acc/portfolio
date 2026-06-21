<script lang="ts">
	let show = $state(false);
</script>

<svelte:window on:load={() => setTimeout(() => show = true, 200)} />

<div class="min-h-screen flex flex-col items-center justify-center text-center px-6 pb-16" style="opacity: {show ? 1 : 0}; transition: opacity 0.7s">
	<h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-white/90 tracking-tight mb-3">Rajveer Singh</h1>
	<p class="text-sm md:text-base text-[#666] font-light max-w-md leading-relaxed mb-10">Full-stack engineer &mdash; infrastructure, security, craft.</p>
	<a href="/projects" class="px-8 py-3 border border-[#333] text-[#999] text-[11px] tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500">View Projects</a>
</div>

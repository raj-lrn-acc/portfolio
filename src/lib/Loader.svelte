<script lang="ts">
	import { loaderVisible } from '$lib/stores';

	let pct = $state(0), ready = $state(false);

	$effect(() => {
		if (!loaderVisible.value) return;
		const iv = setInterval(() => {
			pct += 1 + Math.random() * 2;
			if (pct >= 100) { pct = 100; clearInterval(iv); setTimeout(() => ready = true, 200); }
		}, 50);
		return () => clearInterval(iv);
	});
</script>

{#if $loaderVisible}
	<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]" style="animation: fade-in 0.3s ease-out">
		<div class="mb-14 text-white/40 font-serif text-xl tracking-[0.4em]">P</div>
		<div class="w-36 h-[1px] bg-[#222] mb-2 overflow-hidden">
			<div class="h-full bg-white/30 transition-all duration-200" style="width: {pct}%"></div>
		</div>
		<p class="text-[10px] text-[#444] mb-10 font-mono">{Math.floor(pct)}%</p>
		<button onclick={() => loaderVisible.set(false)} class="px-7 py-2.5 border border-[#333] text-[#999] text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500" style="opacity: {ready ? 1 : 0}; transform: translateY({ready ? 0 : '6px'}); transition: opacity 0.4s, transform 0.4s">Enter</button>
	</div>
{/if}

<script lang="ts">
	import { loaderVisible } from '$lib/stores';

	let pct = $state(0);
	let ready = $state(false);

	$effect(() => {
		if (!loaderVisible.value) return;
		const iv = setInterval(() => {
			pct += 1 + Math.random() * 3;
			if (pct >= 100) { pct = 100; clearInterval(iv); setTimeout(() => ready = true, 200); }
		}, 40);
		return () => clearInterval(iv);
	});

	function enter() { loaderVisible.set(false); }
</script>

{#if $loaderVisible}
	<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]" style="animation: fade-in 0.3s ease-out">
		<div class="w-12 h-12 border border-[#333] flex items-center justify-center mb-12 text-white/50 font-serif text-lg tracking-[0.3em]" style="animation: pulse-subtle 2s ease-in-out infinite">P</div>

		<div class="w-40 h-px bg-[#222] mb-2 overflow-hidden rounded-full">
			<div class="h-full bg-white/40 transition-all duration-300 rounded-full" style="width: {pct}%"></div>
		</div>
		<p class="text-[10px] text-[#444] mb-10 font-mono tracking-widest">{Math.floor(pct)}%</p>

		<button
			onclick={enter}
			class="px-8 py-2.5 border border-[#333] text-[#999] text-xs tracking-[0.2em] uppercase
				hover:bg-white hover:text-black hover:border-white
				transition-all duration-500"
			style="opacity: {ready ? 1 : 0}; transform: translateY({ready ? '0' : '8px'}); transition: opacity 0.5s, transform 0.5s"
		>
			Enter
		</button>
	</div>
{/if}

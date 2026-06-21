<script lang="ts">
	import { loaderVisible } from '$lib/stores';
</script>

{#if $loaderVisible}
	<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]" style="animation: fade-in 0.3s">
		<div class="mb-14 text-white/40 font-serif text-xl tracking-[0.4em]">P</div>
		<button onclick={() => loaderVisible.set(false)} class="px-7 py-2.5 border border-[#333] text-[#999] text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500">Enter</button>
	</div>
{/if}

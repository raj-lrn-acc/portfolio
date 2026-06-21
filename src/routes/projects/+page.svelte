<script lang="ts">
	import { detailProject } from '$lib/stores';
	import { projects } from '$lib/data';

	function close() { detailProject.set(null); }

	const detail = $derived(
		$detailProject !== null ? projects.find(p => p.id === $detailProject) || null : null
	);
</script>

<div class="min-h-screen flex items-center justify-center">
	<span class="text-xs tracking-[0.3em] uppercase text-[#444]">Drag to rotate &middot; Click a card</span>
</div>

{#if detail}
	<div
		class="fixed inset-0 z-20 flex items-center justify-center bg-black/70"
		style="animation: fade-in 0.2s ease-out"
		onclick={close}
		onkeydown={(e) => e.key === 'Escape' && close()}
		role="presentation"
	>
		<div
			class="bg-[#111] border border-[#222] w-[90%] max-w-md p-6"
			style="animation: fade-up 0.3s ease-out"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="dialog"
			tabindex="-1"
		>
			<div class="flex justify-between items-start mb-3">
				<div>
					<h3 class="font-serif text-2xl text-white/90">{detail.title}</h3>
					<p class="text-xs text-[#666] mt-0.5">{detail.tagline}</p>
				</div>
				<button onclick={close} class="text-[#555] hover:text-white text-lg leading-none">&times;</button>
			</div>
			<p class="text-sm text-[#888] leading-relaxed mb-4">{detail.description}</p>
			<div class="flex flex-wrap gap-1.5 mb-4">
				{#each detail.tags as tag}
					<span class="px-2.5 py-0.5 text-[11px] text-[#777] bg-[#1a1a1a] border border-[#2a2a2a]">{tag}</span>
				{/each}
			</div>
			<div class="flex gap-4">
				{#each detail.links as link}
					<a href={link.url} target="_blank" rel="noopener noreferrer" class="text-[11px] tracking-widest uppercase text-[#555] hover:text-white transition-colors">{link.label}</a>
				{/each}
			</div>
		</div>
	</div>
{/if}

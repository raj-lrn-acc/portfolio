<script lang="ts">
	import { detailProject, cursorHover } from '$lib/stores';
	import { projects } from '$lib/data';
	import { onMount } from 'svelte';

	let show = $state(false);

	onMount(() => {
		setTimeout(() => show = true, 50);
	});

	function closeDetail() {
		detailProject.set(null);
	}

	let detail = $derived($detailProject !== null ? projects.find(p => p.id === $detailProject) : null);
</script>

<div class="relative z-10 min-h-screen flex items-center justify-center">
	{#if show}
		<h2 class="absolute top-24 left-1/2 -translate-x-1/2 text-xs tracking-[0.35em] uppercase text-[#555] font-light" style="animation: fade-up 0.6s ease-out 0.1s both;">
			Drag to explore &middot; Click a card
		</h2>
	{/if}
</div>

{#if detail}
	<div
		class="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
		style="animation: fade-in 0.3s ease-out"
		onclick={closeDetail}
		onkeydown={(e) => e.key === 'Escape' && closeDetail()}
		role="dialog"
		tabindex="-1"
		onmouseenter={() => cursorHover.set(true)}
		onmouseleave={() => cursorHover.set(false)}
	>
		<div
			class="w-full max-w-lg mx-6 bg-[#141414] border border-[#222] p-8"
			style="animation: slide-right 0.4s ease-out"
			role="document"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
		>
			<div class="flex items-start justify-between mb-4">
				<div>
					<h3 class="font-serif text-3xl text-white/90">{detail.title}</h3>
					<p class="text-sm text-[#666] mt-1">{detail.tagline}</p>
				</div>
				<button
					onclick={closeDetail}
					class="text-[#555] hover:text-white transition-colors text-xl leading-none">&times;</button>
			</div>

			<p class="text-sm text-[#888] leading-relaxed mb-6">{detail.description}</p>

			<div class="flex flex-wrap gap-2 mb-6">
				{#each detail.tags as tag}
					<span class="px-3 py-1 text-xs text-[#777] bg-[#1c1c1c] border border-[#2a2a2a]">{tag}</span>
				{/each}
			</div>

			<div class="flex gap-4">
				{#each detail.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs tracking-widest uppercase text-[#666] hover:text-white transition-colors"
					>{link.label}</a>
				{/each}
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import { projects } from '$lib/data';
	import Footer from '$lib/Footer.svelte';
	import { fly, fade } from 'svelte/transition';

	let activeFilter = $state('All');
	const categories = ['All', 'Security', 'Infrastructure', 'AI', 'Cloud', 'Tooling', 'Backend'];

	const filtered = $derived(activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter));
</script>

<svelte:head>
	<title>Projects | Rajveer Singh</title>
</svelte:head>

<main class="relative pt-32 pb-12">
	<div class="px-6 max-w-7xl mx-auto">
		<div class="mb-16" in:fade={{ duration: 600 }}>
			<p class="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-sans">Portfolio &mdash; {new Date().getFullYear()}</p>
			<h1 class="text-5xl sm:text-7xl font-serif tracking-tight leading-[0.9] text-white">Projects</h1>
			<p class="mt-4 text-sm text-white/40 max-w-md font-sans leading-relaxed">
				A selection of enterprise infrastructure, automation tooling, and full-stack applications.
			</p>
		</div>

		<div class="flex flex-wrap gap-2 mb-12">
			{#each categories as cat}
				<button
					onclick={() => activeFilter = cat}
					class="px-4 py-2 text-xs font-sans tracking-wider uppercase rounded-full border transition-all duration-300"
					style={activeFilter === cat
						? 'background: #efded9; color: #212121; border-color: #efded9;'
						: 'background: transparent; color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.2);'}
				>
					{cat}
				</button>
			{/each}
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filtered as project, i (project.id)}
				<div
					class="group relative overflow-hidden rounded-lg glass p-8 h-full"
					in:fly={{ y: 20, duration: 400, delay: i * 50 }}
				>
					<div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
						style="background-color: {project.color}"
					></div>
					<div class="relative z-10 flex flex-col h-full">
						<div class="flex items-start justify-between mb-4">
							<span class="text-[10px] tracking-widest uppercase text-white/40 font-sans">{project.category}</span>
							<span class="text-[10px] text-white/40 font-sans">{project.year}</span>
						</div>
						<h3 class="text-xl font-serif tracking-tight mb-2 text-white group-hover:color-[#efded9] transition-colors">{project.title}</h3>
						<p class="text-xs text-white/40 font-sans leading-relaxed flex-1">{project.subtitle}</p>
						<p class="mt-4 text-xs text-white/30 font-sans leading-relaxed line-clamp-2">{project.description}</p>
					</div>
				</div>
			{/each}
		</div>

		{#if filtered.length === 0}
			<div class="text-center py-32">
				<p class="text-white/40 text-sm font-sans">No projects found in this category.</p>
			</div>
		{/if}
	</div>
	<div class="mt-24"><Footer /></div>
</main>

<script lang="ts">
	import { projects } from '$lib/data';
	import Footer from '$lib/Footer.svelte';
	import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Rajveer Singh | Portfolio</title>
</svelte:head>

<main class="relative">
	<!-- Hero -->
	<section class="relative min-h-screen flex items-center justify-center pointer-events-none">
		<div class="relative z-10 text-center px-6 pointer-events-auto"
			in:fade={{ duration: 800, delay: 200 }}
		>
			<p class="text-xs tracking-[0.3em] uppercase text-white/50 mb-6 font-sans"
				in:fly={{ y: 20, duration: 800, delay: 300 }}
			>
				Portfolio &mdash; 2026
			</p>
			<h1 class="text-5xl sm:text-7xl md:text-9xl font-serif tracking-tight leading-[0.9] text-white"
				in:fly={{ y: 30, duration: 800, delay: 500 }}
			>
				Rajveer<br />
				<span class="font-serif italic font-light" style="color: #efded9">Singh</span>
			</h1>
			<p class="mt-6 text-sm text-white/40 max-w-md mx-auto font-sans leading-relaxed"
				in:fly={{ y: 20, duration: 800, delay: 700 }}
			>
				Enterprise infrastructure, identity access,<br />and full-stack tooling.
			</p>
			<div class="mt-10 flex items-center justify-center gap-3 text-xs text-white/30"
				in:fade={{ duration: 800, delay: 1200 }}
			>
				<span class="w-8 h-px bg-white/20"></span>
				<span class="tracking-widest uppercase font-sans animate-pulse">Drag to explore</span>
				<span class="w-8 h-px bg-white/20"></span>
			</div>
		</div>
	</section>

	<!-- Selected Projects -->
	<section class="relative z-10 px-6 py-32">
		<div class="max-w-7xl mx-auto">
			<div class="flex items-center gap-3 mb-16" in:fade={{ duration: 600 }}>
				<span class="text-2xl font-serif italic" style="color: #efded9">&quot;</span>
				<span class="text-xs tracking-widest uppercase text-white/50 font-sans">Selected Projects</span>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each projects.slice(0, 4) as project, i}
					<a href="/projects"
						class="project-card block group relative overflow-hidden rounded-lg glass p-8 no-underline"
						in:fly={{ y: 40, duration: 600, delay: i * 80 }}
					>
						<div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
							style="background-color: {project.color}"
						></div>
						<div class="relative z-10">
							<div class="flex items-start justify-between mb-4">
								<span class="text-[10px] tracking-widest uppercase text-white/40 font-sans">{project.category}</span>
								<span class="text-[10px] text-white/40 font-sans">{project.year}</span>
							</div>
							<h3 class="text-xl sm:text-2xl font-serif tracking-tight mb-2 text-white group-hover:color-[#efded9] transition-colors">{project.title}</h3>
							<p class="text-xs text-white/40 font-sans leading-relaxed">{project.subtitle}</p>
							<div class="mt-4 flex items-center gap-2 text-xs text-white/40 group-hover:text-white transition-colors">
								<span class="font-sans">View Project</span>
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="group-hover:translate-x-1 transition-transform">
									<path d="M1 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</div>
						</div>
					</a>
				{/each}
			</div>

			<div class="mt-12 text-center" in:fade={{ duration: 600 }}>
				<a href="/projects" class="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60 hover:color-[#efded9] transition-colors no-underline">
					View all projects
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
						<path d="M1 7h10M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Contact CTA -->
	<section class="relative z-10 px-6 py-32 border-t border-white/5" in:fade={{ duration: 600 }}>
		<div class="max-w-7xl mx-auto text-center">
			<p class="text-xs tracking-widest uppercase text-white/40 mb-6 font-sans">Let&rsquo;s Work Together</p>
			<p class="text-4xl sm:text-5xl font-serif tracking-tight leading-tight mb-8 text-white">
				Have a project in mind?<br />
				<a href="/contact" class="hover:underline underline-offset-4 no-underline" style="color: #efded9">Get in touch</a>
			</p>
		</div>
	</section>

	<Footer />
</main>

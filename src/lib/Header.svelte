<script lang="ts">
	let menuOpen = $state(false);

	const navLinks = [
		{ path: '/', label: 'Index', number: '01' },
		{ path: '/projects', label: 'Projects', number: '02' },
		{ path: '/contact', label: 'Contact', number: '03' }
	];
</script>

<header class="fixed top-0 left-0 right-0 z-80 flex items-center justify-between px-4 sm:px-6 h-16 mix-blend-difference">
	<a href="/" class="text-sm font-sans font-medium tracking-tight text-white">
		Rajveer<span class="font-serif italic font-light" style="color: #efded9"> Singh</span>
	</a>

	<div class="flex items-center gap-6">
		<nav class="hidden md:flex items-center gap-6">
			{#each navLinks as link}
				<a
					href={link.path}
					class="nav-item text-sm font-sans text-white/70 hover:text-white no-underline"
				>
					<span class="nav-item-default block">{link.label}</span>
					<span class="nav-item-hover">{link.label}</span>
				</a>
			{/each}
		</nav>

		<button
			onclick={() => menuOpen = !menuOpen}
			class="relative w-10 h-10 flex items-center justify-center text-white bg-transparent border-0"
			aria-label="Toggle Menu"
		>
			<svg viewBox="0 0 14 5" class="w-4 h-4" fill="none">
				<circle cx="2.4" cy="2.4" r="2.4" fill={menuOpen ? 'transparent' : 'currentColor'} />
				<circle cx="11.6" cy="2.4" r="2.4" fill={menuOpen ? 'transparent' : 'currentColor'} />
			</svg>
			<svg viewBox="0 0 14 14" class="w-4 h-4 absolute" fill="none" style="opacity: {menuOpen ? 1 : 0}; transition: opacity 0.3s">
				<path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>
</header>

<!-- Menu overlay -->
{#if menuOpen}
	<div
		class="fixed inset-0 z-70 bg-[#212121] flex flex-col justify-center items-center"
		style="animation: menuIn 0.6s ease-out forwards; clip-path: circle(150% at calc(100% - 2rem) 2rem);"
		in:fade
	>
		<nav class="flex flex-col items-start gap-6">
			{#each navLinks as link, i}
				<div style="animation: fadeUp 0.5s ease-out {0.2 + i * 0.1}s both">
					<a
						href={link.path}
						onclick={() => menuOpen = false}
						class="group flex items-center gap-4 no-underline"
					>
						<span class="text-xs font-mono text-white/40">{link.number}</span>
						<span class="text-4xl sm:text-5xl font-serif tracking-tight text-white/80 hover:color-[#efded9] transition-colors">{link.label}</span>
						<span class="font-serif italic text-lg text-white/30 group-hover:text-[#efded9]/50 transition-colors">{link.label}</span>
					</a>
				</div>
			{/each}
		</nav>
		<div style="animation: fadeUp 0.5s ease-out 0.7s both" class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-sm text-white/40">
			<a href="mailto:rajveercanada2@gmail.com" class="hover:text-white transition-colors no-underline">rajveercanada2@gmail.com</a>
			<span>Toronto, Canada</span>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>

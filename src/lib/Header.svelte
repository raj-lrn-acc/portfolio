<script lang="ts">
	import { page } from '$app/stores';
	import { cursorHover } from '$lib/stores';

	let menuOpen = $state(false);

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' },
	];
</script>

<header class="fixed top-0 left-0 right-0 z-40 mix-blend-difference" onmouseenter={() => cursorHover.set(true)} onmouseleave={() => cursorHover.set(false)} role="banner">
	<nav class="flex items-center justify-between px-8 py-6">
		<a href="/" class="text-sm tracking-[0.3em] uppercase text-white/70 hover:text-white transition-colors duration-500">
			Portfolio
		</a>

		<button
			onclick={() => menuOpen = !menuOpen}
			class="relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
			aria-label="Toggle menu"
		>
			<span class="block w-6 h-px bg-white/70 transition-all duration-500"
				style="transform: {menuOpen ? 'rotate(45deg) translateY(4px)' : 'rotate(0)'}; width: {menuOpen ? '24px' : '20px'}"></span>
			<span class="block h-px bg-white/70 transition-all duration-500"
				style="width: {menuOpen ? '24px' : '16px'}; opacity: {menuOpen ? '0' : '1'}"></span>
			<span class="block w-6 h-px bg-white/70 transition-all duration-500"
				style="transform: {menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'rotate(0)'}; width: {menuOpen ? '24px' : '20px'}"></span>
		</button>
	</nav>

	<div
		class="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0a0a] transition-all duration-700"
		style="
			pointer-events: {menuOpen ? 'auto' : 'none'};
			opacity: {menuOpen ? 1 : 0};
			clip-path: {menuOpen ? 'circle(120% at 95% 5%)' : 'circle(0% at 95% 5%)'};
		"
	>
		<ul class="flex flex-col items-center gap-8">
			{#each links as link}
				<li>
					<a
						href={link.href}
						onclick={() => menuOpen = false}
						class="text-4xl md:text-6xl font-serif text-white/80 hover:text-white transition-all duration-500 tracking-wide"
						style="
							opacity: {menuOpen ? 1 : 0};
							transform: {menuOpen ? 'translateY(0)' : 'translateY(20px)'};
							transition-delay: {menuOpen ? `${0.1 + 0.1 * (links.indexOf(link) + 1)}s` : '0s'};
						"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</header>

<script lang="ts">
	import { cursorHover } from '$lib/stores';

	let open = $state(false);

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' },
	];
</script>

<header class="fixed top-0 left-0 right-0 z-30 mix-blend-difference pointer-events-none">
	<nav class="flex items-center justify-between px-8 py-6 pointer-events-auto">
		<a href="/" class="text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors duration-500">Portfolio</a>

		<button
			onclick={() => open = !open}
			class="relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
			aria-label="Menu"
			onmouseenter={() => cursorHover.set(true)}
			onmouseleave={() => cursorHover.set(false)}
		>
			<span class="block h-px bg-white/70 transition-all duration-500" style="width: {open ? '24px' : '20px'}; transform: {open ? 'rotate(45deg) translateY(4.5px)' : 'none'}"></span>
			<span class="block h-px bg-white/70 transition-all duration-500" style="width: {open ? '24px' : '14px'}; opacity: {open ? '0' : '1'}"></span>
			<span class="block h-px bg-white/70 transition-all duration-500" style="width: {open ? '24px' : '20px'}; transform: {open ? 'rotate(-45deg) translateY(-4.5px)' : 'none'}"></span>
		</button>
	</nav>

	<div
		class="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0a0a] transition-all duration-700 pointer-events-auto"
		style="opacity: {open ? 1 : 0}; pointer-events: {open ? 'auto' : 'none'}"
	>
		{#each links as link, i}
			<a
				href={link.href}
				onclick={() => open = false}
				class="text-4xl md:text-6xl font-serif text-white/70 hover:text-white transition-all duration-500 block"
				style="opacity: {open ? 1 : 0}; transform: translateY({open ? '0' : '30px'}); transition-delay: {open ? `${0.1 + i * 0.1}s` : '0s'}"
			>
				{link.label}
			</a>
		{/each}
	</div>
</header>

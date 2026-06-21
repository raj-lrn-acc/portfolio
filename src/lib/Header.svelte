<script lang="ts">
	let open = $state(false);
	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' },
	];
</script>

<header class="fixed top-0 left-0 right-0 z-30 mix-blend-difference pointer-events-none">
	<nav class="flex items-center justify-between px-8 py-6 pointer-events-auto">
		<a href="/" class="text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors">Portfolio</a>
		<button onclick={() => open = !open} class="w-8 h-8 flex flex-col items-center justify-center gap-[5px]" aria-label="Menu">
			<span class="block h-px bg-white/60 transition-all duration-500" style="width: {open ? '22px' : '18px'}; transform: {open ? 'rotate(45deg) translateY(4px)' : 'none'}"></span>
			<span class="block h-px bg-white/60 transition-all duration-500" style="width: {open ? '22px' : '12px'}; opacity: {open ? '0' : '1'}"></span>
			<span class="block h-px bg-white/60 transition-all duration-500" style="width: {open ? '22px' : '18px'}; transform: {open ? 'rotate(-45deg) translateY(-4px)' : 'none'}"></span>
		</button>
	</nav>
	<div class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a] transition-all duration-500" style="opacity: {open ? 1 : 0}; pointer-events: {open ? 'auto' : 'none'}">
		{#each links as link, i}
			<a href={link.href} onclick={() => open = false} class="font-serif text-5xl md:text-7xl text-white/60 hover:text-white transition-all duration-500" style="opacity: {open ? 1 : 0}; transform: translateY({open ? 0 : '24px'}); transition-delay: {open ? `${0.1 + i * 0.08}s` : '0s'}">
				{link.label}
			</a>
		{/each}
	</div>
</header>

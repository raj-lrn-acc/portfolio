<script lang="ts">
	import { cursorHover } from '$lib/stores';
	import { onMount } from 'svelte';

	let show = $state(false);
	let type = $state<'business' | 'general'>('business');

	onMount(() => {
		setTimeout(() => show = true, 100);
	});
</script>

<div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
	<div class="w-full max-w-md" style="animation: {show ? 'fade-up 0.7s ease-out forwards' : 'none'}; opacity: {show ? 1 : 0};">
		<h1 class="font-serif text-4xl md:text-5xl text-white/90 mb-2">Get in touch</h1>
		<p class="text-sm text-[#555] mb-8 font-light">Have a project in mind? Let's talk.</p>

		<div class="flex gap-4 mb-8">
			<button
				onclick={() => type = 'business'}
				class="text-xs tracking-widest uppercase pb-1 transition-all duration-500"
				style="color: {type === 'business' ? '#e0e0e0' : '#444'}; border-bottom: 1px solid {type === 'business' ? '#e0e0e0' : 'transparent'}"
				onmouseenter={() => cursorHover.set(true)}
				onmouseleave={() => cursorHover.set(false)}
			>Business</button>
			<button
				onclick={() => type = 'general'}
				class="text-xs tracking-widest uppercase pb-1 transition-all duration-500"
				style="color: {type === 'general' ? '#e0e0e0' : '#444'}; border-bottom: 1px solid {type === 'general' ? '#e0e0e0' : 'transparent'}"
				onmouseenter={() => cursorHover.set(true)}
				onmouseleave={() => cursorHover.set(false)}
			>General</button>
		</div>

		<form class="space-y-5" onsubmit={(e) => e.preventDefault()}>
			<input
				type="text"
				placeholder="Your name"
				class="w-full bg-transparent border-b border-[#2a2a2a] pb-3 text-sm text-white/80 placeholder-[#444] outline-none focus:border-[#666] transition-colors duration-500"
			/>
			<input
				type="email"
				placeholder="Your email"
				class="w-full bg-transparent border-b border-[#2a2a2a] pb-3 text-sm text-white/80 placeholder-[#444] outline-none focus:border-[#666] transition-colors duration-500"
			/>
			<textarea
				rows="4"
				placeholder="Your message"
				class="w-full bg-transparent border-b border-[#2a2a2a] pb-3 text-sm text-white/80 placeholder-[#444] outline-none focus:border-[#666] transition-colors duration-500 resize-none"
			></textarea>

			<div class="pt-2">
				<button
					type="submit"
					class="px-8 py-3 border border-[#333] text-[#aaa] text-xs tracking-[0.25em] uppercase
						hover:bg-white hover:text-black hover:border-white
						transition-all duration-700 ease-out"
					onmouseenter={() => cursorHover.set(true)}
					onmouseleave={() => cursorHover.set(false)}
				>
					Send message
				</button>
			</div>
		</form>

		<p class="mt-8 text-[11px] text-[#333] tracking-wider">
			Or email directly at <a href="mailto:hello@rajveer.dev" class="text-[#666] hover:text-white transition-colors">hello@rajveer.dev</a>
		</p>
	</div>
</div>

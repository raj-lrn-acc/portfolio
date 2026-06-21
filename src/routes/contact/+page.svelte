<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import { fly, fade } from 'svelte/transition';

	let mode = $state<'business' | 'general'>('business');
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		const subject = mode === 'business' ? 'New Business Inquiry' : 'General Inquiry';
		const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
		window.open(`mailto:rajveercanada2@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
		sent = true;
		setTimeout(() => sent = false, 3000);
	}
</script>

<svelte:head>
	<title>Contact | Rajveer Singh</title>
</svelte:head>

<main class="relative pt-32 pb-12">
	<div class="px-6 max-w-4xl mx-auto">
		<div class="mb-16" in:fade={{ duration: 600 }}>
			<p class="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-sans">Contact</p>
			<h1 class="text-5xl sm:text-7xl font-serif tracking-tight leading-[0.9] text-white mb-6">Get in touch</h1>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-5 gap-12">
			<div class="md:col-span-2 space-y-8" in:fly={{ x: -20, duration: 600, delay: 200 }}>
				<div>
					<h3 class="text-xs tracking-widest uppercase text-white/40 mb-2 font-sans">Location</h3>
					<p class="text-sm text-white/70 font-sans leading-relaxed">Toronto, Ontario<br />Canada</p>
				</div>
				<div>
					<h3 class="text-xs tracking-widest uppercase text-white/40 mb-2 font-sans">Email</h3>
					<a href="mailto:rajveercanada2@gmail.com" class="text-sm no-underline hover:underline underline-offset-4 font-sans" style="color: #efded9">rajveercanada2@gmail.com</a>
				</div>
				<div>
					<h3 class="text-xs tracking-widest uppercase text-white/40 mb-2 font-sans">GitHub</h3>
					<a href="https://github.com/Xqni" target="_blank" rel="noopener noreferrer" class="text-sm no-underline hover:underline underline-offset-4 font-sans" style="color: #efded9">github.com/Xqni</a>
				</div>
			</div>

			<div class="md:col-span-3" in:fly={{ x: 20, duration: 600, delay: 300 }}>
				<div class="flex items-center gap-0 mb-8 border border-white/20 rounded-full overflow-hidden w-fit">
				<button
					onclick={() => mode = 'business'}
					class="px-5 py-2 text-xs font-sans uppercase tracking-wider transition-colors"
					class:active={mode === 'business'}
					style={mode === 'business' ? 'background: #efded9; color: #212121;' : 'background: transparent; color: rgba(255,255,255,0.5);'}
				>New Business</button>
				<button
					onclick={() => mode = 'general'}
					class="px-5 py-2 text-xs font-sans uppercase tracking-wider transition-colors"
					class:active={mode === 'general'}
					style={mode === 'general' ? 'background: #efded9; color: #212121;' : 'background: transparent; color: rgba(255,255,255,0.5);'}
				>General</button>
				</div>

				<form onsubmit={handleSubmit} class="space-y-6">
					<input
						type="text"
						placeholder="Name"
						bind:value={name}
						required
						class="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-white placeholder:text-white/30 outline-none focus:border-[#efded9] transition-colors"
					/>
					<input
						type="email"
						placeholder="Email"
						bind:value={email}
						required
						class="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-white placeholder:text-white/30 outline-none focus:border-[#efded9] transition-colors"
					/>
					<textarea
						placeholder={mode === 'business' ? 'Tell me about your project...' : 'Your message...'}
						bind:value={message}
						required
						rows={4}
						class="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-white placeholder:text-white/30 outline-none focus:border-[#efded9] transition-colors resize-none"
					></textarea>
					<button
						type="submit"
						class="group inline-flex items-center gap-2 px-8 py-3 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300"
						style={!sent
							? 'background: #efded9; color: #212121;'
							: 'background: rgba(255,255,255,0.2); color: white;'}
					>
						{sent ? '✓ Sent' : mode === 'business' ? 'Submit Brief' : 'Send Message'}
						{#if !sent}
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="group-hover:translate-x-1 transition-transform">
								<path d="M1 7h10M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
	<div class="mt-32"><Footer /></div>
</main>

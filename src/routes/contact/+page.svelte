<script lang="ts">
	let type = $state<'business' | 'general'>('business');
	let show = $state(false);
</script>

<svelte:window on:load={() => setTimeout(() => show = true, 200)} />

<div class="min-h-screen flex flex-col items-center justify-center px-6 pb-16" style="opacity: {show ? 1 : 0}; transition: opacity 0.7s">
	<div class="w-full max-w-sm">
		<h1 class="font-serif text-3xl md:text-4xl text-white/90 mb-1">Contact</h1>
		<p class="text-sm text-[#555] mb-6">Get in touch.</p>
		<div class="flex gap-5 mb-6 text-[11px] tracking-widest uppercase">
			<button onclick={() => type = 'business'} class="pb-1 transition-colors" style="color: {type === 'business' ? '#e0e0e0' : '#444'}; border-bottom: 1px solid {type === 'business' ? '#e0e0e0' : 'transparent'}">Business</button>
			<button onclick={() => type = 'general'} class="pb-1 transition-colors" style="color: {type === 'general' ? '#e0e0e0' : '#444'}; border-bottom: 1px solid {type === 'general' ? '#e0e0e0' : 'transparent'}">General</button>
		</div>
		<form onsubmit={(e) => e.preventDefault()} class="space-y-4">
			<input type="text" placeholder="Name" class="w-full bg-transparent border-b border-[#2a2a2a] pb-2.5 text-sm text-white/60 placeholder-[#444] outline-none focus:border-[#555] transition-colors" />
			<input type="email" placeholder="Email" class="w-full bg-transparent border-b border-[#2a2a2a] pb-2.5 text-sm text-white/60 placeholder-[#444] outline-none focus:border-[#555] transition-colors" />
			<textarea rows="3" placeholder="Message" class="w-full bg-transparent border-b border-[#2a2a2a] pb-2.5 text-sm text-white/60 placeholder-[#444] outline-none focus:border-[#555] transition-colors resize-none"></textarea>
			<button type="submit" class="px-6 py-2.5 border border-[#333] text-[#999] text-[11px] tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500">Send</button>
		</form>
		<p class="mt-6 text-[11px] text-[#333] tracking-wider">Or <a href="mailto:hello@rajveer.dev" class="text-[#555] hover:text-white transition-colors">hello@rajveer.dev</a></p>
	</div>
</div>

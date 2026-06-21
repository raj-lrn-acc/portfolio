<script lang="ts">
	import { loaderVisible, cursorHover } from '$lib/stores';
	import ThreeScene from '$lib/ThreeScene.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import Loader from '$lib/Loader.svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { fly } from 'svelte/transition';

	let { children } = $props();
	let transitioning = $state(false);

	onNavigate(() => {
		transitioning = true;
		setTimeout(() => { transitioning = false; }, 400);
	});
</script>

<Loader />
<Cursor />
<ThreeScene />
<Header />
<main class="relative z-10 min-h-screen">
	{#key $page.url.pathname}
		<div
			class="animate-in"
			style="animation: fade-up 0.5s ease-out"
		>
			{@render children()}
		</div>
	{/key}
</main>
<Footer />

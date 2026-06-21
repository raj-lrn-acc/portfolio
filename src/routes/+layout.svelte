<script lang="ts">
	import '../app.css';
	import ThreeScene from '$lib/ThreeScene.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import Loader from '$lib/Loader.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<Loader />
<Cursor />
<ThreeScene />
<Header />
<main class="relative z-10 min-h-screen">
	{#key $page.url.pathname}
		<div style="animation: fade-up 0.45s ease-out">
			{@render children()}
		</div>
	{/key}
</main>
<Footer />

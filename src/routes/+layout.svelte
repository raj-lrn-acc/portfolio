<script lang="ts">
	import '../app.css';
	import ThreeScene from '$lib/ThreeScene.svelte';
	import Loader from '$lib/Loader.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import Header from '$lib/Header.svelte';
	import { loaderVisible } from '$lib/stores';

	let { children } = $props();

	let showLoader = $state(true);

	function handleEnter() {
		showLoader = false;
	}
</script>

<Cursor />

{#if showLoader}
	<Loader onEnter={handleEnter} />
{/if}

<div class="min-h-screen" style="transition: opacity 0.8s; opacity: {showLoader ? 0 : 1}">
	<ThreeScene />
	<Header />

	<main class="relative z-10">
		{#key $loaderVisible}
			{@render children()}
		{/key}
	</main>
</div>

<style>
</style>

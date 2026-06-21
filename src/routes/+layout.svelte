<script lang="ts">
	import '../app.css';
	import ThreeScene from '$lib/ThreeScene.svelte';
	import Loader from '$lib/Loader.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import Header from '$lib/Header.svelte';
	import { loaderVisible, mouse } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let showLoader = $state(true);
	let prevLoc = $state('');

	function handleEnter() {
		showLoader = false;
	}

	function handleNavigate() {
		const { pathname } = window.location;
		prevLoc = pathname;
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

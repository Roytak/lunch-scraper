<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import type { lunchMenu } from '$lib/types/lunchMenu.ts';
	import { onMount } from 'svelte';

	let lunches: lunchMenu[];
	let loaded = false;

	onMount(async () => {
		const res = await fetch(`/api/lunch-scraper`).then((res) => res.json());
		lunches = res;
		loaded = true;
	});

</script>

<svelte:head>
	<title>Jíííídloooo</title>
</svelte:head>

<div class="text-center pt-1">
<h1 class="text-3xl font-bold underline">
	Jíííídlooooo Šumavská
</h1>
</div>

{#if !loaded}
	<p>Načítám menu...</p>
	<span class="loading loading-spinner text-primary"></span>
{:else}
	{#if lunches.length === 0}
		<p>Nepodařilo se načíst menu</p>
	{:else}
		<!-- grid for the menus, as many as can fit in a single row, then wrap -->
		 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{#each lunches as lunch}
				<Menu menu= {lunch} />
			{/each}
		</div>
	{/if}
{/if}

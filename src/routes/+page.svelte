<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import type { lunchMenu } from '$lib/types/lunchMenu.ts';

	export let data;
	let lunches: lunchMenu[] = data.lunches;

	console.log(data.lunches);
</script>

<svelte:head>
	<title>Jíííídloooo</title>
</svelte:head>

<div class="text-center pt-1">
<h1 class="text-3xl font-bold underline">
	Jíííídlooooo Šumavská
</h1>
</div>

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

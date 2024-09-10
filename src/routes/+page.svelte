<script lang="ts">
	export let data;

	console.log(data.lunches);
</script>

<svelte:head>
	<title>Jíííídlo</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Menu:</p>
{#each data.lunches as lunch}
	<p>Polevka: {lunch.soup.name} ... {lunch.soup.price} Kc</p>
	<p>Hlavni jidla:</p>
	<ul>
		{#each lunch.main as main}
			<li>{main.name} ... {main.price} Kc</li>
		{/each}
	</ul>
{/each}


<script lang="ts">
    import type { lunchMenu } from '$lib/types/lunchMenu.ts';

    export let menu : lunchMenu;
</script>

<div class="flex w-full flex-col border-opacity-50">
    <div class="card bg-base-300 rounded-box grid place-items-center m-5">
        <h2 class="text-3xl font-bold underline">{menu.restaurantName}</h2>
        <div class="flex w-full justify-between items-center">
            <a href={menu.source} class="text-s link link-primary text-left w-full">Zdroj</a>
            <button class="btn btn-info btn-xs ml-auto">⭐</button>
        </div>
        {#if menu.main.length === 0}
            <p>Nepodařilo se načíst menu</p>
        {:else}
            {#if menu.soup}
                {#if menu.soup.price}
                    <h2 class="text-2xl font-bold underline">Polévka: {menu.soup.name} ... {menu.soup.price} Kč</h2>
                {:else}
                    <h2 class="text-2xl font-bold underline">Polévka: {menu.soup.name} (v ceně menu)</h2>
                {/if}
            {/if}
            {#if menu.main.length > 0}
                    <h2 class="text-2xl font-bold underline">Hlavní jídla:</h2>
                    <ol class="list-decimal">
                        {#each menu.main as main}
                            <li>{main.name} ... {main.price} Kč</li>
                        {/each}
                    </ol>
            {/if}
            {#if menu.weekly}
                <h2 class="text-2xl font-bold underline">Týdenní menu:</h2>
                <ol>
                    {#each menu.weekly as weekly}
                        <li>{weekly.name} ... {weekly.price} Kč</li>
                    {/each}
                </ol>
            {/if}
        {/if}
    </div>
</div>

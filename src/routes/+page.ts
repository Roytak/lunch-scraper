import type { PageLoad } from './$types'

export const prerender = false;

export const load: PageLoad  = async ({ fetch }) => {
    const res = await fetch(`/api/lunch-scraper`);
    if (res.ok) {
        const lunches = await res.json();
        return { lunches };   
    }
}

import type { PageLoad } from './$types'
import { base } from '$app/paths'

export const load: PageLoad  = async ({ fetch }) => {
    const res = await fetch(`${base}/api/lunch-scraper`);
    if (!res.ok) {
        throw new Error('Failed to fetch lunch menu');
    }
    const lunches = await res.json();
    return { lunches };
}

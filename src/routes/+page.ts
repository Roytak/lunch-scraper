import type { PageLoad } from './$types'

export const load: PageLoad  = async ({ fetch }) => {
    const res = await fetch('/api/lunch-scraper');
    if (!res.ok) {
        throw new Error('Failed to fetch lunch menu');
    }
    const lunches = await res.json();
    return { lunches };
}

// @ts-nocheck
import type { PageLoad } from './$types'

export const load  = async ({ fetch }: Parameters<PageLoad>[0]) => {
    const res = await fetch('/api/lunch-scraper');
    if (!res.ok) {
        throw new Error('Failed to fetch lunch menu');
    }
    const lunches = await res.json();
    return { lunches };
}

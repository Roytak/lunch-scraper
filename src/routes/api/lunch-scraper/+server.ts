import type { RequestHandler } from './$types'
import { LunchScraper } from '$lib/server/lunchScraper'

export const prerender = false;

export const GET: RequestHandler = async () => {
	const scraper = LunchScraper.instance;
	const lunches = await scraper.getLunchMenus();
	console.log(lunches);
	return new Response(JSON.stringify(lunches))
}

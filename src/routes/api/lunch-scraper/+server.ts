import type { RequestHandler } from './$types'
import { LunchScraper } from '$lib/server/lunchScraper'

export const prerender = false;

export const GET: RequestHandler = async () => {
	const scraper = LunchScraper.instance;
	console.log(`Scraper: ${scraper}`);
	const lunches = await scraper.getLunchMenus();
	console.log(`Lunches: ${lunches}`);
	const res = new Response(JSON.stringify(lunches));
	console.log(`Response: ${res}`);
	return res;
}

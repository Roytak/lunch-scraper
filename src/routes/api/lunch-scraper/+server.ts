import type { RequestHandler } from './$types'
import { LunchScraper } from '$lib/server/lunchScraper'

export const GET: RequestHandler = async () => {
	const scraper = LunchScraper.instance;
	const lunches = await scraper.getLunchMenu();
	console.log(lunches);
	return new Response(JSON.stringify(lunches))
}

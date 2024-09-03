import { getLunches } from '$lib/server/lunchScraper';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		lunches: await getLunches()
	};
}

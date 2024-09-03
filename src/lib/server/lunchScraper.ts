import type { LunchMenu } from '$lib/types/lunchMenu';

export async function getLunches() : Promise<LunchMenu[]> {
	var a : LunchMenu = {date: 'jedna', lunches: ['dva']};
	return [a];
}

import { BaseScraper } from './baseScraper';
import { SelepkaScraper } from './selepkaScraper';
import { HostinaScraper } from './hostinaScraper';
import type { lunchMenu } from "$lib/types/lunchMenu";

export class LunchScraper {
	static #instance: LunchScraper;
	private static scrapers: BaseScraper[] = [new SelepkaScraper(), new HostinaScraper()];
	private lunchMenus: string[];

	private constructor() { }

	public static get instance(): LunchScraper {
		if (!LunchScraper.#instance) {
			LunchScraper.#instance = new LunchScraper();
		}

		return LunchScraper.#instance;
	}

	private async fetchMenus() {
		
	}

	public async getLunchMenus(): Promise<lunchMenu[]> {
		const menus = await Promise.all(LunchScraper.scrapers.map(scrapers => scrapers.scrapeMenu()));
		return menus.flat();
	}
}

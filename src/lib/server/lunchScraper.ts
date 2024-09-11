import { BaseScraper } from './baseScraper';
import { SelepkaScraper } from './selepkaScraper';
import { HostinaScraper } from './hostinaScraper';
import { PlzenskyDvurScraper } from './plzenskyDvurScraper';
import type { lunchMenu } from "$lib/types/lunchMenu";
import { Cache } from './cache';

export class LunchScraper {
	static #instance: LunchScraper;
	#scrapers: BaseScraper[];
	#cache: Cache;

	private constructor() {
		this.#scrapers = [new SelepkaScraper(), new HostinaScraper(), new PlzenskyDvurScraper()];
		this.#cache = new Cache();
	}

	public static get instance(): LunchScraper {
		if (!LunchScraper.#instance) {
			LunchScraper.#instance = new LunchScraper();
		}

		return LunchScraper.#instance;
	}

	public async getLunchMenus(): Promise<lunchMenu[]> {
		const cachedData = this.#cache.data;
		if (cachedData) {
			/* return cached data if it's not null */
			return cachedData;
		}

		/* otherwise scrape the menus and store them in the cache */
		const menus = await Promise.all(this.#scrapers.map(scraper => scraper.scrapeMenu()));
		this.#cache.data = menus;
		return menus;
	}
}

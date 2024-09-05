import { baseScraper } from './baseScraper';
import { SelepkaScraper } from './selepkaScraper'

export class LunchScraper {
	static #instance: LunchScraper;
	private static scrapers: baseScraper[] = [new SelepkaScraper()];
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

	public async getLunchMenu(): Promise<string[]> {
		const menus = await Promise.all(LunchScraper.scrapers.map(scrapers => scrapers.getLunchMenu()));
		return menus.flat();
	}
}

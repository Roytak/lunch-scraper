import { BaseScraper } from "./baseScraper";
import type { lunchMenu, dish } from "$lib/types/lunchMenu";
import * as cheerio from 'cheerio';

export class HostinaScraper extends BaseScraper {
	constructor() {
		super(2, 'Hostina', 'https://www.mahostina.cz/');
	}

	private scrapeMainDishes($: cheerio.CheerioAPI) : dish[] {
		const list = $(`strong:contains("Dnešní nabídka")`).parent().parent().next();
		const data = list.extract({
			name: [
			{
				selector: 'p'
			}]
		});

		if (data.name.length === 0) {
			return [];
		} else {
			return data.name.map((name) => {
				return {
					/* remove the price from the name */
					name: name.replace(/\d+,-/, '').trim(),
					price: parseInt(name.replace(/\D/g, ''))
				}
			});
		}
	}

	public async scrapeMenu() : Promise<lunchMenu> {
		const $ = await cheerio.fromURL(this._menu.source);

		this._menu.soup = {name: 'Zeleninová polévka', price: 30};
		this._menu.main = this.scrapeMainDishes($);
		this._menu.lastUpdated = new Date().toISOString();
		return this._menu;
	}
}

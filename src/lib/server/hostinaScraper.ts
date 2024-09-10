import { BaseScraper } from "./baseScraper";
import type { lunchMenu } from "$lib/types/lunchMenu";
import * as cheerio from 'cheerio';

export class HostinaScraper extends BaseScraper {
	constructor() {
		super('https://www.mahostina.cz/');
	}

	private scrapeMain($: cheerio.CheerioAPI) {
		const list = $(`strong:contains("Dnešní nabídka")`).parent().parent().next();
		const data = list.extract({
			name: [
			{
				selector: 'p'
			}]
		});

		return data.name.map((name) => {
			return {
				name: name.replace(/\d+,-/, '').trim(),
				price: parseInt(name.replace(/\D/g, ''))
			}
		})
	}

	public async scrapeMenu() {
		const $ = await cheerio.fromURL(this._url);

        return {
            url: this._url,
            soup: {name: 'Zeleninová polévka', price: 30},
            main: this.scrapeMain($)
        } as lunchMenu;
	}
}

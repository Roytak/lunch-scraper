import { BaseScraper } from './baseScraper';
import type { lunchMenu, dish } from "$lib/types/lunchMenu";
import * as cheerio from 'cheerio';

export class SelepkaScraper extends BaseScraper {
    constructor() {
        super(1, 'Šelepka', 'https://www.selepova.cz/denni-menu/');
    }

    private scrapeSoup($: cheerio.CheerioAPI, todayStr: string) : dish {
        const soup = $(`span:contains("${todayStr}")`).parent().next().children('div').text();
        
        if (soup) {
            /* skip the string "Polévka: " */
            return { name: soup.slice(9), price: 0 };
        } else {
            return { name: '', price: 0 };
        }
    }

    private scrapeMain($: cheerio.CheerioAPI, todayStr: string) : dish[] {
        const list = $(`span:contains("${todayStr}")`).parent().next().children('ol');
        const data = list.extract({
            name: [
            {
                selector: 'h6',
            }],
            price: [
            {
                selector: 'span',
            }]
        });

        if (data.name.length === 0) {
            return [];
        } else {
            return data.name.map((name, index) => {
                return {
                    name: name,
                    price: parseInt(data.price[index].replace(/\D/g, ''))
                }
            });
        }
    }

    public async scrapeMenu() : Promise<lunchMenu> {
        console.log('Scraping Selepka menu');
        const todayStr = this.getTodayStr();
        console.log(`Today: ${todayStr}`);
        const $ = await cheerio.fromURL(this._menu.source);
        console.log(`Cheerio: ${$}`);

        this._menu.soup = this.scrapeSoup($, todayStr);
        console.log(`Soup: ${this._menu.soup.name}`);
        this._menu.main = this.scrapeMain($, todayStr);
        this._menu.lastUpdated = new Date().toISOString();

        console.log(`Selepka menu: ${this._menu}`);
        return this._menu;
    }
}

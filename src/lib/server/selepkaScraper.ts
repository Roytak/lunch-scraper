import { BaseScraper } from './baseScraper';
import type { lunchMenu } from "$lib/types/lunchMenu";
import * as cheerio from 'cheerio';

export class SelepkaScraper extends BaseScraper {
    constructor() {
        super('https://www.selepova.cz/denni-menu/');
    }

    private scrapeSoup($: cheerio.CheerioAPI, todayStr: string) {
        const soup = $(`span:contains("${todayStr}")`).parent().next().children('div').text();
        /* skip the string "Polévka: " */
        if (soup) {
            return { name: soup.slice(9), price: 0 };
        }
    }

    private scrapeMain($: cheerio.CheerioAPI, todayStr: string) {
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
        })

        return data.name.map((name, index) => {
            return {
                name: name,
                price: parseInt(data.price[index].replace(/\D/g, ''))
            }
        });
    }

    public async scrapeMenu() {
        const todayStr = this.getTodayStr();
        const $ = await cheerio.fromURL(this._url);

        return {
            url: this._url,
            soup: this.scrapeSoup($, todayStr),
            main: this.scrapeMain($, todayStr)
        } as lunchMenu;
    }
}

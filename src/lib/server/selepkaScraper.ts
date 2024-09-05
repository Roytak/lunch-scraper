import { baseScraper } from './baseScraper';
import * as cheerio from 'cheerio';

export class SelepkaScraper extends baseScraper {
    constructor() {
        super('https://www.selepova.cz/denni-menu/');
    }

    protected scrapeMenu(html: string) {
        const $ = cheerio.load(html);
        const menu = [];
        const today = new Date().toLocaleDateString('cs-CZ', { weekday: 'long' });
        const todayC = today.charAt(0).toUpperCase() + today.slice(1);
        const todayMenu = $(`span:contains(${todayC})`).parent().next().children('div').text();
        menu.push(todayMenu);
        return menu;
    }

    async getLunchMenu() {
        const html = await super.fetchHtml();
        const menu = this.scrapeMenu(html);
        console.log(menu);
        return menu;
    }
}

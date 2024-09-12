import { BaseScraper } from "./baseScraper";
import type { lunchMenu, dish } from "$lib/types/lunchMenu";
import * as cheerio from 'cheerio';

export class PlzenskyDvurScraper extends BaseScraper {
    constructor() {
        super(3, 'Plzeňský dvůr', 'https://www.plzenskydvur.cz/tydenni-menu');
    }

    private scrapeSoup($: cheerio.CheerioAPI, todayStr: string) : dish {
        const soup = $(`h3:contains("${todayStr}")`).next().next().find('.food-title').text();
        
        if (soup) {
            return { name: soup, price: 0 };
        } else {
            return { name: '', price: 0 };
        }
    }

    private scrapeMainDishes($: cheerio.CheerioAPI, todayStr: string) : dish[] {
        const list = $(`h3:contains("${todayStr}")`).parent();
        const data = list.extract({
            name: [
                {
                    selector: '.category-2 .food-title, .category-3 .food-title',
                }
            ],
            price: [
                {
                    selector: '.category-2 .food-price, .category-3 .food-price',
                }
            ]
        });

        if (data.name.length == 0) {
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

    public scrapeWeekly($: cheerio.CheerioAPI) : dish[] | null {
        const div = $(`h3:contains("Týdenní a")`).next();
        const name = div.find('.food-title').text();
        const price = div.find('.food-price').text();

        if (name && price) {
            return [{ name, price: parseInt(price.replace(/\D/g, '' ) ) }];
        } else {
            return null;
        }
    }

    public async scrapeMenu() : Promise<lunchMenu> {
        const html = await this.fetchHtml();
        const $ = await cheerio.load(html);
        const todayStr = this.getTodayStr();

        this._menu.soup = this.scrapeSoup($, todayStr);
        this._menu.main = this.scrapeMainDishes($, todayStr);
        this._menu.weekly = this.scrapeWeekly($);
        this._menu.lastUpdated = new Date().toISOString();

        return this._menu;
    }
}


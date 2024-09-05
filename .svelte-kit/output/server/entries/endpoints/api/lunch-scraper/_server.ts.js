import * as cheerio from "cheerio";
class baseScraper {
  _url;
  constructor(url) {
    this._url = url;
  }
  async fetchHtml() {
    const response = await fetch(this._url);
    const html = await response.text();
    return html;
  }
}
class SelepkaScraper extends baseScraper {
  constructor() {
    super("https://www.selepova.cz/denni-menu/");
  }
  scrapeMenu(html) {
    const $ = cheerio.load(html);
    const menu = [];
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("cs-CZ", { weekday: "long" });
    const todayC = today.charAt(0).toUpperCase() + today.slice(1);
    const todayMenu = $(`span:contains(${todayC})`).parent().next().children("div").text();
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
class LunchScraper {
  static #instance;
  static scrapers = [new SelepkaScraper()];
  lunchMenus;
  constructor() {
  }
  static get instance() {
    if (!LunchScraper.#instance) {
      LunchScraper.#instance = new LunchScraper();
    }
    return LunchScraper.#instance;
  }
  async fetchMenus() {
  }
  async getLunchMenu() {
    const menus = await Promise.all(LunchScraper.scrapers.map((scrapers) => scrapers.getLunchMenu()));
    return menus.flat();
  }
}
const GET = async () => {
  const scraper = LunchScraper.instance;
  const lunches = await scraper.getLunchMenu();
  console.log(lunches);
  return new Response(JSON.stringify(lunches));
};
export {
  GET
};

import type { lunchMenu } from "$lib/types/lunchMenu";

export abstract class BaseScraper {
	protected _menu: lunchMenu;

	constructor(id: number, restaurantName: string, source: string) {
		this._menu = {
			id,
			restaurantName,
			source,
			soup: { name: "", price: 0 },
			main: [],
			weekly: null,
			lastUpdated: "",
		};
	}

	protected getTodayStr(capitalize: boolean = true): string {
		const today = new Date().toLocaleDateString("cs-CZ", { weekday: "long" });
		if (capitalize) {
			return today.charAt(0).toUpperCase() + today.slice(1);
		}
		return today;
	}

	protected async fetchHtml(): Promise<string> {
		const response = await fetch(this._menu.source);
		const html = await response.text();
		return html;
	}

	public abstract scrapeMenu(): Promise<lunchMenu>;
}

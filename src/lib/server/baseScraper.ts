import type { lunchMenu } from "$lib/types/lunchMenu";

export abstract class BaseScraper {
	protected _url: string;

	constructor(url: string) {
		this._url = url;
	}

	protected getTodayStr(capitalize: boolean = true): string {
		const today = new Date().toLocaleDateString("cs-CZ", { weekday: "long" });
		if (capitalize) {
			return today.charAt(0).toUpperCase() + today.slice(1);
		}
		return today;
	}

	protected async fetchHtml(): Promise<string> {
		const response = await fetch(this._url);
		const html = await response.text();
		return html;
	}

	public abstract scrapeMenu(): Promise<lunchMenu>;
}

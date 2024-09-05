
export abstract class baseScraper {
	protected _url: string;

	constructor(url: string) {
		this._url = url;
	}

	protected async fetchHtml(): Promise<string> {
		const response = await fetch(this._url);
		const html = await response.text();
		return html;
	}

	protected abstract scrapeMenu(html: string): string[];

	public abstract getLunchMenu(): Promise<string[]>;
}

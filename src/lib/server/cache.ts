import type { lunchMenu } from "$lib/types/lunchMenu";

export class Cache {
    #data: lunchMenu[];
    readonly #ttl = 15 * 60 * 1000; // 15 minutes
    #lastAccess: number;

    constructor() { 
        this.#data = [];
        this.#lastAccess = Date.now();
    }

    public get data(): lunchMenu[] | null {
        const now = Date.now();
        const lastAccess = this.#lastAccess;

        this.#lastAccess = now;
        if (now - lastAccess > this.#ttl) {
            console.log('Cache expired');
            return null;
        } else if (this.#data.length === 0) {
            console.log('Cache empty');
            return null;
        }

        console.log('Cache hit');
        return this.#data;
    }

    public set data(data: lunchMenu[]) {
        this.#data = data;
    }
}

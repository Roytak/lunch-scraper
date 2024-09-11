
export interface dish {
	name: string;
	price: number | null;
}

export interface lunchMenu {
	id: number;
	restaurantName: string;
	source: string;
	soup: dish;
	main: dish[];
	weekly: dish[] | null;
	lastUpdated: string;
}

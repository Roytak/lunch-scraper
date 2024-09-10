
interface meal {
	name: string;
	price: number;
}

export interface lunchMenu {
	url: string;
	soup: meal;
	main: meal[];
}

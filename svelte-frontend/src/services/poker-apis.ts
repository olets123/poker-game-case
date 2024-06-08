import type { CompareHand, GenerateHand, Hand } from '../$lib/hand-types';
import { apiUrl } from '../$lib/utils';

export default class PokerApis {
	apiUrl: string;

	constructor(apiUrl: string) {
		this.apiUrl = apiUrl;
	}

	async compareHands(hands: Array<Array<string>>): Promise<CompareHand | undefined> {
		const response = await fetch(`${this.apiUrl}/compare-hands`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hands: hands })
		});

		return response.json();
	}

	async getAllPokerHands(): Promise<Hand[] | undefined> {
		try {
			const response = await fetch(`${this.apiUrl}/hands`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching hands:', error);
		}
	}

	async generatePokerHand(): Promise<GenerateHand | undefined> {
		try {
			const response = await fetch(`${this.apiUrl}/generate-hand`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			});
			if (!response.ok) {
				throw new Error('Failed to generate hand');
			}
			const data: GenerateHand = await response.json();
			return data;
		} catch (err) {
			console.error(err);
		}
	}
}

export const pokerApi = new PokerApis(apiUrl);

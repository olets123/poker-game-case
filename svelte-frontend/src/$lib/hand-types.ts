export type Hand = {
	cards: string[];
	rankings: string;
};

export type GenerateHand = {
	hand: Hand;
};

export type CompareHand = {
	winningHand: string[];
	winningIndex: number;
};

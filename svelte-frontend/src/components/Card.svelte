<script lang="ts">
	export let card: string;

	const valueMapping: { [key: string]: string } = {
		t: '10',
		j: 'J',
		q: 'Q',
		k: 'K',
		a: 'A'
	};

	const suitMapping: { [key: string]: string } = {
		h: '♥',
		d: '♦',
		s: '♠',
		c: '♣'
	};

	const getCardDisplayValue = (value: string): string => {
		return valueMapping[value] || value;
	};

	const getSuitSymbol = (suit: string): string => {
		return suitMapping[suit] || '';
	};

	const getSuitColorClass = (suit: string): string => {
		switch (suit) {
			case 'h':
			case 'd':
				return 'text-red-600';
			case 's':
			case 'c':
				return 'text-black';
			default:
				return '';
		}
	};

	const value = card.slice(0, -1); // Extract value
	const suit = card.slice(-1); // Extract suit
</script>

<div
	class="card w-16 h-24 flex flex-col justify-between p-1 border rounded-lg text-center bg-white m-1"
>
	<div class={`card-value-top-left ${getSuitColorClass(suit)}`}>{getCardDisplayValue(value)}</div>
	<div class={`card-suit ${getSuitColorClass(suit)}`}>{getSuitSymbol(suit)}</div>
	<div class={`card-value-bottom-right ${getSuitColorClass(suit)}`}>
		{getCardDisplayValue(value)}
	</div>
</div>

<style>
	.card-value {
		font-size: 0.75rem;
	}
	.card-suit {
		font-size: 1.5rem;
	}
	.card-value-top-left {
		text-align: left;
	}
	.card-value-bottom-right {
		text-align: right;
	}
</style>

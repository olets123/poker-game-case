<script lang="ts">
	import Card from '../../components/Card.svelte';
	import Nav from '../../components/Nav.svelte';
	import type { GenerateHand } from '../../$lib/hand-types';
	import { pokerApi } from '../../services/poker-apis';
	import LoadingRing from '../../components/LoadingRing.svelte';

	let generateHandCards: Promise<GenerateHand | undefined> | null = null;

	const generateHand = async (): Promise<GenerateHand | undefined> => {
		try {
			const hand = await pokerApi.generatePokerHand();
			return hand;
		} catch (err) {}
	};

	const onGenerate = () => {
		if (generateHand) generateHandCards = generateHand();
	};
</script>

<Nav />
<div class="container mx-auto p-4 flex flex-col w-full items-center self-center h-full">
	<div class="flex flex-col items-center h-60">
		{#if generateHandCards}
			{#await generateHandCards}
				<LoadingRing />
			{:then value}
				{#if value && value.hand}
					{#key value.hand && Array.isArray(value.hand)}
						<div id="generated-hand" class="flex justify-center items-center my-4">
							{#each value.hand.cards as card}
								<Card {card} />
							{/each}
						</div>
						<div class="text-center my-2">
							{value.hand.rankings && `Hand ranking: ${value.hand.rankings}`}
						</div>
					{/key}
				{/if}
			{:catch error}
				<p>Something went wrong: {error.message}</p>
			{/await}
		{/if}
	</div>
	<div class="flex justify-center">
		<button id="generate-btn" class="btn btn-secondary" on:click={onGenerate}
			>Generate new hand</button
		>
	</div>
</div>

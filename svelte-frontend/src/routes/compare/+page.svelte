<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../../components/Card.svelte';
	import Nav from '../../components/Nav.svelte';
	import type { CompareHand, Hand } from '../../$lib/hand-types';
	import CardCompare from '../../components/CardCompare.svelte';
	import { pokerApi } from '../../services/poker-apis';
	import LoadingRing from '../../components/LoadingRing.svelte';

	let selectedHandOne: string[] | null = null;
	let selectedHandTwo: string[] | null = null;
	let compareSelectedHands: Promise<CompareHand | undefined> = Promise.resolve(undefined);
	let numberOfHandsToShow = 6;
	let errorMessageIfNotSelected = '';
	const selectedValuesIsNull = selectedHandOne === null && selectedHandTwo === null;

	const getAllHands = async (): Promise<Hand[] | undefined> => {
		try {
			return await pokerApi.getAllPokerHands();
		} catch (error) {
			errorMessageIfNotSelected = 'Error fetching hands';
			console.error('Error fetching hands:', error);
		}
	};

	onMount(() => getAllHands());

	const onHandRowClick = (cards: string[]) => {
		if (!selectedHandOne) {
			selectedHandOne = cards;
		} else if (!selectedHandTwo) {
			selectedHandTwo = cards;
		} else {
			selectedHandOne = cards;
			selectedHandTwo = null;
		}
	};

	const compareHands = async (): Promise<CompareHand | undefined> => {
		if (selectedHandOne && selectedHandTwo) {
			return await pokerApi.compareHands([selectedHandOne, selectedHandTwo]);
		}
	};

	const onCompareHandsClick = () => {
		if (selectedValuesIsNull) {
			errorMessageIfNotSelected = 'You must select two hands to compare';
		}
		compareSelectedHands = compareHands();
	};

	const onLoadMoreHands = () => {
		numberOfHandsToShow += 6;
	};

	const onResetCompare = () => {
		errorMessageIfNotSelected = '';
		selectedHandOne = null;
		selectedHandTwo = null;
		compareSelectedHands = Promise.resolve(undefined);
	};
</script>

<Nav />
<div class="container mx-auto p-4 flex flex-col justify-center self-center w-full">
	<div class="flex flex-col h-full"></div>
	{#if selectedHandOne !== null && selectedHandTwo !== null}
		<div id="compare-hands-battle" class="flex">
			<CardCompare {selectedHandOne} {selectedHandTwo} />
		</div>
	{:else}
		<div class="flex justify-center">
			<p>{errorMessageIfNotSelected}</p>
		</div>
	{/if}

	<div class="flex flex row justify-center m-8">
		<button id="compare-btn" class="btn btn-secondary mr-2" on:click={onCompareHandsClick}
			>Compare Hands</button
		>
		<button id="reset-compare-btn" class="btn btn-outline" on:click={onResetCompare}>Reset</button>
	</div>

	{#await compareSelectedHands}
		<div class="flex justify-center w-full">
			<LoadingRing />
		</div>
	{:then value}
		{#if value}
			<div id="winning-hand" class="flex flex-row my-2 justify-center items-center">
				{#each value.winningHand as card}
					<Card {card} />
				{/each}
			</div>
			<div class="flex flex row justify-center">
				{#if value.winningHand.length > 0}
					<article class="prose lg:prose-md mb-8">
						<h2 class="text-white">{`Hand ${value.winningIndex + 1} wins 🥳`}</h2>
					</article>
				{/if}
			</div>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}

	<div class="divider" />

	<div class="flex flex-col justify-center m-4 w-full">
		{#await getAllHands()}
			<div class="flex justify-center w-full">
				<LoadingRing />
			</div>
		{:then hands}
			{#if hands}
				<div class="flex flex-row my-2 justify-center items-center flex-wrap">
					{#each hands.slice(0, numberOfHandsToShow) as hand}
						<div
							id="hand-row"
							class="hand-card shadow-lg p-2 mb-4 m-2"
							on:click={() => onHandRowClick(hand.cards)}
							class:border={(selectedHandOne && selectedHandOne === hand.cards) ||
								(selectedHandTwo && selectedHandTwo === hand.cards)}
							role="presentation"
						>
							<div class="flex">
								{#each hand.cards as card}
									<Card {card} />
								{/each}
							</div>
							<div class="hand-analysis mt-2 text-center">{hand.rankings}</div>
						</div>
					{/each}
				</div>
				<div class="flex justify-center">
					{#if numberOfHandsToShow < hands.length}
						<button id="load-btn" class="btn btn-secondary" on:click={onLoadMoreHands}
							>Load More</button
						>
					{/if}
				</div>
			{/if}
		{/await}
	</div>
</div>

<style>
	.hand-card.border {
		border: 1px solid oklch(var(--s));
	}
</style>

<script lang="ts">
	import Card from './Card.svelte';

	export let selectedHandOne: string[] = [];
	export let selectedHandTwo: string[] = [];
</script>

<div class="flex flex-row w-full justify-center">
	<!-- Display cards from hand1 -->
	{#each selectedHandOne as card (card)}
		{#if card.trim() !== ''}
			<Card {card} />
		{/if}
	{/each}

	<!-- Display VS text -->
	<div class="divider lg:divider-horizontal m-1 bg-base-200">
		<div class="vs-text">VS</div>
	</div>

	<!-- Display cards from hand2 -->
	{#each selectedHandTwo as card (card)}
		{#if card.trim() !== ''}
			<Card {card} />
		{/if}
	{/each}
</div>

<style>
	.vs-text {
		margin: 0 10px;
		align-self: center;
		font-weight: bold;
	}
</style>

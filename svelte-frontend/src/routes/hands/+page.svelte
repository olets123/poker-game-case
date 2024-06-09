<script lang="ts">
	import Nav from '../../components/Nav.svelte';
	import { onMount } from 'svelte';
	import type { Hand } from '../../$lib/hand-types';
	import { pokerApi } from '../../services/poker-apis';
	import LoadingRing from '../../components/LoadingRing.svelte';
	import HandsTable from 'components/HandsTable.svelte';

	const getAllHands = async (): Promise<Hand[] | undefined> => {
		try {
			return await pokerApi.getAllPokerHands();
		} catch (error) {
			console.error('Error fetching hands:', error);
		}
	};

	onMount(() => getAllHands());
</script>

<Nav />
<div class="container mx-auto p-4 flex flex-col w-full">
	<div class="flex flex-col w-full">
		{#await getAllHands()}
			<div class="flex justify-center w-full">
				<LoadingRing />
			</div>
		{:then hands}
			{#if hands}
				<div id="hands-stats" class="stats shadow">
					<div class="stat">
						<div class="stat-title">Total hands generated</div>
						<div class="stat-value">{hands.length}</div>
					</div>
				</div>
				<HandsTable {hands} />
			{/if}
		{/await}
	</div>
</div>

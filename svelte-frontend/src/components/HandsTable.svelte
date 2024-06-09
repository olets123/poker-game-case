<script lang="ts">
	import type { Hand } from '../$lib/hand-types';
	import Card from './Card.svelte';

	export let hands: Hand[] = [];
</script>

<div class="overflow-auto w-full h-auto">
	<table id="hands-table" class="table table-sm">
		<thead class="sticky top-0 divide-y z-50 shadow-lg bg-neutral">
			<tr>
				<th>Hand</th>
				<th>Ranking</th>
			</tr>
		</thead>
		<tbody>
			{#each hands as hand}
				<tr>
					<td>
						<div class="flex flex-row justify-start">
							{#each hand.cards as card}
								<Card {card} />
							{/each}
						</div>
					</td>
					<td>
						{hand.rankings}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

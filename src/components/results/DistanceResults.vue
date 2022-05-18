<template>
	<div class="result__row-container">
		<template v-for="(result, idx) in calculateResults()">
			<span class="result__distance font-weight-bold" :key="idx + '-distance'">{{idx}}m: </span>
			<span class="result__hits" :key="idx + '-hits'">{{result.hits}} / {{result.total}}</span>
			<Bar :at="percent(result)" :total="result.total" :key="idx + '-bar'"/>
			<span class="percent" :key="idx + '-percent'">{{percent(result)}}%</span>
		</template>
	</div>
</template>

<script lang="ts">
	import Vue, {PropType} from "vue";
	import Bar from "@/components/results/Bar.vue";
	import Rule from "@/model/types/Rule";
	import Round from "@/model/types/Round";
	import Game from "@/model/types/Game";

	export default Vue.extend({
		props: {
			rules: {
				type: Object as PropType<Rule>,
				required: true
			},
			rounds: {
				type: Array as PropType<Round[]>,
				required: true
			},
			game: {
				type: Object as PropType<Game>,
				required: false
			}
		},
		methods: {
			initializeResults(distances: number[]): { [id: number]: { total: number, hits: number } } {
				const result: { [id: number]: { total: number, hits: number } } = {};
				distances.forEach(function (distance) {
					result[distance] = {total: 0, hits: 0};
				});
				return result;
			},
			calculateResults(): { [id: number]: { total: number, hits: number } } {
				const results = this.initializeResults(this.rules.distances(this.game ? this.game.ruleModifiers : undefined));
				for (let i in this.rounds) {
					const round = this.rounds[i];
					results[round.distance] = {
						total: results[round.distance].total + this.rules.discs,
						hits: results[round.distance].hits + round.hits,
					};
				}
				return results;
			},
			percent(result: { total: number, hits: number }): number {
				return result.total === 0 ? 0 : Math.round(result.hits * 100 / result.total);
			}
		},
		components: {
			Bar
		}
	});
</script>

<style>
	.result__row-container {
		display: grid;
		grid-template-columns: max-content max-content 1fr max-content;
		width: 100%;
		grid-gap: 1rem;
	}
</style>
<template>
	<div>
		<v-expansion-panels v-if="gamesByRules">
			<v-expansion-panel v-for="(games, ruleId) in gamesByRules" :key="ruleId">
				<v-expansion-panel-header v-if="games.length">
					{{$t(ruleId)}}
				</v-expansion-panel-header>
				<v-expansion-panel-content v-if="games.length">
					<v-container>
						<LineChart :chart-data="chartData(games, ruleId)"/>
					</v-container>
					<GameStats :rules="rule(ruleId)" :games="games"/>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/model/types/Game";
	import GameStats from "@/components/stats/GameStats.vue";
	import Rule from "@/model/types/Rule";
	import Rules from "@/model/rules/Rules";
	import LineChart from "@/components/stats/LineChart.vue";

	export default Vue.extend({
		computed: {
			gamesByRules(): { [key: string]: Game[] } {
				return this.$store.getters.categorizedByRules;
			}
		},
		methods: {
			rule(ruleId: string): Rule {
				return Rules.byId(ruleId);
			},
			chartData(games: Game[], ruleId: string): any {
				const scores = games.map(game => ({
					x: new Date(game.completed!),
					y: game.players[0].score
				}));
				return {
					datasets: [{
						label: this.$t(ruleId),
						data: scores,
						borderColor: Rules.byId(ruleId).color,
						fill: false
					}]
				}
			}
		},
		components: {
			LineChart,
			GameStats
		}
	});
</script>
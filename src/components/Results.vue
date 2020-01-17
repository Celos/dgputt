<template>
	<v-card>
		<div class="display-4 text-center">{{game.score}}</div>
		<div class="result__row-container pa-2">
			<template v-for="(result, idx) in calculateResults()">
				<span class="result__distance font-weight-bold" :key="idx + '-distance'">{{idx}}m: </span>
				<span class="result__hits" :key="idx + '-hits'">{{result.hits}} / {{result.total}}</span>
				<Bar :at="percent(result)" :key="idx + '-bar'"/>
				<span class="percent" :key="idx + '-percent'">{{percent(result)}}%</span>
			</template>
		</div>
		<div class="results__actions mt-2 pa-2">
			<v-btn class="results__back" color="secondary" @click="back">{{$t("back")}}</v-btn>
			<div class="results__actions-divider"></div>
			<v-btn class="results__new" color="secondary" @click="newGame">{{$t("newGame")}}</v-btn>
		</div>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/types/Game";
	import Bar from "@/components/Bar.vue";
	import Rules from "@/components/rules/Rules";
	import Rule from "@/types/Rule";
	import {ADD_GAME, DELETE_ROUND} from "@/store/action-types";
	import GameFactory from "@/components/GameFactory";
	
	export default Vue.extend({
		props: {
			game: {
				type: Object as () => Game,
				required: true
			}
		},
		computed: {
			rules(): Rule {
				return Rules.byId(this.game.ruleId);
			}
		},
		methods: {
			initializeResults(distances: number[]): {[id: number]: {total: number, hits: number}} {
				let result: {[id: number]: {total: number, hits: number}} = {};
				distances.forEach(function(distance) {
					result[distance] = {total: 0, hits: 0};
				});
				return result;
			},
			calculateResults(): {[id: number]: {total: number, hits: number}} {
				let results = this.initializeResults(this.rules.distances);
				for (let i in this.game.rounds) {
					let round = this.game.rounds[i];
					results[round.distance] = {
						total: results[round.distance].total + this.rules.discs,
						hits: results[round.distance].hits + round.hits,
					};
				}
				return results;
			},
			percent(result: {total: number, hits: number}): number {
				return result.total === 0 ? 0 : Math.round(result.hits*100/result.total);
			},
			back(): void {
				if (this.$router.currentRoute.path.includes("games")) {
					this.$store.dispatch(DELETE_ROUND, {
						game: this.game,
						roundIdx: this.game.rounds.length - 1
					}).then(() => this.$router.push({name: "game", params: {id: this.game.id}}));
				} else {
					this.$router.push({name: "history"});
				}
			},
			newGame(): void {
				let game: Game = GameFactory.create(this.rules, this.$store.getters.user);
				this.$store.dispatch(ADD_GAME, game).then(() => {
					this.$router.push({name: "game", params: {id: game.id}});
				});
			}
		},
		components: {
			Bar
		}
	});
</script>

<style scoped>
	.result__row-container {
		display: grid;
		grid-template-columns: max-content max-content 1fr max-content;
		width: 100%;
		grid-gap: 1rem;
	}
	.results__actions {
		display: flex;
		flex-direction: row;
	}
	.results__back, .results__new {
		flex-shrink: 0;
		flex-grow: 0;
	}
	.results__actions-divider {
		flex-grow: 1;
		flex-shrink: 1;
	}
</style>

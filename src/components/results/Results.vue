<template>
	<div>
		<v-card v-for="(player, idx) in game.players" :key="player.id" class="mb-2">
			<div v-if="game.players.length > 1" class="headline text-center">
				{{$store.getters.playerName(player)}}
			</div>
			<div class="display-4 text-center">{{player.score}}</div>
			<div class="pa-2">
				<DistanceResults :rules="rules" :rounds="playerRounds(player.id)" :game="game"/>
			</div>
			<v-expansion-panels>
				<v-expansion-panel v-model="roundsList[idx]">
					<v-expansion-panel-header>{{$t("rounds")}}</v-expansion-panel-header>
					<v-expansion-panel-content>
						<div :class="['result__round-breakdown', roundBreakdownClass()]">
							<div :class="['result__round', 'pa-2', 'text-center', roundColorClass(round)]" v-for="(round, roundIdx) in playerRounds(player.id)" :key="roundIdx">
								<span class="nowrap">{{roundIdx + 1}}.</span>
								<span class="nowrap">{{round.distance}}m</span>
								<span class="nowrap">{{round.hits}}/{{discs}}</span>
							</div>
						</div>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-card>
		<div class="results__actions mt-2 pa-2">
			<v-btn class="results__back" color="secondary" @click="back">{{$t("back")}}</v-btn>
			<div class="results__actions-divider"></div>
			<v-btn class="results__new" color="secondary" @click="newGame">{{$t("newGame")}}</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue, {PropType} from "vue";
	import Game from "@/model/types/Game";
	import Rules from "@/model/rules/Rules";
	import Rule from "@/model/types/Rule";
	import {DELETE_ROUND} from "@/store/action-types";
	import Round from "@/model/types/Round";
	import {routeNames} from "@/plugins/routeNames";
	import DistanceResults from "@/components/results/DistanceResults.vue";

	export default Vue.extend({
		props: {
			game: {
				type: Object as PropType<Game>,
				required: true
			}
		},
		data() {
			return {
				roundsList: Array(this.game.players.length).fill(false) as boolean[]
			}
		},
		computed: {
			rules(): Rule {
				return Rules.byId(this.game.ruleId);
			},
			discs(): number {
				let discs = this.rules.discs;
				if (this.game.ruleModifiers && this.game.ruleModifiers.discs) {
					discs = this.game.ruleModifiers.discs;
				}
				return discs;
			}
		},
		methods: {
			playerRounds(playerId: number): Round[] {
				return this.game.rounds.filter(round => round.playerId === playerId);
			},
			back(): void {
				if (this.$router.currentRoute.path.includes("games")) {
					this.$store.dispatch(DELETE_ROUND, {
						game: this.game,
						roundIdx: this.game.rounds.length - 1
					}).then(() => this.$router.push({name: routeNames.game, params: {id: this.game.id}}));
				} else {
					this.$router.push({name: routeNames.history});
				}
			},
			newGame(): void {
				this.$router.push({name: routeNames.games});
			},
			roundColor(round: Round): string {
				const percent = Math.round(round.hits * 100 / this.discs);
				return percent < 25 ? "red" : percent < 50 ? "orange" : percent < 75 ? "yellow" : "green";
			},
			roundColorClass(round: Round): string {
				return "result__round--" + this.roundColor(round);
			},
			roundBreakdownClass() {
				return "result__round-breakdown--" + (this.$store.getters.isDark ? "dark" : "light");
			}
		},
		components: {
			DistanceResults
		}
	});
</script>

<style scoped>
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
	.result__round-breakdown {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-auto-rows: max-content;
		width: 100%;
	}
	.result__round-breakdown--light .result__round {
		border-color: #E0E0E0;
	}
	.result__round-breakdown--dark .result__round {
		border-color: #616161;
	}
	.result__round {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		width: 100%;
		border-top-width: 1px;
		border-top-style: solid;
		border-right-width: 1px;
		border-right-style: solid;
	}
	.result__round-breakdown div:nth-child(-n+5) {
		border-top: none;
	}
	.result__round-breakdown div:nth-child(5n) {
		border-right: none;
	}
	.nowrap {
		white-space: nowrap;
	}
	.result__round--red {
		background-color: rgba(239,83,80,0.2);
	}
	.result__round--orange {
		background-color: rgba(255,167,38,0.2);
	}
	.result__round--yellow {
		background-color: rgba(255,238,88,0.2);
	}
	.result__round--green {
		background-color: rgba(102,187,106,0.2);
	}
</style>

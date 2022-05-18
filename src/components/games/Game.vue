<template>
	<div class="game">
		<div class="scoreboard-container mb-2">
			<ScoreDisplay :game="game"
				:distance="currentDistance"
				:player="currentPlayer"/>
		</div>
		<div class="scoring-container">
			<ScoreInput :discs="discs" @score="addRound" />
			<div class="game__actions mt-2">
				<v-btn class="game__back" v-show="notFirst" color="secondary" @click="back">{{$t("back")}}</v-btn>
				<div class="game__actions-divider"></div>
				<v-btn class="game__new" color="secondary" @click="newGame">{{$t("newGame")}}</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import ScoreDisplay from "./ScoreDisplay.vue";
import ScoreInput from "./ScoreInput.vue";

import Vue, {PropType} from "vue";
import Game from "@/model/types/Game";
import {ADD_ROUND, DELETE_ROUND} from "@/store/action-types";
import Round from "@/model/types/Round";
import Rule from '@/model/types/Rule';
import Rules from '../../model/rules/Rules';
import Player from "@/model/types/Player";
import {routeNames} from "@/plugins/routeNames";

export default Vue.extend({
		name: "Game",
		props: {
			game: {
				type: Object as PropType<Game>,
				required: true
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
			},
			startingDistance(): number {
				let startingDistance = this.rules.start;
				if (this.game.ruleModifiers && this.game.ruleModifiers.start) {
					startingDistance = this.game.ruleModifiers.start;
				}
				return startingDistance;
			},
			currentDistance(): number {
				if (!this.game.rounds.length || !this.currentPlayerRounds.length) {
					return this.startingDistance;
				}
				const prevRound = this.currentPlayerRounds[this.currentPlayerRounds.length - 1];
				return this.rules.nextRound(prevRound.distance, prevRound.hits, this.game);
			},
			currentPlayerRounds(): Round[] {
				return this.game.rounds.filter(round => round.playerId === this.currentPlayer.id);
			},
			currentPlayer(): Player {
				if (this.game.players.length === 1 || !this.game.rounds.length) {
					return this.game.players[0];
				}
				const prevId = this.game.rounds[this.game.rounds.length - 1].playerId;
				const prevPlayerIdx = this.game.players.findIndex(player => player.id === prevId);
				const currentPlayerIdx = prevPlayerIdx + 1 === this.game.players.length ? 0 : prevPlayerIdx + 1;
				return this.game.players[currentPlayerIdx];
			},
			notFirst(): boolean {
				return this.game.rounds.length > 0;
			}
		},
		methods: {
			addRound(hits: number): void {
				let round: Round = {
					playerId: this.currentPlayer.id,
					distance: this.currentDistance,
					hits: hits
				};
				this.$store.dispatch(ADD_ROUND, {
					game: this.game,
					round: round
				}).then(() => {
					if (this.game.completed) {
						this.$router.push({path: "/games/result/" + this.game.id}).catch(() => {});
					}
				});
			},
			back(): void {
				if (!this.game.rounds.length) return;
				this.$store.dispatch(DELETE_ROUND, {
					game: this.game,
					roundIdx: this.game.rounds.length - 1
				});
			},
			newGame(): void {
				this.$router.push({name: routeNames.deleteGame, params: {"id": this.game.id}}).catch(() => {});
			}
		},
		components: {
			ScoreDisplay, ScoreInput
		}
	});
</script>

<style scoped>
	.game {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.scoreboard-container {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
	}
	.scoring-container {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: content;
	}
	.game__actions {
		display: flex;
		flex-direction: row;
	}
	.game__back, .game__new {
		flex-shrink: 0;
		flex-grow: 0;
	}
	.game__actions-divider {
		flex-grow: 1;
		flex-shrink: 1;
	}
</style>

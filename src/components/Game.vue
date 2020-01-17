<template>
	<div class="game">
		<div class="scoreboard-container mb-2">
			<Scoreboard :game="game" :distance="currentDistance"/>
		</div>
		<div class="scoring-container">
			<ScoreInput :discs="rules.discs" @score="addRound" />
			<div class="game__actions mt-2">
				<v-btn class="game__back" v-show="notFirst" color="secondary" @click="back">{{$t("back")}}</v-btn>
				<div class="game__actions-divider"></div>
				<v-btn class="game__new" color="secondary" @click="newGame">{{$t("newGame")}}</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Scoreboard from "./Scoreboard.vue";
	import ScoreInput from "./ScoreInput.vue";
	
	import Vue from "vue";
	import Game from "@/types/Game";
	import {ADD_ROUND, DELETE_GAME, DELETE_ROUND} from "@/store/action-types";
	import Round from "@/types/Round";
	import Rule from '@/types/Rule';
	import Rules from './rules/Rules';
	
	export default Vue.extend({
		name: "Game",
		props: {
			game: {
				type: Object as () => Game,
				required: true
			}
		},
		computed: {
			rules(): Rule {
				return Rules.byId(this.game.ruleId);
			},
			currentDistance(): number {
				if (!this.game.rounds.length) {
					return this.rules.start;
				}
				let prevRound = this.game.rounds[this.game.rounds.length - 1];
				return this.rules.nextRound(prevRound.distance, prevRound.hits);
			},
			notFirst(): boolean {
				return this.game.rounds.length > 0;
			}
		},
		methods: {
			addRound(hits: number): void {
				let round: Round = {
					playerId: 1,
					distance: this.currentDistance,
					hits: hits
				};
				this.$store.dispatch(ADD_ROUND, {
					game: this.game,
					round: round
				}).then(() => {
					if (this.game.completed) {
						this.$router.push({path: "/games/result/" + this.game.id});
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
				let id = this.game.id;
				this.$store.dispatch(DELETE_GAME, id).then(() => {
					this.$router.push({name: "games"});
				});
			}
		},
		components: {
			Scoreboard, ScoreInput
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

<template>
	<v-card class="mb-1 score-display">
		<div class="text-center score-display__passive">
			<div v-if="previousPlayer">
				{{$t("prev", {
					player: $store.getters.playerName(previousPlayer),
					hits: playerHits(previousPlayer),
					distance: playerDistance(previousPlayer)
				})}}
			</div>
		</div>
		<div class="text-center score-display__active">
			<PlayerScoreDisplay :multiplayer="game.players.length > 1" :player="player" :game="game" />
		</div>
		<div class="text-center score-display__passive">
			<div v-if="nextPlayer">
				{{$t("upNext", {
					player: $store.getters.playerName(nextPlayer),
					distance: playerDistance(nextPlayer)
				})}}
			</div>
		</div>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/types/Game";
	import Player from "@/types/Player";
	import PlayerScoreDisplay from "@/components/PlayerScoreDisplay.vue";
	import Round from "@/types/Round";
	import Rule from "@/types/Rule";
	import Rules from "@/components/rules/Rules";

	export default Vue.extend({
		props: {
			game: {
				type: Object as () => Game,
				required: true
			},
			player: {
				type: Object as () => Player,
				required: true
			}
		},
		computed: {
			rules(): Rule {
				return Rules.byId(this.game.ruleId);
			},
			previousPlayer(): Player | undefined {
				if (this.game.players.length === 1 || !this.game.rounds.length) {
					return undefined;
				}
				let currentPlayerIdx = this.game.players.findIndex(player => player.id === this.player.id);
				if (currentPlayerIdx === 0 && this.game.rounds.length === 0) {
					return undefined;
				}
				let prevPlayerIdx = currentPlayerIdx - 1 < 0 ? this.game.players.length - 1 : currentPlayerIdx - 1;
				return this.game.players[prevPlayerIdx];
			},
			nextPlayer(): Player | undefined {
				if (this.game.players.length === 1) {
					return undefined;
				}
				let playerIdx = this.game.players.findIndex(player => player.id === this.player.id);
				let nextPlayerIdx = playerIdx + 1 >= this.game.players.length ? 0 : playerIdx + 1;
				return this.game.players[nextPlayerIdx];
			}
		},
		methods: {
			playerRounds(player: Player): Round[] | undefined {
				if (!this.game.rounds || !this.game.rounds.length) return undefined;
				return this.game.rounds.filter(round => round.playerId === player.id);
			},
			playerDistance(player: Player): number {
				let playerRounds = this.playerRounds(player);
				return playerRounds ? playerRounds[playerRounds.length - 1].distance : this.rules.start;
			},
			playerHits(player: Player): number {
				let playerRounds = this.playerRounds(player);
				return playerRounds ? playerRounds[playerRounds.length - 1].hits : 0;
			}
		},
		components: {
			PlayerScoreDisplay
		}
	});
</script>

<style scoped>
	.score-display {
		height: 100%;
		display: grid;
		grid-template-rows: max-content 1fr max-content;
	}
	.score-display__active, .score-display__passive {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.score-display__passive {
		opacity: 0.6;
		justify-content: end;
	}
</style>

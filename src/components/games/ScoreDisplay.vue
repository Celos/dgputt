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
					distance: nextDistance(nextPlayer)
				})}}
			</div>
		</div>
	</v-card>
</template>

<script lang="ts">
	import Vue, {PropType} from "vue";
	import Game from "@/model/types/Game";
	import Player from "@/model/types/Player";
	import PlayerScoreDisplay from "@/components/games/PlayerScoreDisplay.vue";
	import Round from "@/model/types/Round";
	import Rule from "@/model/types/Rule";
	import Rules from "@/model/rules/Rules";

	export default Vue.extend({
		props: {
			game: {
				type: Object as PropType<Game>,
				required: true
			},
			player: {
				type: Object as PropType<Player>,
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
				const currentPlayerIdx = this.game.players.findIndex(player => player.id === this.player.id);
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
				const playerIdx = this.game.players.findIndex(player => player.id === this.player.id);
				const nextPlayerIdx = playerIdx + 1 >= this.game.players.length ? 0 : playerIdx + 1;
				return this.game.players[nextPlayerIdx];
			},
			startingDistance(): number {
				let startingDistance = this.rules.start;
				if (this.game.ruleModifiers && this.game.ruleModifiers.start) {
					startingDistance = this.game.ruleModifiers.start;
				}
				return startingDistance;
			}
		},
		methods: {
			playerRounds(player: Player): Round[] | undefined {
				if (!this.game.rounds || !this.game.rounds.length) return undefined;
				return this.game.rounds.filter(round => round.playerId === player.id);
			},
			playerDistance(player: Player): number {
				const playerRounds = this.playerRounds(player);
				return playerRounds ? playerRounds[playerRounds.length - 1].distance : this.startingDistance;
			},
			nextDistance(player: Player): number {
				const playerRounds = this.playerRounds(player);
				if (!playerRounds) {
					return this.startingDistance;
				}
				const lastRound = playerRounds[playerRounds.length - 1];
				return this.rules.nextRound(lastRound.distance, lastRound.hits, this.game);
			},
			playerHits(player: Player): number {
				const playerRounds = this.playerRounds(player);
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

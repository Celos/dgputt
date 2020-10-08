<template>
	<div>
		<div v-if="multiplayer" class="headline text-break">
			{{$store.getters.playerName(player)}}
		</div>
		<div class="display-1">{{distance}}m</div>
		<div class="player-score display-4 my-10">{{player.score}}</div>
		<div class="round display-1">{{round}}</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Player from "@/model/types/Player";
	import Game from "@/model/types/Game";
	import Rule from "@/model/types/Rule";
	import Rules from "@/model/rules/Rules";
	import Round from "@/model/types/Round";

	export default Vue.extend({
		props: {
			multiplayer: {
				type: Boolean,
				required: true
			},
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
			playerRounds(): Round[] {
				return this.game.rounds.filter(round => round.playerId === this.player.id);
			},
			previousRound(): Round | undefined {
				return this.playerRounds.length ? this.playerRounds[this.playerRounds.length - 1] : undefined;
			},
			startingDistance(): number {
				let startingDistance = this.rules.start;
				if (this.game.ruleModifiers && this.game.ruleModifiers.start) {
					startingDistance = this.game.ruleModifiers.start;
				}
				return startingDistance;
			},
			distance(): number {
				return this.previousRound ? this.rules.nextRound(this.previousRound.distance, this.previousRound.hits, this.game) : this.startingDistance;
			},
			totalRounds(): number | undefined {
				let totalRounds = this.rules.rounds;
				if (this.game.ruleModifiers && this.game.ruleModifiers.rounds) {
					totalRounds = this.game.ruleModifiers.rounds;
				}
				return totalRounds;
			},
			round(): string {
				return this.totalRounds ? (this.playerRounds.length + 1) + "/" + this.totalRounds : "";
			}
		}
	});
</script>

<style scoped>
	.player-score.player-score {
		font-size: 10rem !important;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
</style>
<template>
	<v-card class="mb-1 text-center scoreboard">
		<div class="distance display-1">
			<span v-if="game.players.length > 1">{{playerName}}</span>
			{{distance}}m
		</div>
		<div class="score display-4 my-10">{{currentPlayer.score}}</div>
		<div class="round display-1">{{round}}</div>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/types/Game";
	import Rule from "@/types/Rule";
	import Rules from "@/components/rules/Rules";
	import Player from "@/types/Player";

	export default Vue.extend({
		props: {
			game: {
				type: Object as () => Game,
				required: true
			},
			distance: {
				type: Number,
				required: true
			},
			currentPlayer: {
				type: Object as () => Player,
				required: true
			}
		},
		computed: {
			round(): string {
				let rule: Rule = Rules.byId(this.game.ruleId);
				return rule.rounds ?
					this.game.rounds
						.filter(round => round.playerId === this.currentPlayer.id).length + "/" + rule.rounds
					: "";
			}
		},
		methods: {
			playerName(): string {
				if (this.currentPlayer.primary) {
					return this.$store.getters.user.name
				} else if(this.currentPlayer.name) {
					return this.currentPlayer.name;
				} else {
					return "N/A";
				}
			}
		}
	});
</script>

<style scoped>
	.scoreboard {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.score.score {
		font-size: 10rem !important;
	}
</style>

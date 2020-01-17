<template>
	<v-card class="mb-1 text-center scoreboard">
		<div class="distance display-1">{{distance}}m</div>
		<div class="score display-4 my-10">{{game.score}}</div>
		<div class="round display-1">{{round}}</div>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/types/Game";
	import Rule from "@/types/Rule";
	import Rules from "@/components/rules/Rules";

	export default Vue.extend({
		props: {
			game: {
				type: Object as () => Game,
				required: true
			},
			distance: {
				type: Number,
				required: true
			}
		},
		computed: {
			round(): string {
				let rule: Rule = Rules.byId(this.game.ruleId);
				return rule.rounds ? this.game.rounds.length + "/" + rule.rounds : "";
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

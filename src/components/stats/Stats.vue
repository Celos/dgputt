<template>
	<div>
		<div v-for="(games, ruleId) in rules" :key="ruleId">
			<v-card v-if="games.length">
				<GameChart :rules="rule(ruleId)" :games="games"/>
			</v-card>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/model/types/Game";
	import GameChart from "@/components/stats/GameChart.vue";
	import Rule from "@/model/types/Rule";
	import Rules from "@/model/rules/Rules";

	export default Vue.extend({
		computed: {
			rules(): {[key: string]: Game[]} {
				return this.$store.getters.byRule;
			}
		},
		methods: {
			rule(ruleId: string): Rule {
				return Rules.byId(ruleId);
			}
		},
		components: {
			GameChart
		}
	});
</script>
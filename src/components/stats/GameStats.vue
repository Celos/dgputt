<template>
	<div>
		<table class="py-4">
			<tr>
				<td class="pr-3">{{$t("totalRounds")}}</td>
				<td>{{games.length}}</td>
			</tr>
			<tr>
				<td class="pr-3">{{$t("averageScore")}}</td>
				<td>{{average}}</td>
			</tr>
			<tr>
				<td class="pr-3">{{$t("bestScore")}}</td>
				<td>{{best}}</td>
			</tr>
		</table>
		<DistanceResults :rules="rules" :rounds="rounds"/>
	</div>
</template>

<script lang="ts">
	import Vue, {PropType} from "vue";
	import DistanceResults from "@/components/results/DistanceResults.vue";
	import Game from "@/model/types/Game";
	import Rule from "@/model/types/Rule";
	import Round from "@/model/types/Round";

	export default Vue.extend({
		props: {
			rules: {
				type: Object as PropType<Rule>,
				required: true
			},
			games: {
				type: Array as PropType<Game[]>,
				required: true
			}
		},
		data: () => ({}),
		computed: {
			average: function (): number {
				const sum = this.games.reduce((acc, current) => acc + current.players[0].score, 0);
				return Math.round(sum / this.games.length);
			},
			best: function (): number {
				return this.games.reduce((acc, current) => current.players[0].score > acc ? current.players[0].score : acc, 0);

			},
			rounds: function (): Round[] {
				return this.$store.getters.allPrimaryPlayerRounds(this.rules);
			}
		},
		components: {
			DistanceResults
		}
	});
</script>
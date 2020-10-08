<script>
	import Vue from "vue";
	import { Line } from "vue-chartjs";

	export default Vue.extend({
		extends: Line,
		props: {
			rules: {
				type: Object,
				required: true
			},
			games: {
				type: Array,
				required: true
			}
		},
		mounted() {
			let data = this.games.map(game => game.players[0].score);
			this.renderChart({
				labels: new Array(this.games.length).fill("asd"),
				datasets: {
					label: this.rules.name,
					data: data,
					borderColor: this.rules.color,
					fill: false
				}
			}, {
				spanGaps: true
			})
		}
	});
</script>
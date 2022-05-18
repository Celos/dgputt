<template>
	<Line :chart-data="chartData" :chart-options="chartOptions"/>
</template>

<script>
import {Line} from "vue-chartjs/legacy";
import {Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default {
	name: "LineChart",
	components: {Line},
	props: {
		chartData: {
			type: Object,
			required: true
		},
	},
	data: () => ({
		chartOptions: {
			bezierCurve: false,
			scales: {
				xAxes: [{
					type: "time"
				}]
			}
		}
	})
}
</script>


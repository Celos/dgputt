<template>
	<LineChartGenerator :chart-data="chartData" :chart-options="opts"/>
</template>

<script>
import "chartjs-adapter-date-fns";
import {Line as LineChartGenerator} from "vue-chartjs/legacy";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale} from "chart.js"

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement,
	TimeScale
)

export default {
	name: "LineChart",
	components: {LineChartGenerator},
	props: {
		chartData: {
			type: Object,
			required: true
		},
	},
	data: () => ({
		opts: {
			bezierCurve: false,
			scales: {
				x: {
					type: "time"
				}
			}
		}
	})
}
</script>


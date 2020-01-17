<template>
	<div :class="'bar ' + barType">
		<div class="bar__filled" :style="width"></div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	
	export default Vue.extend({
		name: "Bar",
		props: {
			at: Number,
		},
		computed: {
			barType(): string {
				let barColor = this.at < 25 ? "red"
					: this.at < 50 ? "orange"
						: this.at < 75 ? "yellow" : "green";
				return "bar--" + barColor;
			},
			width(): string {
				return `width: ${this.at}%;`;
			}
		}
	});
</script>

<style>
	.bar {
		width: 100%;
		height: 100%;
		border-radius: 0.2rem;
		border-width: 1px;
		border-style: solid;
	}
	.bar__filled {
		height: 100%;
		border-radius: 0.2rem;
	}
	.bar--red {
		border-color: red;
	}
	.bar--orange {
		border-color: orange;
	}
	.bar--yellow {
		border-color: yellow;
	}
	.bar--green {
		border-color: green;
	}
	.bar--red .bar__filled {
		background-color: red;
	}
	.bar--orange .bar__filled {
		background-color: orange;
	}
	.bar--yellow .bar__filled {
		background-color: yellow;
	}
	.bar--green .bar__filled {
		background-color: green;
	}
</style>


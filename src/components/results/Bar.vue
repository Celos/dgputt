<template>
	<div :class="['bar', barType]">
		<div class="bar__filled" :style="width"></div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	
	export default Vue.extend({
		name: "Bar",
		props: {
			at: Number,
			total: Number
		},
		computed: {
			barType(): string {
				const barColor = this.at === 0 && this.total === 0 ? "grey"
					: this.at < 25 ? "red"
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
	.bar--grey {
		border-color: grey;
	}
	.bar--red {
		border-color: #C62828;
	}
	.bar--orange {
		border-color: #FB8C00;
	}
	.bar--yellow {
		border-color: #FDD835;
	}
	.bar--green {
		border-color: #43A047;
	}
	.bar--red .bar__filled {
		background-color: #C62828;
	}
	.bar--orange .bar__filled {
		background-color: #FB8C00;
	}
	.bar--yellow .bar__filled {
		background-color: #FDD835;
	}
	.bar--green .bar__filled {
		background-color: #43A047;
	}
</style>


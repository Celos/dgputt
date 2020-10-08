<template>
	<Results :game="activeGame"/>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/model/types/Game";
	import Results from "@/components/results/Results.vue";

	export default Vue.extend({
		props: {
			id: {
				type: String,
				required: true
			}
		},
		computed: {
			activeGame(): Game {
				return this.$store.getters.byId(this.id);
			}
		},
		components: {
			Results
		}
	});
</script>

<style>

</style>

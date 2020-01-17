<template>
	<Results :game="activeGame"/>
</template>

<script lang="ts">
	import Vue from "vue";
	import Game from "@/types/Game";
	import Results from "@/components/Results.vue";

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

<template>
	<GameComponent :game="activeGame"/>
</template>

<script lang="ts">
	import Vue from "vue";
	import GameComponent from "@/components/games/Game.vue";
	import Game from "@/model/types/Game";

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
			GameComponent
		}
	});
</script>

<style>

</style>

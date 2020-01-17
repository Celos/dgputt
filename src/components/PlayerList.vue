<template>
	<v-list>
		<v-subheader>{{$t("players")}}</v-subheader>
		<v-list-item>
			<v-list-item-content>{{this.$store.getters.user.name}}</v-list-item-content>
		</v-list-item>
		<v-list-item v-for="player in players" :key="player.id">
			{{player.name}}
			<v-spacer/>
			<v-btn x-small fab color="error" @click="$emit('delete', player.id)">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
	import Vue from "vue";
	import Player from "../types/Player";

	export default Vue.extend({
		props: {
			players: {
				type: Array as () => Player[],
				required: true
			}
		}
	});
</script>
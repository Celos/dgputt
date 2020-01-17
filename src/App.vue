<template>
	<v-app>
		<v-navigation-drawer absolute temporary right v-model="drawerOpen" app>
			<Settings/>
		</v-navigation-drawer>
		<v-app-bar app>
			<v-tabs grow>
				<v-tab :to="{name: 'games'}">{{ $t("games") }}</v-tab>
				<v-tab :to="{name: 'stats'}">{{ $t("stats") }}</v-tab>
				<v-tab :to="{name: 'history'}">{{ $t("history") }}</v-tab>
			</v-tabs>
			<v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen"/>
		</v-app-bar>
		<v-content class="ma-2">
			<router-view/>
		</v-content>
	</v-app>
</template>

<script lang="ts">
	import Settings from "./components/Settings.vue";
	
	export default {
		name: "App",
		data: () => ({
			drawerOpen: false
		}),
		components: {
			Settings
		}
	};
</script>

<style>
	html, body {
		width: 100%;
		overflow-x: hidden;
	}
</style>

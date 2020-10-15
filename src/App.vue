<template>
	<v-app>
		<v-navigation-drawer fixed temporary right v-model="drawerOpen" app>
			<Settings/>
		</v-navigation-drawer>
		<v-app-bar app :color="appbarColor" dark>
			<v-tabs grow dark color="white">
				<v-tab :to="{name: 'games'}">{{ $t("games") }}</v-tab>
				<v-tab :to="{name: 'stats'}">{{ $t("stats") }}</v-tab>
				<v-tab :to="{name: 'history'}">{{ $t("history") }}</v-tab>
			</v-tabs>
			<v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen"/>
		</v-app-bar>
		<v-main class="ma-2">
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue";
	import Settings from "./components/settings/Settings.vue";

	export default Vue.extend({
		name: "App",
		data: () => ({
			drawerOpen: false
		}),
		components: {
			Settings
		},
		computed: {
			appbarColor: function (): string {
				return this.$vuetify.theme.dark ? "blue-grey darken-2" : "indigo";
			}
		}
	});
</script>

<style>
	html, body {
		width: 100%;
		overflow-x: hidden;
		height: 100%;
		overflow-y: auto;
	}
	body {
		position: relative;
	}
</style>

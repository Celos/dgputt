<template>
	<div>
		<v-list-item>
			<v-row class="mx-1">
				<v-icon :color="!isDark ? 'primary' : ''">mdi-white-balance-sunny</v-icon>
				<v-switch v-model="dark"/>
				<v-icon :color="isDark ? 'primary' : ''">mdi-moon-waxing-crescent</v-icon>
			</v-row>
		</v-list-item>
		<v-list-item>
			<v-select v-model="locale" :label="$t('language')" :items="langs"/>
		</v-list-item>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import {SET_LOCALE, SET_THEME} from "@/store/action-types";
	
	export default Vue.extend({
		name: "Settings",
		data () {
			return {
				langs: [{text: "English", value: "en"}, {text: "Eesti", value: "et"}]
			}
		},
		computed: {
			dark: {
				get(): boolean {
					return this.isDark;
				},
				set(dark: boolean) {
					this.$store.dispatch(SET_THEME, {
						dark: dark
					});
				}
			},
			locale: {
				get(): string {
					return this.currentLocale;
				},
				set(locale: string) {
					this.$store.dispatch(SET_LOCALE, {
						locale: locale
					});
				}
			},
			currentLocale(): string {
				return this.$store.getters.locale;
			},
			isDark(): boolean {
				return this.$store.getters.isDark;
			}
		},
		created(): void {
			this.$vuetify.theme.dark = this.isDark;
			this.$i18n.locale = this.currentLocale;
		},
		watch: {
			isDark(dark): void {
				this.$vuetify.theme.dark = dark;
			},
			currentLocale(locale): void {
				this.$i18n.locale = locale;
			}
		},
	});
</script>

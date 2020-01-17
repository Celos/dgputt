<template>
	<div>
		<v-list>
			<v-list-item v-if="this.user.name">
				{{this.user.name}}
				<v-btn text icon @click="changeUsernameDialog = true">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</v-list-item>
			<v-list-item>
				<v-icon :color="!isDark ? 'primary' : ''">mdi-white-balance-sunny</v-icon>
				<v-switch v-model="dark"/>
				<v-icon :color="isDark ? 'primary' : ''">mdi-moon-waxing-crescent</v-icon>
			</v-list-item>
			<v-list-item>
				<v-select v-model="locale" :label="$t('language')" :items="langs"/>
			</v-list-item>
		</v-list>

		<v-dialog v-model="changeUsernameDialog">
			<UsernameForm @newUsername="setUsername"/>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import {SET_LOCALE, SET_THEME, SET_USERNAME} from "@/store/action-types";
	import User from "@/types/User";
	import UsernameForm from "@/components/UsernameForm.vue";
	
	export default Vue.extend({
		name: "Settings",
		data () {
			return {
				langs: [{text: "English", value: "en"}, {text: "Eesti", value: "et"}],
				changeUsernameDialog: false,
				newUsername: ""
			}
		},
		computed: {
			user(): User {
				return this.$store.getters.user;
			},
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
		methods: {
			setUsername(newUsername: string): void {
				this.$store.dispatch(SET_USERNAME, newUsername);
				this.changeUsernameDialog = false;
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
		components: {
			UsernameForm
		}
	});
</script>

<template>
	<v-card class="pa-2">
		<v-form ref="usernameForm" @submit.stop.prevent="setUsername">
			<v-text-field
				v-model="username"
				:rules="[usernameValidationRule]"
				class="mt-2"
				solo
				:label="$t('askUsername')"/>
			<v-card-actions >
				<v-spacer/>
				<v-btn color="primary" @click="setUsername">{{$t("continue")}}</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		data() {
			return {
				username: "",
				usernameValidationRule: (v: string) => !!v || this.$t("usernameRequired")
			}
		},
		methods: {
			setUsername(): void {
				let form: any = this.$refs.usernameForm;
				if (form.validate()) {
					this.$emit("newUsername", this.username);
					this.username = "";
				}
			}
		}
	});
</script>
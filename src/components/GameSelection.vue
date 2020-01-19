<template>
	<div>
		<v-card>
			<v-card-text class="game-selection__container">
				<template v-for="rule in rules">
					<v-btn color="primary" :key="rule.id + '-btn'" class="game-selection__btn"
							@click="startGame(rule.id)">
						{{$t(rule.id)}}
					</v-btn>
					<div :key="rule.id + '-desc'" class="game-selection__description">
						{{$t(rule.id + ".description")}}
					</div>
				</template>
			</v-card-text>
			<v-btn dark absolute fab bottom right color="pink" @click="addPlayersClick">
				<v-icon>mdi-account-multiple-plus</v-icon>
			</v-btn>
		</v-card>

		<v-card v-if="players.length > 0" class="mt-1">
			<PlayerList :players="players" @delete="deletePlayer"/>
		</v-card>

		<v-dialog v-model="usernameDialog">
			<UsernameForm @newUsername="setUsername"/>
		</v-dialog>
		<v-dialog v-model="addPlayersDialog">
			<v-card class="pa-2">
				<PlayerList :players="players" @delete="deletePlayer"/>
				<v-form ref="addPlayersForm" @submit.stop.prevent="addPlayers">
					<v-list-item>
					<v-text-field
						v-model="playerName"
						:rules="[playerNameValidationRule]"
						class="mt-2"
						solo
						:label="$t('askPlayerName')"
						append-outer-icon="mdi-account-multiple-plus"
						@click:append-outer="addPlayers"/>
					</v-list-item>
					<v-card-actions >
						<v-spacer/>
						<v-btn color="primary" @click="doneAddingPlayers">{{$t("done")}}</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Rules from './rules/Rules';
	import {ADD_GAME, SET_USERNAME} from "@/store/action-types";
	import GameFactory from "@/components/GameFactory";
	import Rule from "@/types/Rule";
	import Player from '@/types/Player';
	import User from "@/types/User";
	import PlayerList from "./PlayerList.vue";
	import UsernameForm from "./UsernameForm.vue";
	import {routeNames} from "@/plugins/routeNames";
	import DefaultPlayer from "@/models/DefaultPlayer";

	export default Vue.extend({
		data() {
			return {
				usernameDialog: false,
				addPlayersDialog: false,
				players: [] as Player[],
				lastPlayerId: 2,
				playerName: "",
				playerNameValidationRule: (v: string) => !!v || this.$t("playerNameRequired"),
			}
		},
		computed: {
			user(): User {
				return this.$store.getters.user;
			},
			rules(): Rule[] {
				return Rules.all();
			}
		},
		methods: {
			startGame(ruleId: string): void {
				let rule = Rules.byId(ruleId);
				if (rule) {
					let game = GameFactory.create(rule);
					if (this.players.length > 0) {
						this.players.forEach(player => game.players.push(player));
					}
					this.$store.dispatch(ADD_GAME, game)
						.then(() => this.$router.push({name: routeNames.game, params: {"id": game.id}}));
				}
			},
			addPlayersClick(): void {
				if (this.user.name) {
					this.addPlayersDialog = true;
				} else {
					this.usernameDialog = true;
				}
			},
			setUsername(newUsername: string): void {
				this.$store.dispatch(SET_USERNAME, newUsername);
				this.usernameDialog = false;
				this.addPlayersDialog = true;
			},
			addPlayers(): void {
				let form: any = this.$refs.addPlayersForm;
				if (form.validate()) {
					this.players.push(new DefaultPlayer(this.lastPlayerId, false, this.playerName));
					this.lastPlayerId = this.lastPlayerId + 1;
					this.playerName = "";
					form.resetValidation();
				}
			},
			doneAddingPlayers(): void {
				this.addPlayersDialog = false;
			},
			deletePlayer(playerId: number): void {
				this.players = this.players.filter(player => player.id !== playerId);
			}
		},
		components: {
			PlayerList, UsernameForm
		}
	});
</script>

<style scoped>
	.game-selection__container {
		display: grid;
		grid-template-columns: max-content 1fr;
		grid-gap: 0.6rem;
	}
	
	.game-selection__container .game-selection__btn {
		min-width: 5rem;
		min-height: 5rem;
	}
	
	.game-selection__description {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>

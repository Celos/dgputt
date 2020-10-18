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
					<div :key="`${rule.id}-actions`"></div>
				</template>
				<template v-if="$store.getters.customRulesets.length">
					<v-divider class="game-selection__section-divider"/>
					<template v-for="customRuleset in $store.getters.customRulesets">
						<v-btn color="primary" :key="`${customRuleset.id}-btn`" class="game-selection__btn"
								@click="startCustomGame(customRuleset.id)">
							{{$t("customRuleset", {base: $t(customRuleset.ruleId)})}}
						</v-btn>
						<div :key="`${customRuleset.id}-desc`" class="game-selection__description">
							{{$t(customRuleset.ruleId + ".description")}}
						</div>
						<div :key="`${customRuleset.id}-actions`" class="game-selection__custom-actions">
							<v-btn color="error" @click.stop.prevent="deleteCustomRuleset(customRuleset.id)">{{$t("delete")}}</v-btn>
						</div>
					</template>
				</template>
				<v-divider class="game-selection__section-divider"/>
				<v-btn color="primary" class="game-selection__btn" @click="customGameDialog = true">
					{{$t("customGame")}}
				</v-btn>
				<div class="game-selection__description">
					{{$t("customGame.description")}}
				</div>
				<div></div>
			</v-card-text>
			<v-btn class="btn--fab-like" dark absolute bottom right color="pink" @click="addPlayersClick">
				{{$t("addPlayers")}}<v-icon class="ml-2">mdi-account-multiple-plus</v-icon>
			</v-btn>
		</v-card>

		<v-card v-if="players.length > 0" class="mt-1">
			<PlayerList :players="players" @delete="deletePlayer"/>
		</v-card>

		<v-dialog v-model="usernameDialog">
			<UsernameForm @new-username="setUsername"/>
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

		<v-dialog v-model="customGameDialog">
			<v-card class="pa-2 pt-3">
				<v-list-item>
					<v-select
						:items="rules"
						v-model="customRulesetBase"
						item-value="id"
						outlined
						:label="$t('baseRules')">
						<template v-slot:selection="data">{{ $t(data.item.id) }}</template>
						<template v-slot:item="data">{{ $t(data.item.id) }}</template>
					</v-select>
				</v-list-item>
				<template v-if="customRulesetBase">
					<v-list-item v-for="override in rule(customRulesetBase).validOverrides" :key="override">
						<v-text-field
							type="number"
							v-model.number="customRuleset.modifiers[override]"
							:label="$t(`custom.${override}`)"/>
					</v-list-item>
				</template>
				<v-card-actions >
					<v-spacer/>
					<v-btn color="secondary" @click="customGameDialog = false">{{$t("close")}}</v-btn>
					<v-btn v-if="customRulesetBase" color="primary" @click="startCustomGame()">{{$t("startGame")}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Rules from '../../model/rules/Rules';
	import {ADD_CUSTOM_RULESET, ADD_GAME, REMOVE_CUSTOM_RULESET, SET_USERNAME} from "@/store/action-types";
	import GameFactory from "@/components/games/GameFactory";
	import Rule from "@/model/types/Rule";
	import Player from '@/model/types/Player';
	import User from "@/model/types/User";
	import PlayerList from "./PlayerList.vue";
	import UsernameForm from "../settings/UsernameForm.vue";
	import {routeNames} from "@/plugins/routeNames";
	import DefaultPlayer, {PRIMARY_PLAYER_ID} from "@/model/DefaultPlayer";
	import CustomRuleset from "@/model/types/CustomRuleset";
	import DefaultCustomRuleset from "@/model/DefaultCustomRuleset";
	import { v4 as uuid } from "uuid";
	import Game from "@/model/types/Game";
	import RuleModifiers from "@/model/types/RuleModifiers";

	export default Vue.extend({
		data() {
			return {
				usernameDialog: false,
				addPlayersDialog: false,
				customGameDialog: false,
				players: [] as Player[],
				lastPlayerId: PRIMARY_PLAYER_ID + 1,
				playerName: "",
				playerNameValidationRule: (v: string) => !!v || this.$t("playerNameRequired"),
				customRulesetBase: undefined as unknown as string | undefined,
				customRuleset: undefined as unknown as CustomRuleset | undefined
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
			startGame(ruleId: string, newGame?: Game): void {
				let rule = Rules.byId(ruleId);
				if (rule) {
					let game = newGame ? newGame : GameFactory.create(rule);
					if (this.players.length > 0) {
						this.players.forEach(player => game.players.push(player));
					}
					this.$store.dispatch(ADD_GAME, game)
						.then(() => this.$router.push({name: routeNames.game, params: {"id": game.id}}));
				}
			},
			startCustomGame(customRulesetId?: string): void {
				let customRuleset;
				if (customRulesetId) {
					customRuleset = this.$store.getters.customRuleset(customRulesetId);
				} else {
					customRuleset = this.customRuleset;
				}
				let rule = Rules.byId(customRuleset.ruleId);
				if (this.isSameAsBase(rule, customRuleset.modifiers)) {
					this.startGame(customRuleset.ruleId);
				} else {
					if (rule) {
						let game = GameFactory.create(rule);
						customRuleset.modifiers = this.differingModifiers(rule, customRuleset.modifiers);
						game.ruleModifiers = customRuleset.modifiers;
						this.$store.dispatch(ADD_CUSTOM_RULESET, customRuleset);
						this.startGame(customRuleset.ruleId, game);
					}
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
				const form: any = this.$refs.addPlayersForm;
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
			},
			rule(id: string) {
				return Rules.byId(id);
			},
			differingModifiers(rule: Rule, modifiers: RuleModifiers): RuleModifiers {
				const differingModifiers: RuleModifiers = {};
				if (modifiers.rounds && modifiers.rounds !== rule.rounds) {
					differingModifiers.rounds = modifiers.rounds;
				}
				if (modifiers.discs && modifiers.discs !== rule.discs) {
					differingModifiers.discs = modifiers.discs;
				}
				if (modifiers.start && modifiers.start !== rule.start) {
					differingModifiers.start = modifiers.start;
				}
				return differingModifiers;
			},
			isSameAsBase(rule: Rule, modifiers: RuleModifiers): boolean {
				return (!modifiers.rounds || modifiers.rounds === rule.rounds)
					&& (!modifiers.discs || modifiers.rounds === rule.discs)
					&& (!modifiers.start || modifiers.rounds === rule.start);
			},
			deleteCustomRuleset(customRulesetId: string) {
				this.$store.dispatch(REMOVE_CUSTOM_RULESET, customRulesetId);
			}
		},
		watch: {
			customRulesetBase() {
				if (this.customRulesetBase) {
					this.customRuleset = new DefaultCustomRuleset(uuid(), this.customRulesetBase);
				} else {
					this.customRuleset = undefined;
				}
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
		grid-template-columns: max-content 1fr max-content;
		grid-gap: 0.6rem;
	}
	.game-selection__container .game-selection__btn {
		min-width: 5rem;
		min-height: 5rem;
		word-break: break-word;
	}
	.game-selection__description {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.game-selection__section-divider {
		grid-column: 1/4;
	}
	.game-selection__custom-actions {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.btn--fab-like {
		bottom: -22px;
	}
</style>

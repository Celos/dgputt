<template>
	<v-card>
		<v-list v-if="games.length">
			<template v-for="(game, idx) in games">
				<v-list-item class="py-1" :key="game.id + '-item'" :to="{name: 'results', params: {id: game.id}}">
					<div class="game-result pr-2">
						<v-chip class="ma-2" :color="rule(game.ruleId).color" text-color="white">{{chip(game)}}</v-chip>
						<span class="font-weight-medium title middle">{{game.players[0].score}}</span><wbr/>
						<span class="grey--text middle caption game-result__completed ml-3" >{{dateString(game.completed)}}</span>
					</div>
					<div class="game-result__actions">
						<v-btn color="error" @click.stop.prevent="deleteGame(game.id)" icon :title="$t('delete')"><v-icon>mdi-delete</v-icon></v-btn>
					</div>
				</v-list-item>
				<v-divider v-if="notLast(idx)" :key="game.id + '-div'"/>
			</template>
		</v-list>
		<v-card-text v-else>{{$t("no-games")}}</v-card-text>
		<v-snackbar v-model="snackbar">
			{{ $t("gameDeleted") }}
			<template v-slot:action="{}">
				<v-btn color="primary" @click="undo">{{$t("undo")}}</v-btn>
			</template>
		</v-snackbar>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import Rules from "@/model/rules/Rules";
	import Rule from "@/model/types/Rule";
	import {DELETE_GAME, UNDO} from "@/store/action-types";
	import Game from "@/model/types/Game";

	export default Vue.extend({
		data() {
			return {
				snackbar: false
			}
		},
		computed: {
			games(): Game[] {
				return this.$store.getters.completed;
			}
		},
		methods: {
			rule(ruleId: string): Rule {
				return Rules.byId(ruleId);
			},
			notLast(idx: number): boolean {
				return idx < this.games.length - 1;
			},
			deleteGame(gameId: string): void {
				this.$store.dispatch(DELETE_GAME, gameId).then(() => this.snackbar = true);
			},
			dateString(timestamp: number): string {
				return new Date(timestamp).toLocaleDateString(undefined, {
					year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", "minute": "2-digit"
				});
			},
			undo(): void {
				this.$store.dispatch(UNDO).then(() => this.snackbar = false);
			},
			chip(game: Game) {
				let chipText = this.$t(game.ruleId);
				if (game.ruleModifiers && (game.ruleModifiers.discs || game.ruleModifiers.rounds || game.ruleModifiers.start)) {
					chipText += "*";
				}
				return chipText;
			}
		}
	});
</script>

<style scoped>
	.middle {
		vertical-align: middle;
	}
	.game-result {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		cursor: pointer;
	}
	.game-result__actions {
		flex-shrink: 0;
		flex-grow: 0;
	}
	.game-result__completed {
		white-space: nowrap;
	}
</style>

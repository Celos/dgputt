import State from "@/model/types/State";
import Game from "@/model/types/Game";
import Round from "@/model/types/Round";
import {MutationTree} from "vuex";
import Player from "@/model/types/Player";
import CustomRuleset from "@/model/types/CustomRuleset";

export const mutationTypes = {
	ADD_GAME: "ADD_GAME",
	SCORE: "SCORE",
	DELETE_GAME: "DELETE_GAME",
	ADD_ROUND: "ADD_ROUND",
	DELETE_ROUND: "DELETE_ROUND",
	SET_THEME: "SET_THEME",
	SET_LOCALE: "SET_LOCALE",
	ACTIVATE_GAME: "ACTIVATE_GAME",
	DEACTIVATE_GAME: "DEACTIVATE_GAME",
	COMPLETE_GAME: "COMPLETE_GAME",
	UNCOMPLETE_GAME: "UNCOMPLETE_GAME",
	SET_UNDO: "SET_UNDO",
	SET_USERNAME: "SET_USERNAME",
	ADD_CUSTOM_RULESET: "ADD_CUSTOM_RULESET",
	REMOVE_CUSTOM_RULESET: "REMOVE_CUSTOM_RULESET"
};

export const mutations: MutationTree<State> = {
	[mutationTypes.ADD_GAME](state: State, game: Game) {
		state.games.push(game);
	},
	[mutationTypes.ACTIVATE_GAME](state: State, game: Game) {
		state.activeGameId = game.id;
	},
	[mutationTypes.DEACTIVATE_GAME](state: State) {
		state.activeGameId = undefined;
	},
	[mutationTypes.ADD_ROUND](state: State, payload: {game: Game, round: Round}) {
		payload.game.rounds.push(payload.round);
	},
	[mutationTypes.DELETE_ROUND](state: State, payload: {game: Game, roundIdx: number}) {
		payload.game.rounds.splice(payload.roundIdx, 1);
	},
	[mutationTypes.SCORE](state: State, payload: {player: Player, updateScore: number}) {
		payload.player.score += payload.updateScore;
	},
	[mutationTypes.COMPLETE_GAME](state: State, game: Game) {
		game.completed = Date.now();
		state.activeGameId = undefined;
	},
	[mutationTypes.UNCOMPLETE_GAME](state: State, game: Game) {
		game.completed = undefined;
		state.activeGameId = game.id;
	},
	[mutationTypes.SET_UNDO](state: State, game: Game) {
		state.undo = game;
	},
	[mutationTypes.DELETE_GAME](state: State, gameId: string) {
		state.games = state.games.filter(game => game.id !== gameId);
	},
	[mutationTypes.SET_THEME](state: State, payload) {
		state.user.settings.theme = payload.dark ? "dark" : "light";
	},
	[mutationTypes.SET_LOCALE](state: State, payload: {locale: "en" | "et"}): void {
		state.user.settings.locale = payload.locale;
	},
	[mutationTypes.SET_USERNAME](state: State, newUsername) {
		state.user.name = newUsername;
	},
	[mutationTypes.ADD_CUSTOM_RULESET](state: State, customRuleset: CustomRuleset) {
		if (!state.customRulesets) {
			state.customRulesets = [];
		}
		state.customRulesets.push(customRuleset);
	},
	[mutationTypes.REMOVE_CUSTOM_RULESET](state: State, customRulesetId: string) {
		if (state.customRulesets && state.customRulesets.length > 0) {
			state.customRulesets = state.customRulesets.filter(customRuleset => customRuleset.id !== customRulesetId);
		}
	}
};

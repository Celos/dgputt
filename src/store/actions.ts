import {ActionContext, ActionTree} from 'vuex';
import State from "@/model/types/State";
import {
	ADD_GAME,
	ADD_ROUND,
	DELETE_GAME,
	DELETE_ROUND,
	SET_LOCALE,
	SET_THEME,
	SET_USERNAME,
	UNDO,
	ADD_CUSTOM_RULESET,
	REMOVE_CUSTOM_RULESET
} from "@/store/action-types";
import Game from "@/model/types/Game";
import {mutationTypes} from "@/store/mutations";
import Round from "@/model/types/Round";
import Rule from "@/model/types/Rule";
import Rules from "@/model/rules/Rules";
import CustomRuleset from "@/model/types/CustomRuleset";

export const actions: ActionTree<State, State> = {
	[ADD_GAME](context: ActionContext<State, State>, game: Game) {
		context.commit(mutationTypes.ADD_GAME, game);
		context.commit(mutationTypes.ACTIVATE_GAME, game);
		return game;
	},
	[ADD_ROUND](context: ActionContext<State, State>, payload: {game: Game, round: Round}) {
		if (payload.game.completed) return;

		const rules: Rule = Rules.byId(payload.game.ruleId);
		context.commit(mutationTypes.ADD_ROUND, payload);
		context.commit(mutationTypes.SCORE, {
			player: payload.game.players.find(player => player.id === payload.round.playerId),
			updateScore: rules.score(payload.round.distance, payload.round.hits, payload.game)
		});
		if (rules.endCondition(payload.game)) {
			context.commit(mutationTypes.COMPLETE_GAME, payload.game);
		}
	},
	[DELETE_GAME](context: ActionContext<State, State>, gameId: string) {
		const game: Game = context.getters.byId(gameId);
		context.commit(mutationTypes.SET_UNDO, game);
		context.commit(mutationTypes.DELETE_GAME, gameId);
		if (gameId === context.state.activeGameId) {
			context.commit(mutationTypes.DEACTIVATE_GAME);
		}
	},
	[UNDO](context: ActionContext<State, State>) {
		if (context.state.undo) {
			context.commit(mutationTypes.ADD_GAME, context.state.undo);
			if (!context.state.undo.completed) {
				context.commit(mutationTypes.ACTIVATE_GAME, context.state.undo);
			}
		}
	},
	[DELETE_ROUND](context: ActionContext<State, State>, payload: {game: Game, roundIdx: number}) {
		const round = payload.game.rounds[payload.roundIdx];
		const score = Rules.byId(payload.game.ruleId).score(round.distance, round.hits, payload.game);
		context.commit(mutationTypes.SCORE, {
			player: payload.game.players.find(player => player.id === round.playerId),
			updateScore: -score
		});
		context.commit(mutationTypes.DELETE_ROUND, payload);
		if (payload.game.completed) {
			context.commit(mutationTypes.UNCOMPLETE_GAME, payload.game);
		}
	},
	[SET_THEME] (context: ActionContext<State, State>, payload: {dark: boolean}) {
		context.commit(mutationTypes.SET_THEME, payload);
	},
	[SET_LOCALE] (context: ActionContext<State, State>, payload: {locale: "en" | "et"}) {
		context.commit(mutationTypes.SET_LOCALE, payload);
	},
	[SET_USERNAME](context: ActionContext<State, State>, newUsername: string) {
		context.commit(mutationTypes.SET_USERNAME, newUsername);
	},
	[ADD_CUSTOM_RULESET](context: ActionContext<State, State>, customRuleset: CustomRuleset) {
		let existing: CustomRuleset | undefined = undefined;
		if (context.state.customRulesets && context.state.customRulesets.length > 0) {
			existing = context.state.customRulesets.find(existingRuleset => {
				return existingRuleset.ruleId === customRuleset.ruleId
					&& (existingRuleset.modifiers.rounds === customRuleset.modifiers.rounds)
					&& (existingRuleset.modifiers.start === customRuleset.modifiers.start)
					&& (existingRuleset.modifiers.discs === customRuleset.modifiers.discs);
			});
		}
		if (!existing) {
			context.commit(mutationTypes.ADD_CUSTOM_RULESET, customRuleset);
		}
	},
	[REMOVE_CUSTOM_RULESET](context: ActionContext<State, State>, customRulesetId: string) {
		context.commit(mutationTypes.REMOVE_CUSTOM_RULESET, customRulesetId);
	}
};

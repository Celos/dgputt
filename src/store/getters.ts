import State from "@/model/types/State";
import Game from "@/model/types/Game";
import Player from "@/model/types/Player";
import User from "@/model/types/User";
import Rules from "@/model/rules/Rules";
import CustomRuleset from "@/model/types/CustomRuleset";

export default {
	byId: (state: State) => (id: string): Game | undefined => {
		return state.games.find(game => game.id === id);
	},
	active: (state: State, getters: any): Game | undefined => {
		return state.activeGameId ? getters.byId(state.activeGameId) : undefined;
	},
	byRule: (state: State): {[ruleId: string]: Game[]} => {
		const result: {[ruleId: string]: Game[]} = {};
		Rules.all().forEach(rule => {
			Object.defineProperty(result, rule.id, {value: [], writable: true, enumerable: true});
		});
		return state.games.reduce((acc: {[ruleId: string]: Game[]}, game: Game) => {
			acc[game.ruleId].push(game);
			return acc;
		}, result);
	},
	completed: (state: State): Game[] => {
		return [...state.games.filter(game => game.completed !== undefined)].slice().reverse();
	},
	user: (state: State): User => {
		return state.user;
	},
	playerName: (state: State, getters: any) => (player: Player): string => {
		if (player.primary) {
			return getters.user.name
		} else if(player.name) {
			return player.name;
		} else {
			return "N/A";
		}
	},
	isDark: (state: State): boolean => {
		return state.user.settings.theme === "dark";
	},
	locale: (state: State): string => {
		return state.user.settings.locale;
	},
	customRulesets: (state: State): CustomRuleset[] => {
		return state.customRulesets ? state.customRulesets : [];
	},
	customRuleset: (state: State) => (id: string): CustomRuleset | undefined => {
		if (!state.customRulesets || state.customRulesets.length === 0) {
			return undefined;
		}
		return state.customRulesets.find(customRuleset => customRuleset.id === id);
	}
};

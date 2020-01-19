import State from "@/types/State";
import Game from "@/types/Game";
import Player from "@/types/Player";

export default {
	byId: (state: State) => (id: string) => {
		return state.games.find(game => game.id === id);
	},
	active: (state: State, getters: any) => {
		return state.activeGameId ? getters.byId(state.activeGameId) : undefined;
	},
	completed: (state: State) => {
		return [...state.games.filter(game => game.completed !== undefined)].sort((a: Game, b: Game): number => {
			if (!a.completed || !b.completed) return 0;
			if (a.completed < b.completed) return 1;
			if (a.completed === b.completed) return 0;
			return -1;
		});
	},
	user: (state: State) => {
		return state.user;
	},
	playerName: (state: State, getters: any) => (player: Player) => {
		if (player.primary) {
			return getters.user.name
		} else if(player.name) {
			return player.name;
		} else {
			return "N/A";
		}
	},
	isDark: (state: State) => {
		return state.user.settings.theme === "dark";
	},
	locale: (state: State) => {
		return state.user.settings.locale;
	}
};

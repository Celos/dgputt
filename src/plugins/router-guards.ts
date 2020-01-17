import {Route} from "vue-router";
import Game from "@/types/Game";
import store from "@/store/vuex";

export const gamesGuard = (to: Route, from: Route, next: any) => {
	let active: Game | undefined = store.getters.active;
	if (active) {
		next({name: "game", params: {id: active.id}});
	} else {
		next();
	}
}

export const gameGuard = (to: Route, from: Route, next: any) => {
	let gameId = to.params.id;
	let game: Game = store.getters.byId(gameId);
	if (!game) {
		next({name: "games"});
	} else if (game.completed) {
		next({name: "results", params: {"id": gameId}});
	} else {
		next();
	}
};

export const resultGuard = (to: Route, from: Route, next: any) => {
	let gameId = to.params.id;
	let game: Game = store.getters.byId(gameId);
	if (!game) {
		next({name: "games"});
	} else if (!game.completed) {
		next({name: "game", params: {"id": gameId}});
	} else {
		next();
	}
};

import {Route} from "vue-router";
import Game from "@/types/Game";
import store from "@/store/vuex";
import {routeNames} from "@/plugins/routeNames";

export const gamesGuard = (to: Route, from: Route, next: any) => {
	let active: Game | undefined = store.getters.active;
	if (active) {
		next({name: routeNames.game, params: {id: active.id}});
	} else {
		next();
	}
};

export const gameGuard = (to: Route, from: Route, next: any) => {
	let gameId = to.params.id;
	let game: Game = store.getters.byId(gameId);
	if (!game) {
		next({name: routeNames.games});
	} else if (game.completed) {
		next({name: routeNames.results, params: {"id": gameId}});
	} else {
		next();
	}
};

export const resultGuard = (to: Route, from: Route, next: any) => {
	let gameId = to.params.id;
	let game: Game = store.getters.byId(gameId);
	if (!game) {
		next({name: routeNames.games});
	} else if (!game.completed) {
		next({name: routeNames.game, params: {"id": gameId}});
	} else {
		next();
	}
};

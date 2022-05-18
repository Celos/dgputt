import {Route} from "vue-router";
import Game from "@/model/types/Game";
import store from "@/store/vuex";
import {routeNames} from "@/plugins/routeNames";
import {DELETE_GAME} from "@/store/action-types";

export const gamesGuard = (to: Route, from: Route, next: any) => {
	const active: Game | undefined = store.getters.active;
	if (active) {
		next({name: routeNames.game, params: {id: active.id}});
	} else {
		next();
	}
};

export const gameGuard = (to: Route, from: Route, next: any) => {
	const gameId = to.params.id;
	const game: Game = store.getters.byId(gameId);
	if (!game) {
		next({name: routeNames.games});
	} else if (game.completed) {
		next({name: routeNames.results, params: {"id": gameId}});
	} else {
		next();
	}
};

export const resultGuard = (to: Route, from: Route, next: any) => {
	const gameId = to.params.id;
	const game: Game = store.getters.byId(gameId);
	if (!game) {
		next({name: routeNames.games});
	} else if (!game.completed) {
		next({name: routeNames.game, params: {"id": gameId}});
	} else {
		next();
	}
};

export const deleteGameGuard = (to: Route, from: Route, next: any) => {
	const gameId = to.params.id;
	store.dispatch(DELETE_GAME, gameId).then(() => console.log("record deleted!"));
	next({name: routeNames.games});
}

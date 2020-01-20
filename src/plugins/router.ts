import Vue from "vue"
import VueRouter from "vue-router"
import GameSelectionView from "@/views/GameSelectionView.vue";
import GameView from "@/views/GameView.vue";
import {gameGuard, gamesGuard, resultGuard} from './router-guards';
import {routeNames} from "@/plugins/routeNames";

Vue.use(VueRouter);

const routes = [
	{
		path: "/games",
		name: routeNames.games,
		component: GameSelectionView,
		beforeEnter: gamesGuard
	},
	{
		path: "/games/game/:id",
		name: routeNames.game,
		props: true,
		component: GameView,
		beforeEnter: gameGuard
	},
	{
		path: "/stats",
		name: routeNames.stats,
		component: () => import(/* webpackChunkName: "stats" */ "../views/StatsView.vue")
	},
	{
		path: "/history",
		name: routeNames.history,
		component: () => import(/* webpackChunkName: "history" */ "../views/HistoryView.vue")
	},
	{
		path: "/history/result/:id",
		alias: "/games/result/:id",
		name: routeNames.results,
		props: true,
		component: () => import(/* webpackChunkName: "results" */ "../views/ResultsView.vue"),
		beforeEnter: resultGuard
	},
	{
		path: "*",
		redirect: {name: routeNames.games}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router

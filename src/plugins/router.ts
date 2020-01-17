import Vue from "vue"
import VueRouter from "vue-router"
import GameSelectionView from "@/views/GameSelectionView.vue";
import GameView from "@/views/GameView.vue";
import {gameGuard, gamesGuard, resultGuard} from './router-guards';

Vue.use(VueRouter);

const routes = [
	{
		path: "/games",
		name: "games",
		component: GameSelectionView,
		beforeEnter: gamesGuard
	},
	{
		path: "/games/game/:id",
		name: "game",
		props: true,
		component: GameView,
		beforeEnter: gameGuard
	},
	{
		path: "/stats",
		name: "stats",
		component: () => import(/* webpackChunkName: "stats" */ "../views/StatsView.vue")
	},
	{
		path: "/history",
		name: "history",
		component: () => import(/* webpackChunkName: "history" */ "../views/HistoryView.vue")
	},
	{
		path: "/history/result/:id",
		alias: "/games/result/:id",
		name: "results",
		props: true,
		component: () => import(/* webpackChunkName: "results" */ "../views/ResultsView.vue"),
		beforeEnter: resultGuard
	},
	{
		path: "*",
		redirect: {name: "games"}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router

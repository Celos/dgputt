import Vue from "vue";
import Vuex from "vuex";
import State from "@/model/types/State";
import VuexPersistence from "vuex-persist";
import rootState from './rootState';
import getters from './getters';
import {mutations} from "@/store/mutations";
import {actions} from "@/store/actions";

Vue.use(Vuex);

export default new Vuex.Store<State>({
	strict: process.env.NODE_ENV !== "production",
	state: rootState,
	getters: getters,
	mutations: mutations,
	actions: actions,
	plugins: [new VuexPersistence<State>({
		storage: window.localStorage
	}).plugin]
})

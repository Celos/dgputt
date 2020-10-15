import State from "@/model/types/State";
import { v4 as uuid } from "uuid";

const rootState: State = {
	version: 1,
	activeGameId: undefined,
	games: [],
	user: {
		id: uuid(),
		settings: {
			theme: "light",
			locale: "en"
		}
	},
	undo: undefined,
	customRulesets: []
};

export default rootState;

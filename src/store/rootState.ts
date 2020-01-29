import State from "@/types/State";
import {uuid} from "uuidv4";

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

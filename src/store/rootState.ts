import State from "@/types/State";
import {uuid} from "uuidv4";

const rootState: State = {
	version: 1,
	activeGameId: undefined,
	games: [],
	user: {
		id: uuid(),
		name: "Anonymous",
		settings: {
			theme: "light",
			locale: "en"
		}
	},
	undo: undefined
}

export default rootState;

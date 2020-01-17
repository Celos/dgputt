import Rule from "../types/Rule";
import Game from "../types/Game";
import {uuid} from "uuidv4";

export default class GameFactory {
	
	public static create(rules: Rule): Game {
		return {
			id: uuid(),
			ruleId: rules.id,
			players: [{
				primary: true,
				id: 1,
				score: 0
			}],
			rounds: [],
			completed: undefined
		};
	}
	
}

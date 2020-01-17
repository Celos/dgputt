import Rule from "../types/Rule";
import Game from "../types/Game";
import {uuid} from "uuidv4";
import User from "@/types/User";

export default class GameFactory {
	
	public static create(rules: Rule, user: User): Game {
		return {
			id: uuid(),
			ruleId: rules.id,
			score: 0,
			players: [{
				primary: true,
				id: 1,
				userId: user.id,
				name: user.name
			}],
			rounds: [],
			completed: undefined
		};
	}
	
}

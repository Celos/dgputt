import Rule from "../types/Rule";
import Game from "../types/Game";
import {uuid} from "uuidv4";
import DefaultPlayer from "@/models/DefaultPlayer";

export default class GameFactory {
	
	public static create(rules: Rule): Game {
		return {
			id: uuid(),
			ruleId: rules.id,
			players: [new DefaultPlayer(1, true)],
			rounds: [],
			completed: undefined
		};
	}
	
}

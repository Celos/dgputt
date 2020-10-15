import Rule from "../../model/types/Rule";
import Game from "../../model/types/Game";
import { v4 as uuid } from "uuid";
import {PRIMARY_PLAYER} from "@/model/DefaultPlayer";

export default class GameFactory {
	
	public static create(rules: Rule): Game {
		return {
			id: uuid(),
			ruleId: rules.id,
			players: [PRIMARY_PLAYER],
			rounds: [],
			completed: undefined
		};
	}
	
}

import User from "@/model/types/User";
import Game from "@/model/types/Game";
import CustomRuleset from "@/model/types/CustomRuleset";

export default interface State {
	
	version: number;
	activeGameId: string | undefined;
	games: Game[];
	user: User;
	undo?: Game;
	customRulesets?: CustomRuleset[]
	
}

import User from "@/types/User";
import Game from "@/types/Game";
import CustomRuleset from "@/types/CustomRuleset";

export default interface State {
	version: number,
	activeGameId: string | undefined,
	games: Game[],
	user: User,
	undo?: Game,
	customRulesets?: CustomRuleset[]
}

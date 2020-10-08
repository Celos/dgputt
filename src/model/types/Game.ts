import Round from "@/model/types/Round";
import Player from "@/model/types/Player";
import RuleModifiers from "@/model/types/RuleModifiers";

export default interface Game {
	id: string;
	ruleId: string;
	players: Player[];
	rounds: Round[];
	completed?: number;
	ruleModifiers?: RuleModifiers;
}

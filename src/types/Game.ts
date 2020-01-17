import Round from "@/types/Round";
import Player from "@/types/Player";
import RuleModifiers from "@/types/RuleModifiers";

export default interface Game {
	id: string;
	ruleId: string;
	players: Player[];
	rounds: Round[];
	completed?: number;
	ruleModifiers?: RuleModifiers;
}

import Round from "@/types/Round";
import Player from "@/types/Player";

export default interface Game {
	id: string;
	ruleId: string;
	score: number;
	players: Player[];
	rounds: Round[];
	completed?: number;
}

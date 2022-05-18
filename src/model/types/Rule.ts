import Game from "@/model/types/Game";
import RuleModifiers from "@/model/types/RuleModifiers";

export default interface Rule {

	id: string;
	rounds?: number;
	distances: (modifiers?: RuleModifiers) => number[];
	start: number;
	discs: number;
	color: string;
	nextRound: (distance: number, hits: number, game: Game) => number;
	score: (distance: number, hits: number, game: Game) => number;
	endCondition: (game: Game) => boolean;
	validOverrides: string[];

}

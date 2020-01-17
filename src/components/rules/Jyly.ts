import Rule from "@/types/Rule";
import Game from "@/types/Game";

const Jyly: Rule = {
	id: "jyly",
	rounds: 20,
	distances: [5,6,7,8,9,10],
	start: 10,
	discs: 5,
	color: "green",
	nextRound: (distance: number, hits: number) => hits + 5,
	score: (distance: number, hits: number) => hits * distance,
	endCondition: (afterRoundState: Game) => afterRoundState.rounds.length >= 20 * afterRoundState.players.length
};

export default Jyly;

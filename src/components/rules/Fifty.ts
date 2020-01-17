import Rule from "@/types/Rule";
import Game from '@/types/Game';

const Fifty: Rule = {
	id: "fifty",
	rounds: 10,
	distances: [5],
	start: 5,
	discs: 5,
	color: "red",
	nextRound: () => 5,
	score: (distance: number, hits: number) => hits,
	endCondition: (afterRoundState: Game) => afterRoundState.rounds.length >= 10 * afterRoundState.players.length
};

export default Fifty;

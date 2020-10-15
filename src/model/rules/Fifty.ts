import Rule from "@/model/types/Rule";
import Game from '@/model/types/Game';

const rounds = 10;
const start = 5;
const discs = 5;

const Fifty: Rule = {
	id: "fifty",
	rounds: rounds,
	distances: (game?: Game) => {
		return game && game.ruleModifiers && game.ruleModifiers.start ? [game.ruleModifiers.start] : [start];
	},
	start: start,
	discs: discs,
	color: "red",
	nextRound: (distance, hits, game: Game) => {
		let nextRoundDistance = start;
		if (game.ruleModifiers && game.ruleModifiers.start) {
			nextRoundDistance = game.ruleModifiers.start;
		}
		return nextRoundDistance;
	},
	score: (distance: number, hits: number) => hits,
	endCondition: (game: Game) => {
		let totalRounds = rounds;
		if (game.ruleModifiers && game.ruleModifiers.rounds) {
			totalRounds = game.ruleModifiers.rounds;
		}
		return game.rounds.length >= totalRounds * game.players.length
	},
	validOverrides: ["rounds", "start", "discs"]
};

export default Fifty;

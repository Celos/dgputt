import Rule from "@/model/types/Rule";
import Game from "@/model/types/Game";

const rounds = 20;
const discs = 5;
const start = 10;

const Jyly: Rule = {
	id: "jyly",
	rounds: rounds,
	distances: (game: Game) => {
		const distances: number[] = [];
		const startingDistance = game.ruleModifiers && game.ruleModifiers.start ? game.ruleModifiers.start : start;
		const totalDiscs = game.ruleModifiers && game.ruleModifiers.discs ? game.ruleModifiers.discs : discs;
		const end = startingDistance - totalDiscs;
		for (let i = startingDistance; i >= end; i--) {
			distances.push(i);
		}
		return distances;
	},
	start: start,
	discs: discs,
	color: "green",
	nextRound: (distance: number, hits: number, game: Game) => {
		let startDistance = start;
		let totalDiscs = discs;
		if (game.ruleModifiers) {
			if (game.ruleModifiers.start) {
				startDistance = game.ruleModifiers.start;
			}
			if (game.ruleModifiers.discs) {
				totalDiscs = game.ruleModifiers.discs;
			}
		}
		return startDistance - (totalDiscs - hits)
	},
	score: (distance: number, hits: number) => hits * distance,
	endCondition: (game: Game) => {
		let totalRounds = rounds;
		if (game.ruleModifiers && game.ruleModifiers.rounds) {
			totalRounds = game.ruleModifiers.rounds;
		}
		return game.rounds.length >= totalRounds * game.players.length
	},
	validOverrides: ["rounds", "start", "discs"]
};

export default Jyly;

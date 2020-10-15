import Rule from "@/model/types/Rule";
import Game from "@/model/types/Game";

const start = 5;
const discs = 3;

const Ladder: Rule = {
	id: "ladder",
	rounds: undefined,
	distances: (game?: Game) => {
		const distances: number[] = [];
		const startingDistance = game && game.ruleModifiers && game.ruleModifiers.start ? game.ruleModifiers.start : start;
		const end = startingDistance + 5;
		for (let i = startingDistance; i <= end; i++) {
			distances.push(i);
		}
		return distances;
	},
	start: start,
	discs: discs,
	color: "orange",
	nextRound: (distance: number, hits: number, afterRoundState: Game) => {
		let startingDistance = start;
		let totalDiscs = discs;
		if (afterRoundState.ruleModifiers) {
			if (afterRoundState.ruleModifiers.start) {
				startingDistance = afterRoundState.ruleModifiers.start;
			}
			if (afterRoundState.ruleModifiers.discs) {
				totalDiscs = afterRoundState.ruleModifiers.discs;
			}
		}
		if (hits/totalDiscs < 0.5) {
			return distance === startingDistance ? startingDistance : distance - 1;
		} else if (hits/totalDiscs > 0.75) {
			return distance + 1;
		}
		return distance;
	},
	score: () => 1,
	endCondition: (game: Game) => {
		const lastRound = game.rounds[game.rounds.length - 1];
		const startingDistance = game.ruleModifiers && game.ruleModifiers.start ? game.ruleModifiers.start : start;
		const totalDiscs = game.ruleModifiers && game.ruleModifiers.discs ? game.ruleModifiers.discs : discs;
		return lastRound.distance >= startingDistance + 5  && lastRound.hits == totalDiscs;
	},
	validOverrides: ["start", "discs"]
};

export default Ladder;

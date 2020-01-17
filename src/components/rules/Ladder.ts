import Rule from "@/types/Rule";
import Game from "@/types/Game";

const distances = [5,6,7,8,9,10];

const Ladder: Rule = {
	id: "ladder",
	rounds: undefined,
	distances: distances,
	start: distances[0],
	discs: 3,
	color: "orange",
	nextRound: (distance: number, hits: number) => {
		if (hits < 2) {
			return distance === distances[0] ? distances[0] : distance - 1;
		} else if (hits > 2) {
			return distance + 1;
		}
		return distance;
	},
	score: () => 1,
	endCondition: (afterRoundState: Game) => {
		let lastRound = afterRoundState.rounds[afterRoundState.rounds.length - 1];
		return lastRound.distance >= 10 && lastRound.hits == 3;
	}
};

export default Ladder;

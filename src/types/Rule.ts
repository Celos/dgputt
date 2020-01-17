import Game from "@/types/Game";

export default interface Rule {
	id: string,
	rounds?: number,
	distances: number[],
	start: number,
	discs: number,
	color: string,
	nextRound: (distance: number, hits: number) => number,
	score: (distance: number, hits: number) => number,
	endCondition: (afterRoundState: Game) => boolean
}

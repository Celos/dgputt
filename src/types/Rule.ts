import Game from "@/types/Game";

export default interface Rule {
	id: string,
	rounds?: number,
	distances: (game: Game) => number[],
	start: number,
	discs: number,
	color: string,
	nextRound: (distance: number, hits: number, game: Game) => number,
	score: (distance: number, hits: number, game: Game) => number,
	endCondition: (game: Game) => boolean,
	validOverrides: string[]
}

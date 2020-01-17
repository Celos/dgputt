import User from "@/types/User";
import Game from "@/types/Game";

export default interface State {
	version: number,
	activeGameId: string | undefined,
	games: Game[],
	user: User,
	undo?: Game
}

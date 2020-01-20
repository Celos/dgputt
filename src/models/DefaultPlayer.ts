import Player from "@/types/Player";

export default class DefaultPlayer implements Player {

	public readonly id: number;
	public readonly primary?: boolean;
	public readonly name?: string;
	public readonly userId?: string;

	public score: number = 0;

	constructor(id: number, primary?: boolean, name?: string, userId?: string) {
		this.id = id;
		this.primary = primary;
		this.name = name;
		this.userId = userId;
	}
}
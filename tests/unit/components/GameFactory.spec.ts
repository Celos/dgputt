import Game from "@/model/types/Game";
import GameFactory from "@/components/games/GameFactory";
import Jyly from "@/model/rules/Jyly";
import { v4 as uuid } from "uuid";

jest.mock("uuid", () => ({
	v4: jest.fn().mockReturnValue("someuuid")
}));

describe("GameFactory.ts", () => {
	it("Creates game with correct rules", () => {
		let game: Game = GameFactory.create(Jyly);
		expect(game.ruleId).toBe(Jyly.id);
	});
	
	it("Creates UUID for id", () => {
		let game: Game = GameFactory.create(Jyly);
		expect(uuid).toBeCalled();
		expect(game.id).toBe("someuuid");
	});
	
	it("Creates game with correct defaults", () => {
		let game: Game = GameFactory.create(Jyly);
		expect(game.completed).toBeUndefined();
		expect(game.rounds.length).toBe(0);
	});

	it("Creates game with user details", () => {
		let game: Game = GameFactory.create(Jyly);
		expect(game.players[0].id).toBe(1);
		expect(game.players[0].score).toBe(0);
		expect(game.players[0].primary).toBe(true);
	})
});

import Game from "@/types/Game";
import GameFactory from "@/components/GameFactory";
import Jyly from "@/components/rules/Jyly";
import uuidv4 from "uuidv4";
import {testUser} from "../../utils/testUser";

jest.mock("uuidv4", () => ({
	uuid: jest.fn().mockReturnValue("someuuid")
}));

describe("GameFactory.ts", () => {
	it("Creates game with correct rules", () => {
		let game: Game = GameFactory.create(Jyly, testUser);
		expect(game.ruleId).toBe(Jyly.id);
	});
	
	it("Creates UUID for id", () => {
		let game: Game = GameFactory.create(Jyly, testUser);
		expect(uuidv4.uuid).toBeCalled();
		expect(game.id).toBe("someuuid");
	});
	
	it("Creates game with correct defaults", () => {
		let game: Game = GameFactory.create(Jyly, testUser);
		expect(game.completed).toBeUndefined();
		expect(game.rounds.length).toBe(0);
		expect(game.score).toBe(0);
	})
})

import Jyly from "@/model/rules/Jyly";
import Rules from '@/model/rules/Rules';
import Ladder from "@/model/rules/Ladder";
import Fifty from "@/model/rules/Fifty";

describe("Rules.ts", () => {
	it("Returns the correct rule by ID", () => {
		expect(Rules.byId(Jyly.id)).toBe(Jyly);
		expect(Rules.byId(Ladder.id)).toBe(Ladder);
		expect(Rules.byId(Fifty.id)).toBe(Fifty);
	})
});

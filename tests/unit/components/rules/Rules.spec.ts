import Jyly from "@/components/rules/Jyly";
import Rules from '@/components/rules/Rules';
import Ladder from "@/components/rules/Ladder";
import Fifty from "@/components/rules/Fifty";

describe("Rules.ts", () => {
	it("Returns the correct rule by ID", () => {
		expect(Rules.byId(Jyly.id)).toBe(Jyly);
		expect(Rules.byId(Ladder.id)).toBe(Ladder);
		expect(Rules.byId(Fifty.id)).toBe(Fifty);
	})
});

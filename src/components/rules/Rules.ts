import Rule from "@/types/Rule";
import Jyly from "@/components/rules/Jyly";
import Ladder from "@/components/rules/Ladder";
import Fifty from "@/components/rules/Fifty";

export default class Rules {

	public static all(): Rule[] {
		return [Jyly, Ladder, Fifty]
	}

	public static byId(id: string): Rule {
		let rule: Rule | undefined = Rules.all().find(rule => rule.id === id);
		if (!rule) {
			throw new Error("Unknown rule " + id);
		}
		return rule;
	}

}

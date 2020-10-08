import Rule from "@/model/types/Rule";
import Jyly from "@/model/rules/Jyly";
import Ladder from "@/model/rules/Ladder";
import Fifty from "@/model/rules/Fifty";

export default class Rules {

	public static all(): Rule[] {
		return [Jyly, Ladder, Fifty]
	}

	public static byId(id: string): Rule {
		const rule: Rule | undefined = Rules.all().find(rule => rule.id === id);
		if (!rule) {
			throw new Error("Unknown rule " + id);
		}
		return rule;
	}

}

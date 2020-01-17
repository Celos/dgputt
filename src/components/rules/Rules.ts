import Rule from "@/types/Rule";
import Jyly from "@/components/rules/Jyly";
import Ladder from "@/components/rules/Ladder";
import Fifty from "@/components/rules/Fifty";

export default class Rules {

	public static all(): Rule[] {
		return [Jyly, Ladder, Fifty]
	}

	public static byId(id: string): Rule {
		return Rules.all()
			.filter(rule => rule.id === id)
			.reduce((acc, rule) => rule);
	}

}

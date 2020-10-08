import CustomRuleset from "@/model/types/CustomRuleset";
import RuleModifiers from "@/model/types/RuleModifiers";
import Rules from "@/model/rules/Rules";

export default class DefaultCustomRuleset implements CustomRuleset {

	public readonly id: string;
	public readonly ruleId: string;
	public readonly modifiers: RuleModifiers;

	constructor(id: string, ruleId: string, modifiers?: RuleModifiers) {
		this.id = id;
		this.ruleId = ruleId;
		if (modifiers) {
			this.modifiers = modifiers;
		} else {
			const rules = Rules.byId(ruleId);
			this.modifiers = {
				discs: rules.discs,
				rounds: rules.rounds,
				start: rules.start
			}
		}
	}
}
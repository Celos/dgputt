import Settings from "@/model/types/Settings";

export default interface User {

	id: string;
	name?: string;
	settings: Settings;

}

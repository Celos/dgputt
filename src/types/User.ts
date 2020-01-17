import Settings from "@/types/Settings";

export default interface User {
	id: string;
	name: string;
	settings: Settings;
}

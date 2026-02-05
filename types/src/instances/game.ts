import type { Environment } from "./environment";
import type { Instance } from "./instance";

export declare class Game extends Instance {
	Rendered: Event<number>;
	GameID: number;
	InstanceCount: number;
	LocalInstanceCount: number;
	PlayersConnected: number;

	Environment: Environment;
}

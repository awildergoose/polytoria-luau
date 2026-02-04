import type { Instance } from "./instance";
import type { Player } from "./player";

export declare class Players extends Instance {
	PlayerAdded: Event<Player>;
	PlayerRemoved: Event<Player>;
	PlayerCollisionEnabled: boolean;
	LocalPlayer: Player;

	GetPlayers(): Player[];
	GetPlayer(username: string): Player | undefined;
	GetPlayerByID(id: number): Player | undefined;
}

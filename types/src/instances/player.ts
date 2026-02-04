import type { Instance } from "./instance";
import type { Seat } from "./seat";

export declare class Player extends Instance {
	Chatted: Event<[string, PlayerChatEvent]>;
	Died: Event<void>;
	Respawned: Event<void>;

	DropTools(): void;
	Kick(message: string): void;
	LoadAppearance(userID: number): void;
	ClearAppearance(): void;
	OwnsItem(
		assetID: number,
		callback: (err: any, owns: boolean) => void
	): void;
	ResetAppearance(): void;
	Respawn(): void;
	Sit(seat: Seat): void;
	Unsit(addForce: boolean): void;

	// TODO: properties
}

declare class PlayerChatEvent {
	Player: Player;
	Message: string;
	Canceled: boolean;
}

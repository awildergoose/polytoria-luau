import type { Player } from "./player";

export declare class Chat {
	BroadcastMessage(message: string): void;
	UnicastMessage(message: string, player: Player): void;
}

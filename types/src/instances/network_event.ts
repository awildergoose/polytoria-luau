import type { NetMessage } from "../types/net_message";
import type { Instance } from "./instance";
import type { Player } from "./player";

export declare class NetworkEvent extends Instance {
	InvokedClient: Event<[undefined, NetMessage]>;
	InvokedServer: Event<[Player, NetMessage]>;

	InvokeServer(message: NetMessage): void;
	InvokeClients(message: NetMessage): void;
	InvokeClient(message: NetMessage, player: Player): void;
}

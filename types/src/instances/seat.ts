import type { Part } from "./part";
import type { Player } from "./player";

export declare class Seat extends Part {
	Sat: Event<Player>;
	Vacated: Event<Player>;
	Occupant: Player | undefined;
}

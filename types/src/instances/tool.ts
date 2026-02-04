import type { DynamicInstance } from "./dynamic_instance";

export type ToolAnimation = "slash" | "eat" | "drink";

export declare class Tool extends DynamicInstance {
	Activated: Event<void>;
	Deactivated: Event<void>;
	Equipped: Event<void>;
	Unequipped: Event<void>;

	Play(anim: ToolAnimation): void;

	Droppable: boolean;
}

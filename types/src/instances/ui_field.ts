import type { Vector2 } from "../types/vector2";
import type { Instance } from "./instance";

export declare class UIField extends Instance {
	MouseUp: Event<void>;
	MouseDown: Event<void>;
	PositionOffset: Vector2;
	PositionRelative: Vector2;
	Rotation: number;
	SizeOffset: Vector2;
	SizeRelative: Vector2;
	PivotPoint: Vector2;
	Visible: boolean;
	ClipDescendants: boolean;
}

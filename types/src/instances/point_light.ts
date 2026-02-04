import type { Color } from "../types/color";
import type { DynamicInstance } from "./dynamic_instance";

export declare class PointLight extends DynamicInstance {
	Range: number;
	Brightness: number;
	Color: Color;
	Shadows: boolean;
}

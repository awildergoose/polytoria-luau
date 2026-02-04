import type { Color } from "../types/color";
import type { DynamicInstance } from "./dynamic_instance";

export declare class SpotLight extends DynamicInstance {
	Range: number;
	Angle: number;
	Brightness: number;
	Color: Color;
	Shadows: boolean;
}

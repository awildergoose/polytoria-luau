import type { Color } from "./color";

export declare class ColorRange {
	min: Color;
	max: Color;

	static New(min: Color, max: Color): Color;

	Lerp(t: number): Color;
}

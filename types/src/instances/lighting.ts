import type { AmbientSource } from "../enums";
import type { Color } from "../types/color";
import type { Instance } from "./instance";

export declare class Lighting extends Instance {
	SunBrightness: number;
	SunColor: Color;
	AmbientColor: Color;
	AmbientSource: AmbientSource;
	Shadows: boolean;
}

import type { Color } from "../types/color";
import type { SkyBase } from "./sky_base";

export declare class GradientSky extends SkyBase {
	SunDiscColor: Color;
	SunDiscMultiplier: number;
	SunDiscExponent: number;
	SunHaloColor: Color;
	SunHaloExponent: number;
	SunHaloContribution: number;
	HorizonLineColor: Color;
	HorizonLineExponent: number;
	HorizonLineContribution: number;
	SkyGradientTop: Color;
	SkyGradientBottom: Color;
	SkyGradientExponent: number;
}

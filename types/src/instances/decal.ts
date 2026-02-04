import type { ImageType } from "../enums";
import type { Color } from "../types/color";
import type { Vector2 } from "../types/vector2";
import type { DynamicInstance } from "./dynamic_instance";

export declare class Decal extends DynamicInstance {
	ImageID: string;
	ImageType: ImageType;
	TextureScale: Vector2;
	TextureOffset: Vector2;
	Color: Color;
	CastShadows: boolean;
}

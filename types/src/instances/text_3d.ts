import type {
	HorizontalAlignment,
	TextFontPreset,
	VerticalAlignment,
} from "../enums";
import type { Color } from "../types/color";
import type { DynamicInstance } from "./dynamic_instance";

export declare class Text3D extends DynamicInstance {
	Text: string;
	Color: Color;
	FontSize: number;
	FaceCamera: boolean;
	HorizontalAlignment: HorizontalAlignment;
	VerticalAlignment: VerticalAlignment;
	Font: TextFontPreset;
}

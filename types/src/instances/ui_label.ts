import type { TextFontPreset, TextJustify, TextVerticalAlign } from "../enums";
import type { Color } from "../types/color";
import type { Instance } from "./instance";

export declare class UILabel extends Instance {
	Text: string;
	TextColor: Color;
	JustifyText: TextJustify;
	VerticalAlign: TextVerticalAlign;
	FontSize: number;
	MaxFontSize: number;
	AutoSize: boolean;
	Font: TextFontPreset;
	OutlineColor: Color;
	OutlineWidth: number;
}

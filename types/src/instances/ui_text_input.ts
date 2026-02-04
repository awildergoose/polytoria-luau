import type { TextFontPreset, TextJustify, TextVerticalAlign } from "../enums";
import type { Color } from "../types/color";
import type { UIView } from "./ui_view";

export declare class UITextInput extends UIView {
	Changed: Event<string>;
	Submitted: Event<string>;

	Focus(): void;

	Text: string;
	TextColor: Color;
	JustifyText: TextJustify;
	VerticalAlign: TextVerticalAlign;
	FontSize: number;
	MaxFontSize: number;
	AutoSize: boolean;
	Font: TextFontPreset;
	Placeholder: string;
	PlaceholderColor: Color;
	IsMultiline: boolean;
	IsReadOnly: boolean;
	IsFocused: boolean;
}

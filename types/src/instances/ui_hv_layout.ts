import type { TextAnchor } from "../enums";
import type { UIField } from "./ui_field";

export declare class UIHVLayout extends UIField {
	Spacing: number;
	ChildControlWidth: boolean;
	ChildControlHeight: boolean;
	ChildScaleWidth: boolean;
	ChildScaleHeight: boolean;
	ChildForceExpandWidth: boolean;
	ChildForceExpandHeight: boolean;
	PaddingLeft: number;
	PaddingRight: number;
	PaddingTop: number;
	PaddingBottom: number;
	ChildAlignment: TextAnchor;
	ReverseAlignment: boolean;
}

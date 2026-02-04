import type { ImageType } from "../enums";
import type { Color } from "../types/color";
import type { UIField } from "./ui_field";

export declare class UIImage extends UIField {
	ImageID: string;
	ImageType: ImageType;
	Color: Color;
	Clickable: boolean;
	Loading: boolean;
}

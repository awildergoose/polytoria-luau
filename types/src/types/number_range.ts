export declare class NumberRange {
	min: number;
	max: number;

	static New(min: number, max: number): NumberRange;

	Lerp(t: number): number;
}

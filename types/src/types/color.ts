export declare class Color {
	r: number;
	g: number;
	b: number;
	a: number;

	static New(
		r: number | undefined,
		g: number | undefined,
		b: number | undefined,
		a: number | undefined
	): Color;
	static FromHex(hex: string): Color;
	static Random(): Color;

	Lerp(b: Color, t: number): Color;
}

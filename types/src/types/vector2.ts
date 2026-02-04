export declare class Vector2 {
	x: number;
	y: number;
	magnitude: number;
	sqrMagnitude: number;
	normalized: number;

	static New(x: number | undefined, y: number | undefined): Vector2;

	Lerp(b: Vector2, t: number): Vector2;
}

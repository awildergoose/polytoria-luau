export declare class Vector3 {
	x: number;
	y: number;
	z: number;
	magnitude: number;
	sqrMagnitude: number;
	normalized: number;

	static New(
		x: number | undefined,
		y: number | undefined,
		z: number | undefined
	): Vector3;
	// TODO
}

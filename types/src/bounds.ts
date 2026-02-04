import type { Vector3 } from "./vector3";

export declare class Bounds {
	center: Vector3;
	extents: Vector3;

	static New(
		center: Vector3 | undefined,
		extents: Vector3 | undefined
	): Bounds;
}

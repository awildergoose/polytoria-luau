import type { Vector3 } from "./vector3";

export declare class Bounds {
	center: Vector3;
	extents: Vector3;

	static New(
		center: Vector3 | undefined,
		extents: Vector3 | undefined
	): Bounds;

	ClosestPoint(bounds: Bounds, point: Vector3): Vector3;
	Contains(point: Vector3): boolean;
	Encapsulate(point: Vector3): void;
	Encapsulate(other: Bounds): void;
	Intersects(other: Bounds): boolean;
	SetMinMax(min: Vector3, max: Vector3): void;
	SqrDistance(point: Vector3): number;
	IntersectRay(origin: Vector3, direction: Vector3): Tuple<boolean, number>;
}

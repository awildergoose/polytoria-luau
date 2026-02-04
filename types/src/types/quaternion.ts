import type { Vector3 } from "./vector3";

export declare class Quaternion {
	static Identity: Quaternion;
	static New(
		x: number | undefined,
		y: number | undefined,
		z: number | undefined,
		w: number | undefined
	): Quaternion;

	Angle(a: Quaternion, b: Quaternion): number;
	AngleAxis(angle: number, axis: Vector3): Quaternion;
	Dot(b: Quaternion): number;
	Euler(x: number, y: number, z: number): Quaternion;
	Euler(euler: Vector3): Quaternion;
	FromToRotation(fromDirection: Vector3, toDirection: Vector3): Quaternion;
	Inverse(rotation: Quaternion): Quaternion;
	Lerp(a: Quaternion, b: Quaternion, t: number): Quaternion;
	LerpUnclamped(a: Quaternion, b: Quaternion, t: number): Quaternion;
	LookRotation(forward: Vector3): Quaternion;
	LookRotation(forward: Vector3, upwards: Vector3): Quaternion;
	Normalize(q: Quaternion): Quaternion;
	RotateTowards(
		from: Quaternion,
		to: Quaternion,
		maxDegreesDelta: number
	): Quaternion;
	Slerp(a: Quaternion, b: Quaternion, t: number): Quaternion;
	SlerpUnclamped(a: Quaternion, b: Quaternion, t: number): Quaternion;
}

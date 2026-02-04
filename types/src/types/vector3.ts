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

	Angle(to: Vector3): Vector3;
	ClampMagnitude(maxLength: number): Vector3;
	Cross(b: Vector3): Vector3;
	Distance(b: Vector3): Vector3;
	Dot(b: Vector3): Vector3;
	Lerp(b: Vector3, t: number): Vector3;
	Max(b: Vector3): Vector3;
	Min(b: Vector3): Vector3;
	MoveTowards(target: Vector3, maxDistanceDelta: number): Vector3;
	Normalize(): Vector3;
	Project(onNormal: Vector3): Vector3;
	ProjectOnPlane(planeNormal: Vector3): Vector3;
	Reflect(inNormal: Vector3): Vector3;
	RotateTowards(
		target: Vector3,
		maxRadiansDelta: number,
		maxMagnitudeDelta: number
	): Vector3;
	Scale(b: Vector3): Vector3;
	SignedAngle(to: Vector3, axis: Vector3): Vector3;
	Slerp(b: Vector3): Vector3;
	SlerpUnclamped(b: Vector3): Vector3;
	SmoothDamp(
		target: Vector3,
		currentVelocity: Vector3,
		smoothTime: number,
		maxSpeed: number,
		deltaTime: number
	): Vector3;
}

import type { Quaternion } from "../types/quaternion";
import type { Vector3 } from "../types/vector3";
import type { Instance } from "./instance";

export declare class DynamicInstance extends Instance {
	Forward: Vector3;
	LocalPosition: Vector3;
	LocalRotation: Vector3;
	LocalSize: Vector3;
	Position: Vector3;
	Right: Vector3;
	Rotation: Vector3;
	Size: Vector3;
	Up: Vector3;
	Quaternion: Quaternion;
	LocalQuaternion: Quaternion;

	ApplyTransform(): void;
	CheckIfChildOfPlayerTool(): void;
	LookAt(
		rotation: Vector3 | DynamicInstance,
		worldUp: Vector3 | undefined
	): void;
	Translate(translation: Vector3): void;
	RotateAround(point: Vector3, axis: Vector3, angle: number): void;
	Rotate(eulerAngles: Vector3): void;
	InverseTransformPoint(point: Vector3): Vector3;
	TransformPoint(point: Vector3): Vector3;
	InverseTransformDirection(direction: Vector3): Vector3;
	TransformDirection(direction: Vector3): Vector3;
	InverseTransformVector(vector: Vector3): Vector3;
	TransformVector(vector: Vector3): Vector3;
}

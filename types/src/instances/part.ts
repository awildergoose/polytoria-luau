import type { ForceMode, PartMaterial, PartShape } from "../enums";
import type { Color } from "../types/color";
import type { Vector3 } from "../types/vector3";
import type { DynamicInstance } from "./dynamic_instance";

export declare class Part extends DynamicInstance {
	Color: Color;
	Anchored: boolean;
	CanCollide: boolean;
	IsSpawn: boolean;
	Shape: PartShape;
	Material: PartMaterial;
	Velocity: Vector3;
	Drag: number;
	AngularDrag: number;
	Mass: number;
	AngularVelocity: Vector3;
	UseGravity: boolean;
	Bounciness: number;
	Friction: number;
	CastShadows: boolean;

	MovePosition(pos: Vector3): void;
	MoveRotation(rot: Vector3): void;
	AddForce(force: Vector3, mode: ForceMode | undefined): void;
	AddTorque(torque: Vector3, mode: ForceMode | undefined): void;
	AddForceAtPosition(
		force: Vector3,
		position: Vector3,
		mode: ForceMode | undefined
	): void;
	AddRelativeForce(force: Vector3, mode: ForceMode | undefined): void;
	AddRelativeTorque(torque: Vector3, mode: ForceMode | undefined): void;
}

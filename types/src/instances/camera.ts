import type { CameraMode } from "../enums";
import type { Vector3 } from "../vector3";
import type { Instance } from "./instance";

export declare class Camera extends Instance {
	Distance: number;
	FOV: number;
	FastFlySpeed: number;
	FlySpeed: number;
	FollowLerp: boolean;
	FreeLookSensitivity: number;
	HorizontalSpeed: number;
	IsFirstPerson: boolean;
	LerpSpeed: number;
	MaxDistance: number;
	MinDistance: number;
	Mode: CameraMode;
	Orthographic: boolean;
	OrthographicSize: number;
	PositionOffset: Vector3;
	RotationOffset: Vector3;
	ScrollSensitivity: number;
	VerticalSpeed: number;
	ClipThroughWalls: boolean;
	SensitivityMultiplier: number;
}

import type { Color } from "../types/color";
import type { Vector3 } from "../types/vector3";
import type { DynamicInstance } from "./dynamic_instance";
import type { Instance } from "./instance";
import type { Seat } from "./seat";

export declare class Player extends Instance {
	Chatted: Event<[string, PlayerChatEvent]>;
	Died: Event<void>;
	Respawned: Event<void>;

	DropTools(): void;
	Kick(message: string): void;
	LoadAppearance(userID: number): void;
	ClearAppearance(): void;
	OwnsItem(
		assetID: number,
		callback: (success: boolean, owned: boolean) => void
	): void;
	ResetAppearance(): void;
	Respawn(): void;
	Sit(seat: Seat): void;
	Unsit(addForce: boolean): void;

	// DynamicInstance?
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

	RespawnTime: number;
	Velocity: Vector3;
	MaxHealth: number;
	Health: number;
	WalkSpeed: number;
	SprintSpeed: number;
	StaminaEnabled: boolean;
	Stamina: number;
	MaxStamina: number;
	StaminaRegen: number;
	JumpPower: number;
	Position: Vector3;
	Rotation: Vector3;
	Size: Vector3;
	ChatColor: Color;
	CanMove: boolean;
	Anchored: boolean;
	HeadColor: Color;
	TorsoColor: Color;
	LeftArmColor: Color;
	RightArmColor: Color;
	LeftLegColor: Color;
	RightLegColor: Color;
	ShirtID: number;
	PantsID: number;
	FaceID: number;
	IsInputFocused: boolean;
	SittingIn: Seat | undefined;
	Forward: Vector3;
	Right: Vector3;
	IsAdmin: boolean;
	IsCreator: boolean;
	UserID: number;
}

export declare class PlayerChatEvent {
	Player: Player;
	Message: string;
	Canceled: boolean;
}

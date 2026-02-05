import type { Color } from "../types/color";
import type { Vector3 } from "../types/vector3";
import type { DynamicInstance } from "./dynamic_instance";
import type { Instance } from "./instance";
import type { Tool } from "./tool";

export declare class NPC extends DynamicInstance {
	Died: Event<void>;

	Respawn(): void;
	Jump(): void;
	LoadAppearance(userID: number): void;
	ClearAppearance(): void;
	SetNavDestination(destination: Vector3): void;
	EquipTool(tool: Tool): void;
	DropTool(): void;

	MoveTarget: Instance;
	HeadColor: Color;
	TorsoColor: Color;
	LeftArmColor: Color;
	RightArmColor: Color;
	LeftLegColor: Color;
	RightLegColor: Color;
	Anchored: boolean;
	Health: number;
	MaxHealth: number;
	ShirtID: number;
	PantsID: number;
	FaceID: number;
	WalkSpeed: number;
	JumpPower: number;
	Velocity: Vector3;
	NavDestinationDistance: number;
	NavDestinationReached: boolean;
	NavDestinationValid: boolean;
	Grounded: boolean;
}

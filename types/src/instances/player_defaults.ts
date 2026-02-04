import type { Color } from "../types/color";
import type { Instance } from "./instance";

export declare class PlayerDefaults extends Instance {
	MaxHealth: number;
	WalkSpeed: number;
	SprintSpeed: number;
	StaminaEnabled: number;
	Stamina: number;
	MaxStamina: number;
	StaminaRegen: number;
	JumpPower: number;
	RespawnTime: number;
	ChatColor: Color;
}

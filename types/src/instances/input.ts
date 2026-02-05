import type { RayResult } from "../types/ray_result";
import type { Vector3 } from "../types/vector3";
import type { Instance } from "./instance";

type KeyCode = string;

export declare class Input {
	KeyDown: Event<string>;
	KeyUp: Event<string>;

	GetMouseWorldPosition(): Vector3;
	GetMouseWorldPoint(): Vector3;
	ScreenToWorldPoint(pos: Vector3): Vector3;
	ScreenToViewportPoint(pos: Vector3): Vector3;
	WorldToScreenPoint(pos: Vector3): Vector3;
	WorldToViewportPoint(pos: Vector3): Vector3;
	ViewportToWorldPoint(pos: Vector3): Vector3;
	ViewportToScreenPoint(pos: Vector3): Vector3;
	ScreenPointToRay(
		pos: Vector3,
		ignoreList: Instance[] | undefined
	): RayResult | undefined;
	ViewportPointToRay(
		pos: Vector3,
		ignoreList: Instance[] | undefined
	): RayResult | undefined;
	GetButton(buttonName: string): boolean;
	GetButtonDown(buttonName: string): boolean;
	GetButtonUp(buttonName: string): boolean;
	GetAxis(axisName: string): number;
	GetAxisRaw(axisName: string): number;
	GetKey(key: KeyCode): boolean;
	GetKeyDown(key: KeyCode): boolean;
	GetKeyUp(key: KeyCode): boolean;
	GetMouseButton(button: number): boolean;
	GetMouseButtonDown(button: number): boolean;
	GetMouseButtonUp(button: number): boolean;

	MousePosition: Vector3;
	CursorLocked: boolean;
	CursorVisible: boolean;
	ScreenWidth: number;
	ScreenHeight: number;
	AnyKey: boolean;
	AnyKeyDown: boolean;
	IsInputFocused: boolean;
}

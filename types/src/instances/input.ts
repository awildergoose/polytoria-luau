import type { RayResult } from "../types/ray_result";
import type { Vector3 } from "../types/vector3";

type KeyCode = string;

export declare class Input {
	static KeyDown: Event<string>;
	static KeyUp: Event<string>;

	static GetMouseWorldPosition(): Vector3;
	static GetMouseWorldPoint(): Vector3;
	static ScreenToWorldPoint(pos: Vector3): Vector3;
	static ScreenToViewportPoint(pos: Vector3): Vector3;
	static WorldToScreenPoint(pos: Vector3): Vector3;
	static WorldToViewportPoint(pos: Vector3): Vector3;
	static ViewportToWorldPoint(pos: Vector3): Vector3;
	static ViewportToScreenPoint(pos: Vector3): Vector3;
	static ScreenPointToRay(
		pos: Vector3,
		ignoreList: {} | undefined
	): RayResult | undefined;
	static ViewportPointToRay(
		pos: Vector3,
		ignoreList: {} | undefined
	): RayResult | undefined;
	static GetButton(buttonName: string): boolean;
	static GetButtonDown(buttonName: string): boolean;
	static GetButtonUp(buttonName: string): boolean;
	static GetAxis(axisName: string): number;
	static GetAxisRaw(axisName: string): number;
	static GetKey(key: KeyCode): boolean;
	static GetKeyDown(key: KeyCode): boolean;
	static GetKeyUp(key: KeyCode): boolean;
	static GetMouseButton(button: number): boolean;
	static GetMouseButtonDown(button: number): boolean;
	static GetMouseButtonUp(button: number): boolean;

	static MousePosition: Vector3;
	static CursorLocked: boolean;
	static CursorVisible: boolean;
	static ScreenWidth: number;
	static ScreenHeight: number;
	static AnyKey: boolean;
	static AnyKeyDown: boolean;
	static IsInputFocused: boolean;
}

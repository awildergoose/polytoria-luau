import type { Instance } from "../instances/instance";
import type { Color } from "./color";
import type { Vector2 } from "./vector2";
import type { Vector3 } from "./vector3";

export declare class NetMessage {
	AddBool(key: string, value: boolean): void;
	AddColor(key: string, value: Color): void;
	AddInstance(key: string, value: Instance): void;
	AddInt(key: string, value: number): void;
	AddNumber(key: string, value: number): void;
	AddString(key: string, value: string): void;
	AddVector2(key: string, value: Vector2): void;
	AddVector3(key: string, value: Vector3): void;
	GetBool(key: string): boolean;
	GetColor(key: string): Color;
	GetInstance(key: string): Instance;
	GetInt(key: string): number;
	GetNumber(key: string): number;
	GetString(key: string): string;
	GetVector2(key: string): Vector2;
	GetVector3(key: string): Vector3;

	static New(): NetMessage;
}

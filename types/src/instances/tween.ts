import type { TweenType } from "../enums";
import type { Color } from "../types/color";
import type { Vector2 } from "../types/vector2";
import type { Vector3 } from "../types/vector3";
import type { DynamicInstance } from "./dynamic_instance";

export declare class Tween {
	static TweenPosition(
		target: DynamicInstance,
		destination: Vector3,
		time: number,
		tweenType: TweenType | undefined,
		callback: (() => void) | undefined
	): number;
	static TweenRotation(
		target: DynamicInstance,
		destination: Vector3,
		time: number,
		tweenType: TweenType | undefined,
		callback: (() => void) | undefined
	): number;
	static TweenSize(
		target: DynamicInstance,
		destination: Vector3,
		time: number,
		tweenType: TweenType | undefined,
		callback: (() => void) | undefined
	): number;
	static TweenNumber(
		start: number,
		end: number,
		time: number,
		callback: (value: number) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	static TweenColor(
		start: Color,
		end: Color,
		time: number,
		callback: (value: Color) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	static TweenVector3(
		start: Vector3,
		end: Vector3,
		time: number,
		callback: (value: Vector3) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	static TweenVector2(
		start: Vector2,
		end: Vector2,
		time: number,
		callback: (value: Vector2) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	static Cancel(id: number, callOnComplete: boolean | undefined): void;
	static CancelAll(callOnComplete: boolean | undefined): void;
	static Pause(id: number): void;
	static Resume(id: number): void;
	static IsPaused(id: number): boolean;
}

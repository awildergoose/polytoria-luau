import type { TweenType } from "../enums";
import type { Color } from "../types/color";
import type { Vector2 } from "../types/vector2";
import type { Vector3 } from "../types/vector3";
import type { DynamicInstance } from "./dynamic_instance";

export declare class Tween {
	TweenPosition(
		target: DynamicInstance,
		destination: Vector3,
		time: number,
		tweenType: TweenType | undefined,
		callback: (() => void) | undefined
	): number;
	TweenRotation(
		target: DynamicInstance,
		destination: Vector3,
		time: number,
		tweenType: TweenType | undefined,
		callback: (() => void) | undefined
	): number;
	TweenSize(
		target: DynamicInstance,
		destination: Vector3,
		time: number,
		tweenType: TweenType | undefined,
		callback: (() => void) | undefined
	): number;
	TweenNumber(
		start: number,
		end_: number,
		time: number,
		callback: (value: number) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	TweenColor(
		start: Color,
		end_: Color,
		time: number,
		callback: (value: Color) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	TweenVector3(
		start: Vector3,
		end_: Vector3,
		time: number,
		callback: (value: Vector3) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	TweenVector2(
		start: Vector2,
		end_: Vector2,
		time: number,
		callback: (value: Vector2) => void,
		tweenType: TweenType | undefined,
		completeCallback: (() => void) | undefined
	): number;
	Cancel(id: number, callOnComplete: boolean | undefined): void;
	CancelAll(callOnComplete: boolean | undefined): void;
	Pause(id: number): void;
	Resume(id: number): void;
	IsPaused(id: number): boolean;
}

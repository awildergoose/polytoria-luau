import type { CollisionType } from "../enums";
import type { AnimationInfo } from "../types/animation_info";
import type { Part } from "./part";

export declare class MeshPart extends Part {
	AssetID: number;
	CurrentAnimation: string;
	IsAnimationPlaying: boolean;
	PlayAnimationOnStart: boolean;
	CollisionType: CollisionType;

	PlayAnimation(
		animationName: string,
		objectPath: string,
		speed: number,
		loop: boolean
	): void;
	StopAnimation(animationName: string | undefined): void;
	GetAnimations(): string[];
	GetAnimationSources(animationName: string): string[] | undefined;
	GetAnimationInfo(): AnimationInfo[];
}

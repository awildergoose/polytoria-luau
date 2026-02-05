import type {
	ImageType,
	ParticleColorMode,
	ParticleShape,
	ParticleSimulationSpace,
} from "../enums";
import type { ColorRange } from "../types/color_range";
import type { NumberRange } from "../types/number_range";
import type { Vector3 } from "../types/vector3";
import type { DynamicInstance } from "./dynamic_instance";

export declare class Particles extends DynamicInstance {
	Play(): void;
	Pause(): void;
	Stop(): void;
	Clear(): void;
	Emit(count: number): void;
	Simulate(time: number): void;

	ImageID: string;
	ImageType: ImageType;
	Color: ColorRange;
	ColorMode: ParticleColorMode;
	Lifetime: NumberRange;
	SizeOverLifetime: NumberRange;
	Speed: NumberRange;
	EmissionRate: number;
	MaxParticles: number;
	Gravity: number;
	SimulationSpace: ParticleSimulationSpace;
	StartRotation: NumberRange;
	AngularVelocity: NumberRange;
	Autoplay: boolean;
	Loop: boolean;
	Duration: number;
	Shape: ParticleShape;
	ShapeRadius: number;
	ShapeAngle: number;
	ShapeScale: Vector3;
	IsPlaying: boolean;
	IsPaused: boolean;
	IsStopped: boolean;
	ParticleCount: number;
	Time: number;
	TotalTime: number;
}

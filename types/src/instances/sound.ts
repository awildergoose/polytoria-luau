import type { DynamicInstance } from "./dynamic_instance";

export declare class Sound extends DynamicInstance {
	Loaded: Event<void>;

	Play(): void;
	PlayOneShot(volume: number | undefined): void;
	Stop(): void;

	Playing: boolean;
	SoundID: number;
	Pitch: number;
	Length: number;
	Time: number;
	Autoplay: boolean;
	Loop: boolean;
	PlayInWorld: boolean;
	Volume: number;
	MaxDistance: number;
	Loading: boolean;
}

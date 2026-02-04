import type { Vector3 } from "../types/vector3";
import type { Instance } from "./instance";

export declare class BodyPosition extends Instance {
	AcceptanceDistance: number;
	Force: number;
	TargetPosition: Vector3;
}

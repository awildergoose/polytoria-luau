import type { Instance } from "../instances/instance";
import type { Vector3 } from "./vector3";

export declare class RayResult {
	Origin: Vector3;
	Direction: Vector3;
	Position: Vector3;
	Normal: Vector3;
	Distance: number;
	Instance: Instance;
}

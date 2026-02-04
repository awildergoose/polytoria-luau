import type { SkyboxPreset } from "../enums";
import type { Color } from "../types/color";
import type { RayResult } from "../types/ray_result";
import type { Vector3 } from "../types/vector3";
import type { Instance } from "./instance";

export declare class Environment extends Instance {
	AutoGenerateNavMesh: boolean;
	FogColor: Color;
	FogEnabled: boolean;
	FogStartDistance: number;
	FogEndDistance: number;
	Gravity: Vector3;
	PartDestroyHeight: number;
	Skybox: SkyboxPreset;

	CreateExplosion(
		position: Vector3,
		radius: number | undefined,
		force: number | undefined,
		affectAnchored: boolean | undefined,
		callback: any,
		damage: number | undefined
	): void;
	OverlapBox(
		position: Vector3,
		size: Vector3,
		rotation: Vector3,
		ignoreList: Instance[] | undefined
	): void;
	OverlapSphere(
		position: Vector3,
		radius: number,
		ignoreList: Instance[] | undefined
	): void;
	Raycast(
		origin: Vector3,
		direction: Vector3,
		maxDistance: number | undefined,
		ignoreList: Instance[] | undefined
	): RayResult | undefined;
	RaycastAll(
		origin: Vector3,
		direction: Vector3,
		maxDistance: number | undefined,
		ignoreList: Instance[] | undefined
	): RayResult[];
	RebuildNavMesh(root: Instance | undefined): void;
	GetPointOnNavMesh(
		position: Vector3,
		maxDistance: number | undefined
	): Vector3;
}

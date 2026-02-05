import type { Bounds } from "../types/bounds";
import type { Player } from "./player";

export declare class Instance {
	ChildAdded: Event<Instance>;
	ChildRemoved: Event<Instance>;
	Clicked: Event<Player>;
	MouseEnter: Event<void>;
	MouseExit: Event<void>;
	Touched: Event<Instance>;
	TouchEnded: Event<Instance>;

	Clone(): Instance;
	Destroy(): void;
	Delete(): void;
	GetParent(): Instance | undefined;
	SetParent(newParent: Instance | undefined): void;
	IsA(className: ClassName): boolean;
	IsDescendantOf(other: Instance): boolean;
	FindChild(name: string): Instance | undefined;
	FindChildByClass(className: ClassName): Instance | undefined;
	GetChildren(): Instance[];
	GetChildrenOfClass(className: ClassName): Instance[];
	GetBounds(): Bounds;

	CanReparent: boolean;
	ClassName: ClassName;
	Item: Instance;
	Name: string;
	Parent: Instance | undefined;
	Shared: any;
	ClientSpawned: boolean;

	static New(className: string, parent: Instance | undefined): Instance;
}

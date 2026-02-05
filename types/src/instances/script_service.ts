import type { BaseScript } from "./inline/base_script";
import type { Instance } from "./instance";
import type { ModuleScript } from "./module_script";

export declare class ScriptService extends Instance {
	LuaSpawn(func: any): void;
	LuaRequire(moduleScript: ModuleScript, script: BaseScript): any;
	LuaPrint(message: string, error: boolean | undefined): void;
}

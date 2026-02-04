import type { Instance } from "../instance";

export declare class BaseScript extends Instance {}

// "..."
raw_prefix(`declare class BaseScript
    function Call(self, name: string, ...: any): ()
end`);

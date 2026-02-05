raw_suffix(`
declare game: Game
declare script: BaseScript
declare Achievements: Achievements
declare Chat: Chat
declare CoreUI: CoreUI
declare Datastore: Datastore
declare Http: Http
declare Input: Input
declare Insert: Insert
declare json: Json
declare Tween: Tween
`);

export declare function wait(n: number | undefined): number;
export declare function spawn(callback: (dt: number, gt: number) => void): void;

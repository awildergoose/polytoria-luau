export declare class Json {
	static isNull(jsonString: string): boolean;
	static null(): string;
	static parse(jsonString: string): any;
	static serialize(json: any): string;
}

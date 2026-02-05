export declare class Json {
	isNull(jsonString: string): boolean;
	null(): string;
	parse(jsonString: string): any;
	serialize(json: any): string;
}

export declare class Http {
	static Get(
		url: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	static Post(
		url: string,
		body: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	static Put(
		url: string,
		body: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	static Delete(
		url: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	static Patch(
		url: string,
		body: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
}

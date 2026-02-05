export declare class Http {
	Get(
		url: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	Post(
		url: string,
		body: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	Put(
		url: string,
		body: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	Delete(
		url: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
	Patch(
		url: string,
		body: string,
		callback:
			| ((data: any, error: boolean, message: string | undefined) => void)
			| undefined,
		headers: any
	): void;
}

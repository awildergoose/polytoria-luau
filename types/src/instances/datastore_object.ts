export declare class DatastoreObject {
	Loaded: Event<void>;

	Get(
		key: string,
		callback: (
			value: any,
			success: boolean,
			error: string | undefined
		) => void
	): void;
	Set(
		key: string,
		value: any,
		callback:
			| ((success: boolean, error: string | undefined) => void)
			| undefined
	): void;
	Remove(
		key: string,
		callback:
			| ((success: boolean, error: string | undefined) => void)
			| undefined
	): void;

	Key: string;
	Loading: boolean;
}

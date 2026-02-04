declare global {
	// TODO: auto-generate this
	type ClassName = string;
	// internal
	type Tuple<A extends any | void = any, B extends any | void = any> = {};

	type Event<T extends any[] | void = any[]> = {
		Connect(
			self: Event<T>,
			callback: T extends any[] ? (...args: T) => void : () => void
		): void;
		Disconnect(
			self: Event<T>,
			callback: T extends any[] ? (...args: T) => void : () => void
		): void;
	};

	/**
	 * Emits luau code to the start of the file
	 * @param code The code to emit
	 */
	function raw_prefix(code: string): void;
	/**
	 * Emits luau code to the end of the file
	 * @param code The code to emit
	 */
	function raw_suffix(code: string): void;
}

export {};

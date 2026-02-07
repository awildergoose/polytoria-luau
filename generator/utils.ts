import type { IRType } from "./ir";

export function sortTypesInDependencyOrder(types: IRType[]) {
	const map = new Map<string, IRType>(types.map((t) => [t.Name, t]));

	const adj = new Map<string, string[]>();
	for (const t of types) adj.set(t.Name, []);
	for (const t of types) {
		const rawBase = t.BaseType;
		if (!rawBase) continue;
		if (map.has(rawBase)) {
			adj.get(rawBase)!.push(t.Name);
		}
	}

	const indegree = new Map<string, number>();
	for (const name of map.keys()) indegree.set(name, 0);
	for (const [, neigh] of adj.entries()) {
		for (const v of neigh) indegree.set(v, (indegree.get(v) ?? 0) + 1);
	}

	const queue: string[] = [];
	for (const [name, d] of indegree.entries()) if (d === 0) queue.push(name);

	const orderedNames: string[] = [];
	while (queue.length) {
		const n = queue.shift()!;
		orderedNames.push(n);
		for (const m of adj.get(n) ?? []) {
			indegree.set(m, indegree.get(m)! - 1);
			if (indegree.get(m) === 0) queue.push(m);
		}
	}

	if (orderedNames.length !== types.length) {
		const remaining = types
			.map((t) => t.Name)
			.filter((n) => !orderedNames.includes(n));
		console.warn(
			`sort incomplete: ${remaining.length} remaining`,
			remaining
		);
		orderedNames.push(...remaining);
	}

	return orderedNames.map((n) => map.get(n)!);
}

export function getAllDerivedClasses(
	base: string,
	childrenByBase: Map<string, Set<string>>
): Set<string> {
	const result = new Set<string>();

	function visit(name: string) {
		const children = childrenByBase.get(name);
		if (!children) return;

		for (const child of children) {
			if (result.has(child)) continue;
			result.add(child);
			visit(child);
		}
	}

	visit(base);
	return result;
}

/**
 * Deeply clone the given value
 * @param value
 */
export function cloneDeep<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}

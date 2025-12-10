/**
 * Checks if the given value is an object and makes sure it's defined.
 *
 * @param x The value to check
 */
export var isObject = (x: any) => typeof x === 'object' && !Array.isArray(x) && x !== null;

/**
 * Returns the first key of the given folder object.
 *
 * @param obj The object to check
 */
export var getFolderName = (obj: Record<string, any>): string => obj && Object.keys(obj)[0];

/**
 * Returns the first value of the given folder object.
 *
 * @param obj The object to check
 */
export var getContent = (obj: Record<string, any>): any => obj && Object.values(obj)[0];

/**
 * Returns the key of the input value in the object.
 *
 * @param object The object to find the key in
 * @param value The value to return the key of
 */
export function getKeyByValue(object: Record<any, any>, value: any) {
	return Object.keys(object).find((key) => object[key] === value);
}

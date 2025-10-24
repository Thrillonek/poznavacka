/**
 * Checks if the given value is an object and makes sure it's defined.
 *
 * @param x The value to check
 */
export var isObject = (x: any) => typeof x === 'object' && !Array.isArray(x) && x !== null;

/**
 * Returns the first key of the given object.
 *
 * @param obj The object to check
 */
export var objFirstKey = (obj: Object) => obj && Object.keys(obj)[0];

/**
 * Returns the first value of the given object.
 *
 * @param obj The object to check
 */
export var objFirstValue = (obj: Object) => obj && Object.values(obj)[0];

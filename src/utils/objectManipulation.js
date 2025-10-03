export var isObject = (x) => typeof x === 'object' && !Array.isArray(x) && x !== null;
export var objFirstKey = (obj) => obj && Object.keys(obj)[0];
export var objFirstValue = (obj) => obj && Object.values(obj)[0];

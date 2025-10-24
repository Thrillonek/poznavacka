/**
 * Returns a new string with the first character of the input string
 * capitalized. Does not modify the original string.
 * @param inputString - The string to capitalize.
 */
export function capitalize(inputString: string) {
	return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

/**
 * Returns a human-readable version of the file name from the given path.
 *
 * It finds the file in the path, removes its extension, removes all
 * non-alphabetic characters and replaces the first letter.
 * It also creates spaces around a hyphen if there is one present.
 *
 * @param pathString - The path string to process.
 */
export function nameFromPath(pathString: string) {
	let arr = pathString.split('/');
	pathString = arr[arr.length - 1];
	pathString = pathString
		.substring(0, pathString.lastIndexOf('.'))
		.replaceAll(/[0-9+_]/g, '')
		.replace('-', ' - ');
	return capitalize(pathString);
}

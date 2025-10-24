export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function nameFromPath(pathString) {
	let arr = pathString.split('/');
	pathString = arr[arr.length - 1];
	pathString = pathString
		.substring(0, pathString.lastIndexOf('.'))
		.replaceAll(/[0-9+_]/g, '')
		.replace('-', ' - ');
	return capitalize(pathString);
}

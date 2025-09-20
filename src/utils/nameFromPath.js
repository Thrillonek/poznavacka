export function nameFromPath(str) {
	let arr = str.split('/');
	str = arr[arr.length - 1];
	str = str
		.substring(0, str.lastIndexOf('.'))
		.replaceAll(/[0-9+_]/g, '')
		.replace('-', ' - ');
	return str.charAt(0).toUpperCase() + str.slice(1);
}

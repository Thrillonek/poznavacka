export function slugify(str: string) {
	const specialChars = {
		a: /á/,
		c: /č/,
		d: /ď/,
		e: /é|ě/,
		i: /í/,
		n: /ň/,
		o: /ó/,
		r: /ř/,
		s: /š/,
		t: /ť/,
		u: /ú|ů/,
		z: /ž/,
	};

	let newstr = str.toLowerCase().trim();

	for (const [replacement, regex] of Object.entries(specialChars)) {
		newstr = newstr.replaceAll(new RegExp(regex, 'g'), replacement);
	}

	return newstr;
}

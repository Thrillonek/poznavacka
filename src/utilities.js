let dir = __DIR__;

function nameFromPath(str) {
	let arr = str.split('/');
	str = arr[arr.length - 1];
	str = str
		.substring(0, str.lastIndexOf('.'))
		.replaceAll(/[0-9+_]/g, '')
		.replace('-', ' - ');
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var isObject = (x) => typeof x === 'object' && !Array.isArray(x) && x !== null;

var settings = { keybinds: { change: 'ArrowUp', reveal: 'ArrowDown', complete: 'ArrowRight' }, quiz: { mode: 'custom', random: true, min: 1, max: 10, presets: [], complete: [] } };

const categories = {
	1: 'Houby',
	3: 'Kapraďorosty',
	5: 'Leknínovité',
	7: 'Pryskyřníkovité',
	16: 'Podražcovité',
	18: 'Mákovité',
	31: 'Violkovité',
	34: 'Hvozdíkovité',
	39: 'Rdesnovité',
	41: 'Kopřivovité',
	42: 'Konopovité',
	43: 'Tlusticovité',
	45: 'Lomikamenovité',
	46: 'Meruzalkovité',
	47: 'Růžovité',
	64: 'Bobovité',
	71: 'Šťavelovité',
	72: 'Kakostovité',
	74: 'Lnovité',
	75: 'Pryšcovité',
	76: 'Slézovité',
	77: 'Vrabečnicovité',
	79: 'Miříkovité',
	83: 'Prvosenkovité',
	85: 'Vřesovcovité',
	88: 'Hořcovité',
	89: 'Vachtovité',
	90: 'Toješťovité',
	91: 'Brutnákovité',
	95: 'Hluchavkovité',
	102: 'Lilkovité',
	108: 'Krtičníkovité',
	116: 'Zárazovité',
	117: 'Jitrocelovité',
	119: 'Mořenovité',
	120: 'Kozlíkovité',
	121: 'Štětkovité',
	122: 'Zvonkovité',
	124: 'Hvězdnicovité',
	136: 'Liliovité',
	141: 'Amarylkovité',
	143: 'Kosatcovité',
	145: 'Vstavačovité',
	149: 'Puškvorcovité',
	150: 'Pupalkovité',
};

const orderNames = {
	0: 'Jepice',
	2: 'Vážky',
	10: 'Pošvatky',
	11: 'Švábi',
	16: 'Škvoři',
	18: 'Všekazi/termiti',
	20: 'Kudlanky',
	24: 'strašilky',
	27: 'rovnokřídlí',
	38: 'Pisivky ',
	41: 'všenky',
	44: 'vši',
	49: 'Třásnokřídlí ',
	51: 'Křísi',
	56: 'Mery',
	57: 'Mšice',
	63: 'Červci',
	65: 'Molice',
	69: 'Ploštice',
	85: 'Síťokřídlí ',
	91: 'Chrostíci',
	95: 'Blechy',
	96: 'Brouci ',
	152: 'Dvoukřídlí',
	169: 'Blanokřídlí',
	199: 'Motýli',
};

function calculateOrderName(idx, set) {
	while (set[idx] == undefined) {
		idx--;
		if (idx < 0) break;
	}
	return set[idx];
}

export { calculateOrderName, categories, dir, isObject, nameFromPath, orderNames, settings };

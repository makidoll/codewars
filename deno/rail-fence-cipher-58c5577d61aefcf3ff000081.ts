function posToRail(position: number, numberRails: number) {
	if (numberRails <= 1) return 0;
	var railOffset = position % (numberRails * 2 - 2);
	return railOffset >= numberRails
		? numberRails - (railOffset - numberRails) - 2
		: railOffset;
}

function encodeRailFenceCipher(string: string, numberRails: number) {
	const rails: string[] = new Array(numberRails).fill("");
	for (let i = 0; i < string.length; i++) {
		rails[posToRail(i, numberRails)] += string[i];
	}
	return rails.join("");
}

function decodeRailFenceCipher(string: string, numberRails: number) {
	const rails: number[][] = new Array(numberRails).fill(null).map(() => []);
	for (let i = 0; i < string.length; i++) {
		rails[posToRail(i, numberRails)].push(i);
	}
	const charMap = [].concat(...(rails as any)); // flatten
	let output = new Array(string.length).fill(" ");
	for (let i = 0; i < string.length; i++) {
		output[charMap[i]] = string[i];
	}
	return output.join("");
}

console.log(
	encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3),
	"WECRLTEERDSOEEFEAOCAIVDEN",
	encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3) ==
		"WECRLTEERDSOEEFEAOCAIVDEN",
);

console.log(
	decodeRailFenceCipher("WECRLTEERDSOEEFEAOCAIVDEN", 3),
	"WEAREDISCOVEREDFLEEATONCE",
	decodeRailFenceCipher("WECRLTEERDSOEEFEAOCAIVDEN", 3) ==
		"WEAREDISCOVEREDFLEEATONCE",
);

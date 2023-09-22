// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)

type Freqs = [string, number][];

function frequencies(s: string): Freqs {
	const dict: { [char: string]: number } = {};
	const chars = s.split("");

	for (const char of chars) {
		if (dict[char] == null) {
			dict[char] = 1;
		} else {
			dict[char]++;
		}
	}

	return Object.entries(dict);
}

// takes: [ [String,Int] ], String; returns: String (with "0" and "1")

type Bit = 0 | 1; // left | right

interface HuffNode {
	left?: HuffNode;
	right?: HuffNode;
	parent?: HuffNode;
	parentSide?: Bit;
	char?: string;
	freq: number;
}

function freqsToNodes(freqs: Freqs): {
	charNodes: HuffNode[];
	rootNode: HuffNode;
} {
	const charNodes: HuffNode[] = freqs.map(([char, freq]) => ({ char, freq }));

	// new array but keep references
	let topLevelNodes = new Array(charNodes.length)
		.fill(null)
		.map((_, i) => charNodes[i]);

	while (true) {
		if (topLevelNodes.length == 1) break;

		let lowestA: HuffNode = { freq: Infinity };
		let lowestB: HuffNode = { freq: Infinity };

		for (const node of topLevelNodes) {
			if (node.freq < lowestA.freq) {
				lowestA = node;
			}
		}

		for (const node of topLevelNodes) {
			if (node.freq < lowestB.freq && node != lowestA) {
				lowestB = node;
			}
		}

		lowestA.parentSide = 0;
		lowestB.parentSide = 1;

		const newNode: HuffNode = {
			left: lowestA,
			right: lowestB,
			freq: lowestA.freq + lowestB.freq,
		};

		lowestA.parent = newNode;
		lowestB.parent = newNode;

		topLevelNodes.splice(topLevelNodes.indexOf(lowestA), 1);
		topLevelNodes.splice(topLevelNodes.indexOf(lowestB), 1);
		topLevelNodes.push(newNode);
	}

	const rootNode = topLevelNodes[0];

	return { charNodes, rootNode };
}

function encode(freqs: Freqs, s: string) {
	if (freqs.length <= 1) return null;

	const { charNodes } = freqsToNodes(freqs);

	let out = "";

	const chars = s.split("");

	for (const char of chars) {
		let seq: string[] = [];

		let currentNode: HuffNode | undefined = charNodes.find(
			n => n.char == char,
		);

		if (currentNode == null) {
			throw new Error("Node with char not found");
		}

		while (currentNode.parent != null) {
			seq.push(String(currentNode.parentSide));
			currentNode = currentNode?.parent;
		}

		out += seq.reverse().join("");
	}

	return out;
}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String

function decode(freqs: Freqs, bits: string) {
	if (freqs.length <= 1) return null;

	const { rootNode } = freqsToNodes(freqs);

	let out = "";

	let currentNode: HuffNode | undefined = rootNode;

	for (const bit of bits) {
		currentNode = bit == "0" ? currentNode?.left : currentNode?.right;

		if (currentNode?.char == null) {
			continue;
		}

		out += currentNode.char;

		currentNode = rootNode;
	}

	return out;
}

// examples tests

const s =
	"such a cute squirrel! oh my goodness i love her so damn much. aah gosh!! yay i love squirrels so much. they're so cute aah. mwuah!";

const fs = frequencies(s);
const enc = encode(fs, s);
console.log(enc);
console.log(decode(fs, enc as any));

// error handling

// console.log(encode([], ""));
// console.log(decode([], ""));
// console.log(encode([["a", 1]], ""));
// console.log(decode([["a", 1]], ""));

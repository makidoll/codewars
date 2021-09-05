class Boolfuck {
	constructor(public code: string, public input: string = "") {}

	// converter functions

	charToLittleEndian = (char: string) =>
		Array.from(
			Array.from(char.charCodeAt(0).toString(2))
				.reverse()
				.join("")
				.padEnd(8, "0"),
		).map(bit => (bit == "0" ? false : true));

	littleEndianToString = (arr: boolean[]) =>
		arr.length == 0
			? ""
			: (
					(arr
						.map(bit => (bit ? "1" : "0"))
						.join("")
						.match(/.{1,8}/g) as string[]) || []
			  )
					.map(char =>
						Array.from(char.padEnd(8, "0")).reverse().join(""),
					)
					.map(char => String.fromCharCode(parseInt(char, 2)))
					.join("");

	// cells

	cellPointer = 0;
	cells: { [loc: number]: boolean } = {};
	getCell = (loc: number) => this.cells[loc] || false;
	setCell = (loc: number, value: boolean) => (this.cells[loc] = value);
	flipCell = (loc: number) => this.setCell(loc, !this.getCell(loc));

	// input

	inputPointer = 0;
	inputArr =
		// @ts-ignore
		this.input.length == 0
			? []
			: // @ts-ignore
			  Array.from(this.input)
					.map(this.charToLittleEndian)
					.reduce((a, b) => [...a, ...b]);

	getNextInput() {
		if (this.inputPointer >= this.inputArr.length) return false;

		const bit = this.inputArr[this.inputPointer];
		this.inputPointer++;
		return bit;
	}

	// code

	codePointer = 0;
	getCodeChar(loc: number) {
		if (loc >= this.code.length || loc < 0) return null;
		return this.code[loc] as string;
	}

	// brackets

	findClosingBracket(loc: number) {
		let pointer = loc;
		let openBracketsFound = 0;

		let char: string | null;
		while ((char = this.getCodeChar(pointer)) != null) {
			if (char == "[") openBracketsFound++;
			if (char == "]") {
				if (openBracketsFound != 0) {
					openBracketsFound--;
				} else {
					return pointer;
				}
			}
			pointer++;
		}

		throw new Error("Could not find closing bracket");
	}

	bracketPointerStack: number[] = [];
	openBracket() {
		if (this.getCell(this.cellPointer) == false) {
			// jump to matching close bracket
			this.codePointer = this.findClosingBracket(this.codePointer + 1);
		} else {
			// push and continue
			this.bracketPointerStack.push(this.codePointer);
		}
	}
	closeBracket() {
		if (this.getCell(this.cellPointer) == true) {
			// jump back to match opening bracket
			this.codePointer =
				this.bracketPointerStack[this.bracketPointerStack.length - 1];
		} else {
			// pop and continue
			this.bracketPointerStack.pop();
		}
	}

	parse() {
		let output: boolean[] = [];

		let char: string | null;
		while ((char = this.getCodeChar(this.codePointer)) != null) {
			switch (char) {
				case "+": // flip
					this.flipCell(this.cellPointer);
					break;
				case ",": // input to cell
					this.setCell(this.cellPointer, this.getNextInput());
					break;
				case ";": // output cell
					output.push(this.getCell(this.cellPointer));
					break;
				case "<":
					this.cellPointer--;
					break;
				case ">":
					this.cellPointer++;
					break;
				case "[":
					this.openBracket();
					break;
				case "]":
					this.closeBracket();
					break;
			}

			this.codePointer++;
		}

		return this.littleEndianToString(output);
	}
}

export function boolfuck(code: string, input: string = ""): string {
	return new Boolfuck(code, input).parse();
}

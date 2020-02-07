export function interpreter(
	code: string,
	iterations: number,
	width: number,
	height: number,
): string {
	let grid = new Array(height)
		.fill(null)
		.map(() => new Array(width).fill(null).map(() => 0));

	let gridPtr = { x: 0, y: 0 };

	const gridMovePtr = (dir: "n" | "e" | "s" | "w") => {
		if (dir == "n") gridPtr.y--;
		if (dir == "e") gridPtr.x++;
		if (dir == "s") gridPtr.y++;
		if (dir == "w") gridPtr.x--;

		if (gridPtr.x < 0) gridPtr.x = width - 1;
		if (gridPtr.x > width - 1) gridPtr.x = 0;

		if (gridPtr.y < 0) gridPtr.y = height - 1;
		if (gridPtr.y > height - 1) gridPtr.y = 0;
	};

	const gridFlip = () => {
		const c = grid[gridPtr.y][gridPtr.x];
		grid[gridPtr.y][gridPtr.x] = c == 0 ? 1 : 0;
	};

	const gridGetCurrent = (): 0 | 1 => {
		return grid[gridPtr.y][gridPtr.x] as 0 | 1;
	};

	let codePtr = 0;
	let bracketPtrStack: number[] = [];

	const findClosingBracket = (startPtr: number) => {
		for (let ptr = startPtr; ptr < code.length; ptr++) {
			const char = code[ptr];
			if (char == "]") return ptr;
		}

		throw new SyntaxError(
			"Syntax error! No closing bracking found from " + startPtr,
		);
	};

	const bracketOpen = () => {
		if (gridGetCurrent() == 0) {
			// jump past matching closing bracket
			codePtr = findClosingBracket(codePtr);
		} else {
			// push and continue
			bracketPtrStack.push(codePtr);
		}
	};

	const bracketClose = () => {
		if (gridGetCurrent() == 1) {
			// jump back to matching opening bracket
			codePtr = bracketPtrStack[bracketPtrStack.length - 1];
		} else {
			// pop and continue
			bracketPtrStack.pop();
		}
	};

	let iteration = 0;

	while (iteration < iterations) {
		if (codePtr > code.length - 1) break;
		const char = code[codePtr];

		// invalid char
		if (/[nesw*\[\]]/.test(char) == false) {
			codePtr++;
			continue;
		}

		if (/[nesw]/.test(char)) gridMovePtr(char as any);
		if (/\*/.test(char)) gridFlip();
		if (/\[/.test(char)) bracketOpen();
		if (/\]/.test(char)) bracketClose();
		codePtr++;

		iteration++;
	}

	return grid.map(line => line.join("")).join("\r\n");
}

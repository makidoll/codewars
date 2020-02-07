const snail = (numbersArr: number[][]) => {
	const numbers: number[] = [].concat.apply([], numbersArr);

	let size = 0;
	while (size * size < numbers.length) {
		size++;
	}

	const result: number[] = [];

	const trailMap = {};
	const leaveTrail = (x: number, y: number) => (trailMap[x + "," + y] = true);
	const checkTrail = (x: number, y: number) => {
		if (x < 0 || x > size - 1 || y < 0 || y > size - 1) return true;
		return trailMap[x + "," + y] ? true : false;
	};

	let x = -1;
	let y = 0;
	let dir: "n" | "e" | "s" | "w" = "e";

	for (let i = 0; i < size * size; i++) {
		if (dir == "e") {
			x++;
			if (checkTrail(x + 1, y)) dir = "s";
		} else if (dir == "s") {
			y++;
			if (checkTrail(x, y + 1)) dir = "w";
		} else if (dir == "w") {
			x--;
			if (checkTrail(x - 1, y)) dir = "n";
		} else if (dir == "n") {
			y--;
			if (checkTrail(x, y - 1)) dir = "e";
		}

		// contrain x y
		x = x < 0 ? 0 : x > size - 1 ? size - 1 : x;
		y = y < 0 ? 0 : y > size - 1 ? size - 1 : y;
		if (checkTrail(x, y)) throw Error("Already stepped on " + x + "," + y);

		const current = numbers[x + y * size];
		leaveTrail(x, y);

		result.push(current);
	}

	return result;
};

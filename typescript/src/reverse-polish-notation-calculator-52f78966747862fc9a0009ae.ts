function calc(expr: string) {
	if (expr.trim() == "") return 0;

	let stack: number[] = [];

	for (const char of expr.split(" ")) {
		const n = parseFloat(char);

		if (Number.isNaN(n)) {
			// operator

			if (!"+*-/".includes(char))
				throw new Error("Unknown character: " + char);
			if (stack.length < 2)
				throw new Error("Not enough in stack to operate: " + char);

			const b = stack.pop();
			const a = stack.pop();

			if (char == "+") {
				stack.push(a + b);
			} else if (char == "*") {
				stack.push(a * b);
			} else if (char == "-") {
				stack.push(a - b);
			} else if (char == "/") {
				stack.push(a / b);
			}
		} else {
			// number
			stack.push(n);
		}
	}

	if (stack.length > 1)
		throw new Error("Incomplete expression left with: " + stack.join(" "));

	return stack[0];
}

console.log(calc(""), 0);
console.log(calc("3"), 3);
console.log(calc("3.5"), 3.5);
console.log(calc("1 3 +"), 4);
console.log(calc("1 3 *"), 3);
console.log(calc("1 3 -"), -2);
console.log(calc("4 2 /"), 2);
console.log(calc("5 1 2 + 4 * + 3 -"), 14);

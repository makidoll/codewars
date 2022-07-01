export const pigIt = (input: string): string =>
	input
		.split(" ")
		.map(word =>
			/[a-z]/i.test(word)
				? word.slice(1) + word.slice(0, 1) + "ay"
				: word,
		)
		.join(" ");

console.log(pigIt("Pig latin is cool")); // igPay atinlay siay oolcay
console.log(pigIt("Hello world !")); // elloHay orldway !

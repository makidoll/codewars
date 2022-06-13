export function findUniq(words: string[]) {
	const dictionary: { [char: string]: number } = {};
	for (const word of words) {
		for (const char of word.split("")) {
			if (!dictionary[char]) dictionary[char] = 1;
			else dictionary[char]++;
		}
	}

	const wordScoreList = words
		.filter(word => word != "")
		.map(word => {
			let commonScore = 0;
			for (const char of word.split("")) {
				commonScore += dictionary[char];
			}
			// commonScore /= word.length;
			return { word, commonScore };
		})
		.sort((a, b) => a.commonScore - b.commonScore);

	return wordScoreList[0].word;
}

console.log(
	findUniq(["Aa", "aaa", "aaaaa", "BbBb", "Aaaa", "AaAaAa", "a"]),
	"BbBb",
);
console.log(findUniq(["abc", "acb", "bac", "foo", "bca", "cab", "cba"]), "foo");
console.log(findUniq(["silvia", "vasili", "victor"]), "victor");
console.log(
	findUniq(["Tom Marvolo Riddle", "I am Lord Voldemort", "Harry Potter"]),
	"Harry Potter",
);
console.log(findUniq(["    ", "a", " "]), "a");

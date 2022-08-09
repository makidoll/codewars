export class G964 {
	public static mix = (s1: string, s2: string) => {
		type LetterMap = {
			letter: string;
			length: number;
			from: 0 | 1 | 2; // 2 is equal
		}[];

		const letterMap = [s1, s2]
			// array with 2 arrays of type LetterMap, only from: 0 | 1
			.map((string, i) =>
				string
					.match(/[a-z]/g)
					.reduce((map: LetterMap, letter) => {
						for (const current of map) {
							if (current.letter == letter) {
								current.length++;
								return map;
							}
						}

						map.push({ letter, length: 1, from: i as 0 | 1 });
						return map;
					}, [])
					.filter(letter => letter.length > 1),
			)
			// concatenated together
			.reduce((a, b) => {
				return [...a, ...b];
			})
			// merge letters together and find max length which will set "from"
			.reduce((map: LetterMap, newLetter) => {
				for (const letter of map) {
					if (letter.letter == newLetter.letter) {
						// see if length is equal
						if (letter.length == newLetter.length) {
							letter.from = 2;
							return map;
						}

						// or which is bigger
						const maxLength = Math.max(
							letter.length,
							newLetter.length,
						);

						if (letter.length == maxLength) return map;
						if (newLetter.length == maxLength) {
							letter.length = newLetter.length;
							letter.from = newLetter.from;
							return map;
						}
					}
				}

				map.push(newLetter);
				return map;
			}, [])
			// sort alphabetically
			.sort((a, b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))
			// sort from 1, 2 or equal
			.sort((a, b) => a.from - b.from)
			// sort by letter length
			.sort((a, b) => b.length - a.length);

		let results = [];

		for (const letter of letterMap) {
			results.push(
				(letter.from == 2 ? "=" : letter.from + 1) +
					":" +
					letter.letter.repeat(letter.length),
			);
		}

		return results.join("/");
	};
}

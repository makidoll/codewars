export function sumOfIntervals(intervals: [number, number][]) {
	const numberWithin = (n: number, start: number, end: number) =>
		n >= start && n <= end;

	const findOverlaps = (
		queryInterval: [number, number],
		existingOverlaps?: [number, number][],
	) => {
		let overlaps = existingOverlaps || [queryInterval];

		const queryStart = queryInterval[0];
		const queryEnd = queryInterval[1];

		for (const interval of intervals) {
			if (interval == queryInterval) continue;

			const start = interval[0];
			const end = interval[1];

			if (
				numberWithin(start, queryStart, queryEnd) ||
				numberWithin(end, queryStart, queryEnd) ||
				numberWithin(queryStart, start, end) ||
				numberWithin(queryEnd, start, end)
			) {
				if (!overlaps.includes(interval)) {
					overlaps.push(interval);
					overlaps = findOverlaps(interval, overlaps);
				}
			}
		}

		return overlaps;
	};

	const overlapsToMinMax = (
		overlaps: [number, number][],
	): [number, number] => {
		let min = overlaps[0][0];
		let max = overlaps[0][1];

		for (const interval of overlaps) {
			if (Math.min(interval[0]) < min) min = interval[0];
			if (Math.min(interval[1]) > max) max = interval[1];
		}

		return [min, max];
	};

	const numberNumberArrayIncludes = (
		arr: [number, number][],
		queryNumberNumber: [number, number],
	) => {
		for (const numberNumber of arr) {
			if (
				numberNumber[0] == queryNumberNumber[0] &&
				numberNumber[1] == queryNumberNumber[1]
			)
				return true;
		}
		return false;
	};

	const foundOverlappingMinMax = [];

	for (const interval of intervals) {
		const overlaps = findOverlaps(interval);
		const minMax = overlapsToMinMax(overlaps);

		if (!numberNumberArrayIncludes(foundOverlappingMinMax, minMax))
			foundOverlappingMinMax.push(minMax);
	}

	return foundOverlappingMinMax
		.map(minMax => minMax[1] - minMax[0])
		.reduce((a, b) => a + b);
}

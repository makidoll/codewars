const int32ToIp = (int32: number) =>
	int32
		.toString(16)
		.padStart(8, "0")
		.slice(-8)
		.match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/)
		.slice(1, 5)
		.map(hex => parseInt(hex, 16))
		.join(".");

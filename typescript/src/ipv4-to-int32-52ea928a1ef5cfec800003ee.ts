const ipToInt32 = (ip: string) =>
	parseInt(
		ip
			.split(".")
			.map(n => parseInt(n).toString(2).padStart(8, "0"))
			.join(""),
		2,
	);

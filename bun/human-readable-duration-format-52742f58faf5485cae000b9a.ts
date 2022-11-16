const plural = (n: number, singular: string, plural?: string) =>
	n + " " + (n == 1 ? singular : plural ?? singular + "s");

function formatDuration(seconds: number) {
	if (seconds == 0) return "now";

	let current = seconds;
	const s = Math.floor(current % 60);
	const m = Math.floor((current /= 60) % 60);
	const h = Math.floor((current /= 60) % 24);
	const d = Math.floor((current /= 24) % 365);
	const y = Math.floor((current /= 365));

	let out: string[] = [];
	if (y != 0) out.push(plural(y, "year"));
	if (d != 0) out.push(plural(d, "day"));
	if (h != 0) out.push(plural(h, "hour"));
	if (m != 0) out.push(plural(m, "minute"));
	if (s != 0) out.push(plural(s, "second"));

	if (out.length == 1) return out[0];

	const last = out.pop();
	return out.join(", ") + " and " + last;
}

console.log(formatDuration(1), "\n1 second");
console.log(formatDuration(62), "\n1 minute and 2 seconds");
console.log(formatDuration(120), "\n2 minutes");
console.log(formatDuration(3600), "\n1 hour");
console.log(formatDuration(3662), "\n1 hour, 1 minute and 2 seconds");
console.log(
	formatDuration(15731080),
	"\n182 days, 1 hour, 44 minutes and 40 seconds",
);
// console.log(formatDuration(36621132), "???");
// console.log(formatDuration(366211322), "???");

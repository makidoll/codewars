type Color = number[];

export class Potion {
	constructor(public readonly color: Color, public readonly volume: number) {}

	mix(potion: Potion): Potion {
		const totalVolume = this.volume + potion.volume;

		const multiply = (a: Color, b: number): Color => a.map(v => v * b);
		const add = (a: Color, b: Color): Color => a.map((v, i) => v + b[i]);
		const divide = (a: Color, b: number): Color => a.map(v => v / b);

		const newColor = divide(
			add(
				multiply(this.color, this.volume),
				multiply(potion.color, potion.volume),
			),
			totalVolume,
		).map(c => Math.ceil(c));

		return new Potion(newColor, totalVolume);
	}
}

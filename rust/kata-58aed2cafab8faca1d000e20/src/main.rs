fn modified_sum(array: &[i32], power: u32) -> i32 {
	return array.iter().map(|&n| n.pow(power)).sum::<i32>()
		- array.iter().sum::<i32>();
}

fn main() {
	println!("{}", modified_sum(&[1, 2, 3], 3));
}

fn round_to_next_5(n: i32) -> i32 {
	let abs_remain = (n % 5).abs();
	let to_add_on = if n < 0 { abs_remain } else { 5 - abs_remain };
	return if abs_remain > 0 { n + to_add_on } else { n };
}

fn main() {
	println!("0  {}", round_to_next_5(0));
	println!("5  {}", round_to_next_5(2));
	println!("5  {}", round_to_next_5(3));
	println!("15 {}", round_to_next_5(12));
	println!("25 {}", round_to_next_5(21));
	println!("30 {}", round_to_next_5(30));
	println!("0  {}", round_to_next_5(-2));
	println!("-5 {}", round_to_next_5(-5));
}

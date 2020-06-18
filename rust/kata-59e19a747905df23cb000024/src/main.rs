use regex::Regex;
use std::collections::HashMap;

fn string_letter_count(s: &str) -> String {
	let re = Regex::new(r"(?i)[a-z]").unwrap();
	let mut map: HashMap<String, i32> = HashMap::new();

	for (_i, found) in re.find_iter(s).enumerate() {
		let letter = found.as_str().to_lowercase();
		match map.get(&letter).cloned() {
			None => map.insert(letter, 1),
			Some(amount) => map.insert(letter, amount + 1),
		};
	}

	let mut sorted: Vec<_> = map.into_iter().collect();
	sorted.sort_by(|a, b| a.0.cmp(&b.0));

	let mut output = String::new();
	for (letter, amount) in sorted {
		output.push_str(format!("{}{}", amount, letter).as_str())
	}

	return output;
}

fn main() {
	println!("{}", string_letter_count("This is a test sentence."));
}

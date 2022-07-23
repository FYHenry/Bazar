use std::string::String;
fn tbl_str(tbl: &[u8]) -> String {
  let l = tbl.len();
  let mut out = String::new();
  out.push_str("[");
  let rg = 0..l;
  for i in rg {
    if i != l-1 {
      out = out + &format!("{},", i);
    }
    else {
      out += &format!("{}", i);
    }
  }
  out = format!("{}]", out);
  return out;
}
fn main() {
  println!("DEBUT!");
  let tbl = [0, 1, 2];
  println!("{}", tbl_str(&tbl));
  println!("FIN");
}

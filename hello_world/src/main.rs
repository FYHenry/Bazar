//!Fichier principal.
///Fonction pricipale.
fn main()
{
  println!("Hello, world!");
  let x = 5 + 90 + 5;
  println!("Is `x` 10 or 100?\nx = {}", x);
  println!("{} of {:b} people know binary, the other half doesn't", 1, 2);
  println!("My name is {0}, {1} {0}.", "Bond", "James");
  ///Un complexe.
  #[derive(Debug)]
  struct Complex
  {
    real: f64,
    image: f64
  }
  impl std::fmt::Display for Complex
  {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result
    {
      write!(f, "{0} + {1}i", self.real, self.image)
    }
  }
  println!("Display: {0}", Complex{real: 3.3, image: 7.2});
  println!("Debug: {:?}", Complex{real: 3.3, image: 7.2});
}

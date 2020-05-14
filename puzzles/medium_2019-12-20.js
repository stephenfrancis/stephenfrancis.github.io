

/*
Largest palindrome product

Problem 4
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.
*/

let max_val = 0;

for (let numA = 100; numA < 1000; numA +=1) {
  for (let numB = numA; numB < 1000; numB += 1) {
    const str = String(numA * numB);
    if (str === str.split("").reverse().join("")) {
      const val = numA * numB;
      if (val > max_val) {
        max_val = val;
        console.log(`${numA} * ${numB} = ${str}`);
      }
    }
  }
}

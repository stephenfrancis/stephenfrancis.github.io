
/*
https://brilliant.org/weekly-problems/2018-03-26/intermediate/?p=5


Lynn has a calculator with only two buttons that perform [+1] and [/2].

She also has a screen with  significant figures, and it displays  when she gets the calculator.

If she wants to display  up to the eighth decimal , what is the fewest number of taps she needs to do?

Hint: The first 64 bits of  in binary are given below:

11.00100100001111110110101010001000100001011010001100001000110100

*/



function nextDigit(num, array, clicks) {
  const last_char = array.pop();
  if (last_char === "." || !last_char) {
    console.log(num.toFixed(8) + "  clicks:  " + clicks);
    return;
  } else if (last_char === "1") {
    num += 1;
    clicks += 1;
  }
  nextDigit(num / 2, array, clicks += 1);
}


nextDigit(0, ("11.0010010000111111011010101").split(""), 0);

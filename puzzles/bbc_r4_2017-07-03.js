
/*

http://www.bbc.co.uk/programmes/articles/5wkxjTtqRvq8Cyrrjxtk7tc/puzzle-for-today

Take the digits 1,2,3 up to 9 in numerical order and put either a plus sign or a minus sign or
neither between the digits to make a sum that adds up to 100. For example, one way of achieving
this is: 1 + 2 + 34 - 5 + 67 - 8 + 9 = 100, which uses six plusses and minuses. What is the fewest
number of plusses and minuses you need to do this?

*/


function recurse(input, output, sum) {
  var this_digit;
  if (input.length === 0) {
    if (sum === 100) {
      console.log(output + " = " + sum);
    }
    return;
  }
  this_digit = input.shift();
  recurse(input.slice(0), output + " + " + this_digit, sum + this_digit);
  recurse(input.slice(0), output + " - " + this_digit, sum - this_digit);
  recurse(input.slice(0), output + this_digit, (sum * 10) + this_digit);
}


recurse([2, 3, 4, 5, 6, 7, 8, 9], "1", 1);

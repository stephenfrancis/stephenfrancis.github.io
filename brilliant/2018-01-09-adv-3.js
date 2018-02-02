/*

Starting with a number, the following is called the Collatz rule:

If the number is odd, multiply by 3 and add 1.

If the number is even, divide by 2.

The Collatz conjecture suggests that when you keep doing this, you will always reach 1 eventually.

For example, if you start with 7, you reach  in 16 steps:
However, 7 is not the only number that requires 16 steps. What is the total number of positive integers which require exactly 16 steps to reach 1 for the first time?

Note: This problem is intended to have a coding solution.


*/

function collatzStep(number) {
  if (number % 2 === 0) {
    return number / 2;
  }
  return (number * 3) + 1;
}


function collatzLoop(number, tracker) {
  if (number === 1) {
    console.log(tracker.steps + " steps: " + tracker.str);
    return tracker.steps;
  }
  number = collatzStep(number);
  if (tracker) {
    tracker.steps += 1;
    tracker.str += " -> " + number;
  }
  collatzLoop(number, tracker);
}

function collatz(number) {
  var tracker = {
    steps: 0,
    str: number,
  };
  collatzLoop(number, tracker);
}


function collatzIteration(number) {
  var tracker = {
    number: number,
    steps: 0,
    str: number,
  };
  while (number !== 1 && tracker.steps < 999) {
    if (number % 2 === 0) {
      number /= 2;
    } else {
      number = (number * 3) + 1;
    }
    tracker.steps += 1;
    tracker.str += " -> " + number;
  }
  return tracker.steps;
}


function test() {
  var total = 0;
  for (let i = 0; i < 1000000; i += 1) {
    if (collatzIteration(i) === 16) {
      total += 1;
    }
    if ((i % 100) === 0) {
      console.log("at " + i + " total is " + total);
    }
  }
}

test();

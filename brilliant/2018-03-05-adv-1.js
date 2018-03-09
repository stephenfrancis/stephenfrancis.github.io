
/*
https://brilliant.org/weekly-problems/2018-03-05/advanced/?p=1


You have 2016 sticks of the same length in a box. You pick a stick at random, break it into two
equal halves, and put them back in for a total of 2017 sticks. You repeat this process of random
picking and breaking indefinitely.

What is the maximum value of  such that, at any time during this process, you are guaranteed to
have at least  sticks of the same length?

Define a "stick stack" as the subset of all sticks of the same length.
Stick stack 0 is the set of (initially 2016) sticks of the original length, L.
Stick stack 1 is the set of sticks of length L/2.
etc

*/

var sticks = [ 2016, ];
var min_x = 2016;

function pickAndBreakRandomStick() {
  const stick_stack = pickRandomStick();
  sticks[stick_stack] -= 1;
  if (sticks.length <= (stick_stack + 1)) {
    sticks.push(0);
  }
  sticks[stick_stack + 1] += 2;
}

function pickRandomStick() {
  const total_sticks = sticks.reduce(function(running_total, this_val) {
    return running_total + this_val;
  }, 0);
  const nth_stick = Math.floor(Math.random() * total_sticks);
  let running_total = 0;
  for (let i = 0; i < sticks.length; i += 1) {
    running_total += sticks[i];
    if (running_total >= nth_stick) {
      return i;
    }
  }
  throw new Error("should never reach here");
}

function getX() {
  return sticks.reduce(function(max_so_far, this_val) {
    return Math.max(max_so_far, this_val);
  }, 0);
}

function updateMinX() {
  min_x = Math.min(min_x, getX());
}

function run() {
  var overall_min_x = 99999;
  for (let i = 0; i < 10000; i += 1) {
    specificRun();
    overall_min_x = Math.min(overall_min_x, min_x);
    if (i % 100) {
      console.log(`after ${i} runs: min X: ${min_x} overall min X: ${overall_min_x}`);
    }
  }
}

function specificRun() {
  sticks = [ 2016, ];
  min_x = 2016;
  for (let i = 0; i < 100000; i += 1) {
    pickAndBreakRandomStick();
    updateMinX();
  }
}


run();

/*
https://brilliant.org/weekly-problems/2018-05-28/intermediate/?p=5

 gives the sum of the cubed digits of some positive integer  For example,

If we repeatedly apply this process on each previous result, the following two different behaviors may arise:

Arrive at a fixed point: For example, beginning with 3, we eventually arrive at 153, and  We say that 153 is a fixed point.

Arrive at a limit cycle: For example, beginning with 4, we eventually arrive at 133, and  We say that  is a limit cycle.

The fixed points and limit cycles of this process all belong to the limit set.

Find the sum of all the numbers in the limit set (including the four in pink found above).
*/


function evalCubeSum(n) {
  let out = 0;
  while (n > 0) {
    let digit = n % 10;
    out += Math.pow(digit, 3);
    n = Math.floor(n / 10);
  }
  return out;
}


function findLimitPattern(n) {
  let seen = [];
  let next = evalCubeSum(n);
  while (seen.indexOf(next) === -1) {
    seen.push(next);
    next = evalCubeSum(next);
  }
  seen.splice(0, seen.indexOf(next));
  // console.log(`${n} --> ${next} ${JSON.stringify(seen)}`);
  return seen;
}

function getArraySum(arr) {
  let out = 0;
  arr.forEach(item => {
    out += item;
  });
  return out;
}

function mainCalc() {
  const limit_set = [];
  let grand_total = 0;
  for (let a = 0; a < 100000000; a += 1) {
    let added = [];
    let ans = findLimitPattern(a);
    ans.forEach((num) => {
      if (limit_set.indexOf(num) === -1) {
        grand_total += num;
        added.push(num);
        limit_set.push(num);
      }
    });
    if (added.length > 0) {
      console.log(`${a} --> new entries to limit set: ${added}, from ${ans}, grand total: ${grand_total}`);
    }
  }
}

mainCalc();

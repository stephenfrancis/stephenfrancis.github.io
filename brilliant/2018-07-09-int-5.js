

function calcArithSum(n) {
  return n * (n + 1) / 2;
}

/*
function populateSums() {
  const sums = [];
  for (let i = 1; i < 500; i += 1) {
    sums[i] = calcArithSum(i);
  }
  return sums;
}


const sums = populateSums();
*/

function checkSumsInRange() {
  for (let i = 10000; i <= 20000; i +=1 ) {
    let out = findCombination(i);
    if (!out) {
      throw new Error(`no combination for ${i}`);
    }
    console.log(`checking num, x, y, upper... ${i}, ${out[0]}, ${out[1]}`);
  }
}


function findCombination(num) {
  const min = Math.floor(Math.sqrt(num));
  for (let y = min; y < 10000; y += 1) {
    let x = findCombinationUsing(num, y, calcArithSum(y));
    if (x) {
      return [x, y];
    }
  }
}


function findCombinationUsing(num, y, upper) {
  for (let x = 1; x < y; x +=1) {
    if (num === (upper - calcArithSum(x))) {
      return x;
    }
  }
  return null;
}


checkSumsInRange();

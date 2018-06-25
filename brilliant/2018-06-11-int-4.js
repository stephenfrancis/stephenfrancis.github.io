

function calcElement(element, state) {
  var i;
  for (i = 0; i < element; i += 1) {
    state.banked += (state.pending[i] || 0);
    state.pending[i] = 0;
  }
  for (i = element; i < state.highest_prev; i += 1) {
    state.pending[i] += 1;
  }
  state.highest_prev = Math.max(state.highest_prev, element);
}


function calcArray(arr) {
  var state = {
    pending: [],
    highest_prev: 0,
    banked: 0,
  };

  arr.forEach(element => {
    calcElement(element, state);
  });

  return state.banked;
}


function assert(arr, expected) {
  const actual = calcArray(arr);
  const indic = (actual === expected) ? "   PASS   " : "** FAIL **";
  console.log(`${indic} ${arr} => ${actual} vs ${expected}`);
}

assert([ 2, 0, 0, 0, ], 0);
assert([ 2, 0, 0, 1, ], 2);
assert([ 2, 0, 0, 2, ], 4);
assert([ 2, 0, 0, 3, ], 4);
assert([ 2, 5, 3, 4, 3, 2, 5, 5, 3, 4, 2, 2, 2, ], 9);
assert([ 4, 2, 4, 1, 5, 3, 16, 6, 17, 19, 4, 13, 5, 3, 10, 10, 13, 6, 2, 1, 5, 15, 13, 19, 16, 9, 13, 1, 7, 18, 20, 13, 9, 7, 2, 10, 8, 18, 4, 7, 5, 8, 10, 13, 7, 18, 19, 2, 19, 8, 10, 10, 17, 6, 6, 20, 20, 11, 10, 11, 13, 9, 7, 1, 10, 5, 12, 16, 10, 7, 15, 13, 12, 10, 1, 1, 4, 2, 16, 10, 20, 17, 11, 19, 19, 20, 9, 10, 17, 9, 18, 8, 10, 18, 8, 19, 16, 17, 3, 1, ], 791);

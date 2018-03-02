
/*
https://brilliant.org/weekly-problems/2018-02-26/intermediate/?p=5

How many ways can a 2x10 rectangle be filled with 1x1 and 2x1 tiles?

Note: Rotations are allowed, so the 2x1 tiles can be placed either horizontally or vertically.
This problem is intended to be solved with programming.

x_pos and y_pos range between 0 and 9
*/

var combinations = 0;


// fill the next blank space on the upper row
// is_underhang is true if the lower row is filled one space further than the upper
function fillNextTopCell(x_pos, is_underhang, sketch) {
  if (x_pos > 10) {
    throw new Error("overflow top row!");
  }
  if (x_pos > 9) {
    if (is_underhang) {
      throw new Error("overflow bottom row!");
    }
      // if (combinations % 100 === 0) {
    //   console.log(sketch[0]);
    //   console.log(sketch[1]);
    //   console.log("");
    // }
    combinations += 1;
    return;
  }
  if (is_underhang) {
    fillUnderhangWithOne(x_pos, sketch);
    if (x_pos < 8) {
      fillUnderhangWithTwoAndBottomWithOne(x_pos, sketch);
    }
    if (x_pos < 7) {
      fillUnderhangWithTwoAndBottomWithTwo(x_pos, sketch);
    }
  } else {
    fillWithVertical(x_pos, sketch);
    fillTopWithOne(x_pos, sketch);
    if (x_pos < 8) {
      fillWithTwoHorizontals(x_pos, sketch);
      fillWithTopHorizontal(x_pos, sketch);
      fillWithBottomHorizontal(x_pos, sketch);
    }
  }
}

function fillUnderhangWithOne(x_pos, sketch) {
  fillNextTopCell(x_pos + 1, false, addSketch(sketch, "⊡", ""));
}

function fillUnderhangWithTwoAndBottomWithOne(x_pos, sketch) {
  fillNextTopCell(x_pos + 2, false, addSketch(sketch, "⊏⊐", "⊡"));
}

function fillUnderhangWithTwoAndBottomWithTwo(x_pos, sketch) {
  fillNextTopCell(x_pos + 2, true, addSketch(sketch, "⊏⊐", "⊏⊐"));
}

function fillWithVertical(x_pos, sketch) {
  fillNextTopCell(x_pos + 1, false, addSketch(sketch, "⊓", "⊔"));
}

function fillTopWithOne(x_pos, sketch) {
  fillNextTopCell(x_pos + 1, false, addSketch(sketch, "⊡", "⊡")); // bottom cell is one
  if (x_pos < 8) {
    fillNextTopCell(x_pos + 1, true, addSketch(sketch, "⊡", "⊏⊐")); // bottom cell is two
  }
}

function fillWithTwoHorizontals(x_pos, sketch) {
  fillNextTopCell(x_pos + 2, false, addSketch(sketch, "⊏⊐", "⊏⊐"));
}

function fillWithTopHorizontal(x_pos, sketch) {
  fillNextTopCell(x_pos + 2, false, addSketch(sketch, "⊏⊐", "⊡⊡")); // Bottom filled with 2x ones
  if (x_pos < 7) {
    fillNextTopCell(x_pos + 2, true, addSketch(sketch, "⊏⊐", "⊡⊏⊐")); // Bottom filled with 1x one and 1x two
  }
}

function fillWithBottomHorizontal(x_pos, sketch) {
  fillNextTopCell(x_pos + 2, false, addSketch(sketch, "⊡⊡", "⊏⊐")); // Top filled with 2x ones
  fillNextTopCell(x_pos + 1, true, addSketch(sketch, "⊡", "⊏⊐")); // Top filled with 1x one
}


function addSketch(sketch, top, bottom) {
  return [
    sketch[0] + (top || ""),
    sketch[1] + (bottom || ""),
  ]
}

fillNextTopCell(0, false, [ "", "" ]);
console.log(combinations);


let still_pat_count = 0;

const iter = (remain, used, still_pat) => {
  if (remain.length === 0) {
    console.log(used + ", " + still_pat);
    if (still_pat) {
      still_pat_count += 1;
    }
    return;
  }
  if (!used) {
    used = [];
  }

  for (let j = 0; j < remain.length; j += 1) {
    const new_used = used.slice();
    const new_remain = remain.slice();
    const picked = new_remain.splice(j, 1)[0];
    const really_still_pat = still_pat && (picked !== new_used.length);
    new_used.push(picked);
    iter(new_remain, new_used, really_still_pat);
  }
}

iter([ 0, 1, 2, 3, 4, 5 ], [], true);
console.log(still_pat_count);

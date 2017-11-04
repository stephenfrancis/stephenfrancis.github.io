/*


Find the largest possible n such that

SUM(i = 1 to n, FLOOR(SQRT(i)))

is a prime number.

*/



var primes = [ 2, 3, ];
var arg_num;


function isPrime(n) {
    while (getHighestKnownPrime() < n) {
        findNextPrime();
    }
    return (primes.indexOf(n) > -1);
}

function getHighestKnownPrime() {
    return primes[primes.length - 1];
}

function findNextPrime() {
    var n = getHighestKnownPrime();
    var is_prime = false;
    // console.log("finding next prime after " + n);
    while (true) {
        n += 2;
        is_prime = !primes.some(function (p) {
            return Number.isInteger(n / p);
        });
        if (is_prime) {
            break;
        }
    }
    primes.push(n);
    // console.log("adding prime " + n);
    return n;
}


function outerLoop(index, sum) {
    var iters = Math.pow(index + 1, 2) - Math.pow(index, 2);
    var i;
    console.log("starting outerLoop() with " + index + ", " + sum + ", " + iters);
    for (i = 0; i < iters; i += 1) {
        sum += index;
        if (isPrime(sum)) {
            console.log(sum + ", " + (Math.pow(index, 2) + i));
        }
    }
    if (index < 50) {
        outerLoop(index + 1, sum);
    }
}


// if (process.argv.length > 2) {
//     arg_num = parseFloat(process.argv[2], 10);
//     console.log("is " + arg_num + " a prime? " + isPrime(arg_num));
// } else {
//     console.log("please supply a number argument...");
// }

outerLoop(1, 0);

/*


Find the smallest positive integer which ends in 17, is divisible by 17,
and whose digits sum to 17.

*/



function sumOfDigits(n) {
    var sum = 0;
    String(n).split("").forEach(function (d) {
        sum += parseInt(d, 10);
    });
    return sum;
}


function check(n) {
//    console.log(n + " ---> " + sumOfDigits(n) + ", " + (n % 17));
    if (sumOfDigits(n) === 17 && (n % 17) === 0) {
        console.log(n + " !!");
    }
}


function main() {
    var n = 17;
    while (n < 100000) {
        check(n);
        n += 100;
    }
}


main();

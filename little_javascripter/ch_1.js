

wrappers = {};

function checkNonEmptyList(list) {
    if (!Array.isArray(list)) {
        throw "not an array: " + list;
    }
    if (list.length === 0) {
        throw "empty array";
    }
}

function car(list) {
    checkNonEmptyList(list);
    return list[0];
}

wrappers.car = function (list) {
    return car(doList(list[1]));
}

function cdr(list) {
    checkNonEmptyList(list);
    return list.slice(1);
}

wrappers.cdr = function (list) {
    return cdr(doList(list[1]));
}

function cons(s_expr, list) {
    if (!Array.isArray(list)) {
        throw "not an array: " + list;
    }
    list = list.slice(0);
    list.unshift(s_expr);
    return list;
}

wrappers.cons = function (list) {
    return cons(list[1], doList(list[2]));
}

function isnull(list) {
    return (Array.isArray(list) && list.length === 0);
}

wrappers.isnull = function (list) {
    return isnull(list[1]);
}

function isatom(s_expr) {
    return !Array.isArray(s_expr);
}

wrappers.isatom = function (list) {
    return isatom(list[1]);
}

function doList(list) {
    var first_item;
    var out;
    if (Array.isArray(list) && list.length > 0 && typeof list[0] === "string" && typeof wrappers[list[0]] === "function") {
        out = wrappers[list[0]](list);
    } else {
        out = list;
    }
    console.log("doList(" + convertToString(list) +") = " + convertToString(out));
    return out;
}

function exprToList(str) {
    return str.split(/\s+/);
}

function doExpr(str) {
    doList(exprToList(str));
}

function convertToString(obj) {
    var out;
    var delim = "";
    if (Array.isArray(obj)) {
        out = "[ ";
        obj.forEach(function (elem) {
            out += delim + convertToString(elem);
            delim = ", ";
        });
        out += " ]";
    } else {
        out = obj.toString()
    }
    return out;
}

function deepEquals(arg1, arg2) {
    var out = true;
    if (typeof arg1 !== typeof arg2 || Array.isArray(arg1) !== Array.isArray(arg2)) {
        out = false;
    } else if (typeof arg1 === "object") {
        Object.keys(arg1).forEach(function (key) {
            out = out && deepEquals(arg1[key], arg2[key]);
        });
    } else if (Array.isArray(arg1)) {
        Object.keys(arg1).forEach(function (val, i) {
            out = out && deepEquals(val, arg2[i]);
        });
    } else {
        out = (arg1 === arg2);
    }
    return out;
}

function outputExpr(str) {
    output(str + " evaluates to " + doExpr(str));
}

function outputList(list) {
    output(convertToString(list) + " evaluates to " + convertToString(doList(list)));
}

function assert(list, expected) {
    var actual = doList(list);
    if (deepEquals(actual, expected)) {
        output("   OK   " + convertToString(list) + " evaluates to " + convertToString(doList(list)));
    } else {
        output("**FAIL**" + convertToString(list) + " evaluates to " + convertToString(doList(list)) + " expected: " + convertToString(expected));
    }
}


assert([ "car", [ [ "hotdog" ] ] ], [ "hotdog" ]);

output("p6");

assert([ "car", [ [ [ "hotdog" ] ], [ "and" ], [ "pickle" ], "relish" ] ], [ [ "hotdog" ] ]);

assert([ "car", [ "car", [ [ [ "hotdog" ] ], [ "and" ] ] ] ], [ "hotdog" ]);

assert([ [ [ "a", "b", "c" ], "x", "y", "z" ] ], [ [ [ "a", "b", "c" ], "x", "y", "z" ] ]);

assert([ "cdr", [ "x", "y", "z" ] ], [ "y", "z" ]);

assert([ "cdr", [ "y", "z" ] ], [ "z" ]);

assert([ "cdr", [ "z" ] ], []);

assert([ "cdr", [ [ "a", "b", "c" ], "x", "y", "z" ] ], [ "x", "y", "z" ]);

assert([ "cdr", [ [ "x" ], "t", "r" ] ], [ "t", "r" ]);

output("p7");

assert([ "car", [ "cdr", [ [ "b" ], [ "x", "y" ], [ [ "c" ] ] ] ] ], [ "x", "y" ]);

assert([ "cdr", [ "cdr", [ [ "b" ], [ "x", "y" ], [ [ "c" ] ] ] ] ], [ [ [ "c" ] ] ]);

output("p8");

assert([ "cons", "peanut", [ "butter", "and", "jelly" ] ], [ "peanut", "butter", "and", "jelly" ]);

assert([ "cons", [ [ "help" ], "this" ], [ "is", "very", [ [ "hard" ], "to", "learn" ] ] ], [ [ [ "help" ], "this" ], "is", "very", [ [ "hard" ], "to", "learn" ] ]);

assert([ "cons", [ "a", "b", [ "c" ] ], [] ], [ [ "a", "b", [ "c" ] ] ]);

assert([ "cons", "a", [ "car", [ [ "b" ], "c" , "d" ] ] ], [ "a", "b" ]);

assert([ "cons", "a", [ "cdr", [ [ "b" ], "c" , "d" ] ] ], [ "a", "c", "d" ]);

output("p9");

assert([ "isnull", [] ], true);

assert([ "isnull", [ "a", "b", "c" ] ], false);

output("p10");

assert([ "isatom", "Harry" ], true);

assert([ "isatom", [ "Harry", "had", "a", "heap", "of", "apples" ] ], false);

output("p11");

assert([ "isatom", "car", [ "Harry", "had", "a", "heap", "of", "apples" ] ], true);

assert([ "isatom", "cdr", [ "Harry", "had", "a", "heap", "of", "apples" ] ], false);

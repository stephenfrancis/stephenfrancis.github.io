

function output(str) {
    $(".app_dynamic").append("<p>" + str + "</p>");
}

function checkNonEmptyList(list) {
    if (!Array.isArray(list)) {
        throw "not an array: " + list;
    }
    if (list.length === 0) {
        throw "empty array";
    }
}

function doList(list) {
    var i;
    var out;
    if (!Array.isArray(list)) {
        throw "not an array: " + list;
    }
    out = list.slice(0);        // copy the array
    for (i = out.length - 1; i >= 0; i -= 1) {
        if (Array.isArray(out[i])) {
            out[i] = doList(out[i]);
        }
        // replaced 'if' with 'while' in next to allow for function returning another function
        while (typeof out[i] === "function") {
            doListAuto(out, i);
        }
    }
    console.log("doList(" + convertToString(list) +") = " + convertToString(out));
    return out;
}

function doListAuto(list, i) {
    var funct = this[list[i]];
    var resp;
    if (typeof list[i] === "function" && typeof list[i].arity === "number") {
        funct = list[i];
    } else {
        throw "term is not a function with a defined arity: " + list + " at position " + i;
    }
    if (list.length < (i + funct.arity + 1)) {
        throw "insufficient remaining terms in list: " + list + " at term " + i + " for arity " + funct.arity;
    }
    if (funct.arity > 4) {
        throw "can only support arity up to 4";
    }
    if (funct.arity === 0) {
        resp = funct();
    } else if (funct.arity === 1) {
        resp = funct(list[i + 1]);
    } else if (funct.arity === 2) {
        resp = funct(list[i + 1], list[i + 2]);
    } else if (funct.arity === 3) {
        resp = funct(list[i + 1], list[i + 2], list[i + 3]);
    } else if (funct.arity === 4) {
        resp = funct(list[i + 1], list[i + 2], list[i + 3], list[i + 4]);
    }
    list.splice(i, (funct.arity + 1), resp);
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
    } else if (typeof obj === "function") {
        out = obj.name;
    } else if (obj == null) {
        out = "<null>";
    } else {
        out = obj.toString();
    }
    return out;
}

function deepEquals(arg1, arg2) {
    var out;
    if (typeof arg1 !== typeof arg2 || Array.isArray(arg1) !== Array.isArray(arg2)) {
        out = false;
    } else if (Array.isArray(arg1)) {
        out = (arg1.length === arg2.length);
        arg1.forEach(function (val, i) {
            out = out && deepEquals(val, arg2[i]);
        });
    } else if (typeof arg1 === "object") {
        out = (Object.keys(arg1).length === Object.keys(arg2).length);
        Object.keys(arg1).forEach(function (key) {
            out = out && deepEquals(arg1[key], arg2[key]);
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
        output("   OK    " + convertToString(list) + " evaluates to " + convertToString(actual) + " expected: " + convertToString(expected));
    } else {
        output("**FAIL** " + convertToString(list) + " evaluates to " + convertToString(actual) + " expected: " + convertToString(expected));
    }
}



function car(list) {
    checkNonEmptyList(list);
    return list[0];
}
car.arity = 1;


function cdr(list) {
    checkNonEmptyList(list);
    return list.slice(1);
}
cdr.arity = 1;


function cons(s_expr, list) {
    var temp;
    if (!Array.isArray(list)) {
        throw "not an array: " + list;
    }
    temp = list.slice(0);
    temp.unshift(s_expr);
    return temp;
}
cons.arity = 2;


function isnull(list) {
    return (Array.isArray(list) && list.length === 0);
}
isnull.arity = 1;


function isatom(s_expr) {
    var out = !Array.isArray(s_expr);
    if (out && typeof s_expr !== "string" && typeof s_expr !== "number" && typeof s_expr !== "boolean") {
        throw "unexpected atom type: " + s_expr + ", " + (typeof s_expr);
    }
    return out;
}
isatom.arity = 1;


function iseq(a1, a2) {
    if (typeof a1 !== "string" || typeof a2 !== "string") {
        throw "both arguments must be strings: " + a1 + ", " + a2;
    }
    return (a1 === a2);
}
iseq.arity = 2;


function islat(list) {
    if (isnull(list)) {
        return true;
    } else if (isatom(car(list))) {
        return islat(cdr(list));
    }
    return false;
}
islat.arity = 1;


function or(a, b) {
    return a || b;
}
or.arity = 2;


function iszero(num) {
    return num === 0;
}
iszero.arity = 1;


function isnumber(atom) {
    return (typeof atom === "number");
}
isnumber.arity = 1;


function iseqan(a1, a2) {
    if (isnumber(a1) && isnumber(a2)) {
        return a1 === a2;
    } else if (!isnumber(a1) && !isnumber(a2)) {
        return iseq(a1, a2);
    } else {
        return false;
    }
}
iseqan.arity = 2;


function isone(num) {
    if (iszero(num)) {
        return false;
    } else {
        return iszero(sub1(num));
    }
}
isone.isone = 1;


function and(a, b) {
    return a && b;
}
and.arity = 2;




wrappers = {};

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

function car(list) {
    checkNonEmptyList(list);
    return list[0];
}

wrappers.car = function (list, i) {
    var args = 1;
    var temp;
    console.log("wrappers.car(" + convertToString(list) + ", " + i + ")");
    if (list.length <= (i + args)) {
        throw "insufficient args for car: " + list + ", " + i;
    }
    list.splice(i, (args + 1), car(list[i + 1]));
    // return car(doList(list[1]));
    console.log("wrappers.car() -> " + convertToString(list));
}

function cdr(list) {
    checkNonEmptyList(list);
    return list.slice(1);
}

wrappers.cdr = function (list, i) {
    var args = 1;
    if (list.length <= (i + args)) {
        throw "insufficient args for cdr: " + list + ", " + i;
    }
    list.splice(i, (args + 1), cdr(list[i + 1]));
}

function cons(s_expr, list) {
    if (!Array.isArray(list)) {
        throw "not an array: " + list;
    }
    // list = list.slice(0);
    list.unshift(s_expr);
    return list;
}

wrappers.cons = function (list, i) {
    var args = 2;
    var temp;
    if (list.length <= (i + args)) {
        throw "insufficient args for cons: " + list + ", " + i;
    }
    temp = list[i + 2].slice();
    temp.unshift(list[i + 1]);
    list.splice(i, (args + 1), temp);
    // return cons(list[1], doList(list[2]));
}

function isnull(list) {
    return (Array.isArray(list) && list.length === 0);
}

wrappers.isnull = function (list, i) {
    var args = 1;
    list.splice(i, (args + 1), isnull(list[i + 1]));
}

function isatom(s_expr) {
    return !Array.isArray(s_expr);
}

wrappers.isatom = function (list, i) {
    var args = 1;
    list.splice(i, (args + 1), isatom(list[i + 1]));
}

function iseq(a1, a2) {
    if (typeof a1 !== "string" || typeof a2 !== "string") {
        throw "both arguments must be strings: " + a1 + ", " + a2;
    }
    return (a1 === a2);
}

wrappers.iseq = function (list, i) {
    var args = 2;
    list.splice(i, (args + 1), iseq(list[i + 1], list[i + 2]));
}

function doList(list) {
    var i;
    var out;
    if (!Array.isArray(list)) {
        throw "not an array: " + list;
    }
    out = list.slice(0);
    for (i = out.length - 1; i >= 0; i -= 1) {
        if (Array.isArray(out[i])) {
            out[i] = doList(out[i]);
        }
        if (typeof out[i] === "string" && typeof wrappers[out[i]] === "function") {
            wrappers[out[i]](out, i);
        }
        if (typeof out[i] === "string" && typeof this[out[i]] === "function" && typeof this[out[i]].arity === "number") {
            doListAuto(out, i);
        }
    }
    console.log("doList(" + convertToString(list) +") = " + convertToString(out));
    return out;
/*
    var first_item;
    var out;
    if (Array.isArray(list) && list.length > 0 && typeof list[0] === "string" && typeof wrappers[list[0]] === "function") {
        out = wrappers[list[0]](list);
    } else {
        out = list;
    }
    console.log("doList(" + convertToString(list) +") = " + convertToString(out));
    return out;
*/
}

function doListAuto(list, i) {
    var funct = this[list[i]];
    var args = funct.arity;
    var resp;
    if (list.length < (i + args + 1)) {
        throw "insufficient remaining terms in list: " + list + " at term " + i + " for arity " + args;
    }
    if (args > 3) {
        throw "can only support arity up to 3";
    }
    if (args === 0) {
        resp = funct();
    } else if (args === 1) {
        resp = funct(list[i + 1]);
    } else if (args === 2) {
        resp = funct(list[i + 1], [i + 2]);
    } else if (args === 3) {
        resp = funct(list[i + 1], [i + 2], [i + 3]);
    }
    list.splice(i, (args + 1), resp);
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
        output("   OK    " + convertToString(list) + " evaluates to " + convertToString(doList(list)));
    } else {
        output("**FAIL** " + convertToString(list) + " evaluates to " + convertToString(doList(list)) + " expected: " + convertToString(expected));
    }
}

function islat(list) {
    if (isnull(list)) {
        return true;
    } else if (isatom(car(list))) {
        return islat(cdr(list));
    }
    return false;
}

wrappers.islat = function (list, i) {
    var args = 1;
    list.splice(i, (args + 1), islat(list[i + 1]));
}


wrappers.or = function (list, i) {
    var args = 2;
    list.splice(i, (args + 1), (list[i + 1] || list[i + 2]));
}


wrappers.plus = function (list, i) {
    var args = 2;
    list.splice(i, (args + 1), (list[i + 1] + list[i + 2]));
}

function ismember(atom, lat) {
    if (isnull(lat)) {
        return false;
    } else {
        return iseq(atom, car(lat)) || ismember(atom, cdr(lat));
    }
}

wrappers.ismember = function (list, i) {
    var args = 2;
    list.splice(i, (args + 1), ismember(list[i + 1], list[i + 2]));
}

function rember(atom, lat) {
    if (isnull(lat)) {
        return lat;
    } else if (iseq(atom, car(lat))) {
        return cdr(lat);
    } else {
        return cons(car(lat), rember(atom, cdr(lat)));
    }
}

wrappers.rember = function (list, i) {
    var args = 2;
    list.splice(i, (args + 1), rember(list[i + 1], list[i + 2]));
}

function firsts(list) {
    if (isnull(list)) {
        return list;
    } else {
        return cons(car(car(list)), firsts(cdr(list)));
    }
}
firsts.arity = 1;

// wrappers.firsts = function (list, i) {
//     var args = 2;
//     list.splice(i, (args + 1), firsts(list[i + 1], list[i + 2]));
// }


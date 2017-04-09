

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
    out = list.slice(0);
    for (i = out.length - 1; i >= 0; i -= 1) {
        if (Array.isArray(out[i])) {
            out[i] = doList(out[i]);
        }
        if (typeof out[i] === "function" && typeof out[i].arity === "number") {
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
    } else if (typeof this[list[i]] === "function" && typeof this[list[i]].arity === "number") {
        funct = this[list[i]];
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
    } else {
        out = obj.toString();
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
    return !Array.isArray(s_expr);
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


function plus(a, b) {
    return a + b;
}
plus.arity = 2;


function ismember(atom, lat) {
    if (isnull(lat)) {
        return false;
    } else {
        return iseq(atom, car(lat)) || ismember(atom, cdr(lat));
    }
}
ismember.arity = 2;


function rember(atom, lat) {
    if (isnull(lat)) {
        return lat;
    } else if (iseq(atom, car(lat))) {
        return cdr(lat);
    } else {
        return cons(car(lat), rember(atom, cdr(lat)));
    }
}
rember.arity = 2;


function firsts(list) {
    if (isnull(list)) {
        return list;
    } else {
        return cons(car(car(list)), firsts(cdr(list)));
    }
}
firsts.arity = 1;


function insertR(new_at, old_at, lat) {
    if (isnull(lat)) {
        return lat;
    } else if (iseq(old_at, car(lat))) {
        return cons(old_at, cons(new_at, cdr(lat)));
    } else {
        return cons(car(lat), insertR(new_at, old_at, cdr(lat)));
    }
}
insertR.arity = 3;


function insertL(new_at, old_at, lat) {
    if (isnull(lat)) {
        return lat;
    } else if (iseq(old_at, car(lat))) {
        return cons(new_at, lat);
    } else {
        return cons(car(lat), insertL(new_at, old_at, cdr(lat)));
    }
}
insertL.arity = 3;


function subst(new_at, old_at, lat) {
    if (isnull(lat)) {
        return lat;
    } else if (iseq(old_at, car(lat))) {
        return cons(new_at, cdr(lat));
    } else {
        return cons(car(lat), subst(new_at, old_at, cdr(lat)));
    }
}
subst.arity = 3;


function subst2(new_at, old1, old2, lat) {
    if (isnull(lat)) {
        return lat;
    } else if (or(iseq(old1, car(lat)), iseq(old2, car(lat)))) {
        return cons(new_at, cdr(lat));
    } else {
        return cons(car(lat), subst2(new_at, old1, old2, cdr(lat)));
    }
}
subst2.arity = 4;

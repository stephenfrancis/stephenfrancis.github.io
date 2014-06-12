/*global  */
"use strict";

if (typeof String.prototype.repeat !== "function") {
	String.prototype.repeat = function (num) {
	    return new Array(num + 1).join(this);
	};
}

if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function () {
	    return this.replace(/(^\s*)|(\s*$)/g, "");
	};
}

Object.prototype.clone = function () {
	var out = {};
	out.__proto__ = this;
	return out;
};

Object.prototype.forAll = function (funct) {
    var prop;
    if (typeof funct !== "function") {
        funct = this[funct];
    }
    for (prop in this) {
        if (typeof this[prop] !== "function") {
            funct(prop, this[prop]);
        }
    }
};

Object.prototype.forOwn = function (funct) {
	var prop;
    if (typeof funct !== "function") {
        funct = this[funct];
    }
	for (prop in this) {
		if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
			funct(prop, this[prop]);
		}
	}
};

Object.prototype.view = function (funct, limit) {
	var out   = "{",
		delim = " ";

	funct = funct || "forOwn";
	limit = limit || 100;
	this[funct](function (key, value) {
	    if (out.length > limit) {
	        return;
	    }
		out  += delim + key + ": " + value.view(funct, limit);
		delim = ", ";
	});
    if (out.length > limit) {
        out += " ...";
    }
    if (out.length > 1) {
        out += " ";
    }
	return out + "}"; 
};

String.prototype.view = function () {
    return "\"" + this.toString() + "\"";
};

Number.prototype.view = function () {
    return this.toString();
};

Array.prototype.view = function () {
    return "[" + this.toString() + "]";
};

Object.prototype.toString = function () {
    return this.view();
};


// sanity check method - ensures key doesn't already exist anywhere in prototype chain 
Object.prototype.add = function (key, value) {
    if (typeof this[key] !== "undefined") {
        throw Error("key already exists in prototype chain: " + key);
    }
    this[key] = value;
};

// sanity check method - ensures key doesn't already exist in this object
Object.prototype.override = function (key, value) {
    if (this.hasOwnProperty(key)) {
        throw Error("key already exists in object: " + key);
    }
    this[key] = value;
};

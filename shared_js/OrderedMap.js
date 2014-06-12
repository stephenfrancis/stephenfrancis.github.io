/*global x, java */
"use strict";

var OrderedMap = {
    map : {},
    arr : []
};


OrderedMap.init = function () {
    var n,
        e;
    this.map = {};
    this.arr = [];
    for (n = 0; n < this.parent.arr.length; n += 1) {
        e = this.parent.arr[n].clone({ owner: this });
        this.arr[n] = e;
        this.map[e.id] = e;
    }
};


OrderedMap.add = function (obj) {
    if (!obj.id || typeof obj.id !== "string") {
        throw Error("id must be non-blank string");
    }
    if (this.map[obj.id]) {
        throw Error("id already exists: " + obj.id);
    }
    obj.owner = this;
    this.map[obj.id] = obj;
    this.arr.push(obj);
    return obj;
};


OrderedMap.addAll = function (arr) {
    var i;
    if (!arr || typeof arr.length !== "number") {
        throw Error("argument must be an array");
    }
    for (i = 0; i < arr.length; i += 1) {
        this.add(arr[i]);
    }
};


OrderedMap.get = function (id) {
    if (typeof id === "string") {
        return this.map[id];
    } else if (typeof id === "number") {
        return this.arr[id];
    } else {
        throw Error("argument must be a string or a number: " + id);
    }
};


OrderedMap.indexOf = function (id) {
    if (typeof id === "string") {
        return this.arr.indexOf(this.map[id]);
    } else if (typeof id === "object") {
        return this.arr.indexOf(id);
    }
    throw Error("argument must be a string or a number: " + id);
};


OrderedMap.remove = function (id) {
    var obj;
    if (typeof id === "string") {
        obj = this.map[id];
        if (!obj) {
            throw Error("not found: " + id);
        }
        this.arr.splice(this.arr.indexOf(obj), 1);
        delete this.map[id];
    } else if (typeof id === "number") {
        if (id < 0 || id >= this.arr.length) {
            throw Error("index out of range: " + id);
        }
        obj = this.arr[id];
        this.arr.splice(id, 1);
        delete this.map[obj.id];
    } else {
        throw Error("argument must be a string or a number: " + id);
    }
};


OrderedMap.length = function () {
    return this.arr.length;
};


OrderedMap.moveTo = function (id, position) {
    if (typeof position !== "number" || position < 0 || position > this.arr.length) {
        throw Error("invalid position: " + position);
    }
    if (typeof id === "string") {
        id = this.arr.indexOf(this.map[id]);
        if (id === -1) {
            throw Error("not found: " + id);
        }
    } else if (typeof id !== "number") {
        throw Error("argument must be a string or a number: " + id);
    }
    this.arr.splice(position, 0, this.arr.splice(id, 1)[0]);
};


OrderedMap.clear = function () {
    this.map = {};
    this.arr = [];
};


OrderedMap.each = function (funct) {
    var i;
    for (i = 0; i < this.arr.length; i += 1) {
        funct(this.arr[i]);
    }
};

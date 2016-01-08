///////////////
// Polyfills //
///////////////
(function () {
    "use strict";
    if (typeof Object.assign === "function") {
        return;
    }
    Object.assign = function Object$assign () {
        var it = {},
            arg,
            key;

        while (arg = [].shift.call(arguments)) {

            if (arg === null || typeof arg !== "object") {
                throw new TypeError("Invalid argument");
            }

            for (key in arg) {
                if (arg.hasOwnProperty(key)) {
                    it[key] = arg[key];
                }
            }
        }
        return it;
    };
}());

(function () {
    "use strict";
    if (typeof Array.prototype.find === "function") {
        return;
    }
    Array.prototype.find = function Array$prototype$find (fn) {
        if (typeof fn !== "function") {
            throw new TypeError("predicate must be a function");
        }

        var i = this.length;

        // Iterate from the end in case the array gets mutated in the process
        while (i--) {
            if (fn.call(this[i], this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
}());

(function () {
    "use strict";
    if (typeof Array.prototype.findIndex === "function") {
        return;
    }
    Array.prototype.findIndex = function Array$prototype$findIndex (fn) {
        if (typeof fn !== "function") {
            throw new TypeError("predicate must be a function");
        }

        var i = this.length;

        // Iterate from the end in case the array gets mutated in the process
        while (i--) {
            if (fn.call(this[i], this[i], i, this)) {
                return i;
            }
        }
        return -1;
    }
}());

(function () {
    "use strict";
    if (typeof Array.prototype.some === "function") {
        return;
    }
    Array.prototype.some = function Array$prototype$some (fn/*, arg*/) {
        if (typeof fn !== "function") {
            throw new TypeError("predicate must be a function");
        }
        arg = arguments.length >= 2 ? arguments[1] : null;

        var i = this.length;

        while (i--) {
            if (fn.call(arg, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}
}());
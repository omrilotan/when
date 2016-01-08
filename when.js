var when = (function __when__ () {
    "use strict";

    var

    //////////////////
    // Define tools //
    //////////////////

        forIn = function _forIn (obj) {
            // Iterate over object's keys

            var act = function (obj, key, fn) {
                    if (obj.hasOwnProperty(key)) {
                        fn.call(obj, key, obj[key], obj);
                    }
                },
                arg = arguments[1],
                key;

            if (typeof arg === "string") {
                act.apply(null, arguments);
            } else {
                for (key in obj) {
                    act(obj, key, arg);
                }
            }
            return obj;
        },

        combine = Object.assign,

    ///////////////////////
    // Private functions //
    ///////////////////////


    ///////////////////////////
    // Collection Management //
    ///////////////////////////

        collection = [],

        getIndex = function _getIndex (name) {
            return collection.findIndex(function (item/*, i, arr*/) {
                return item.name === name;
            });
        },

        get = function _get (name) {
            return collection.find(function (item/*, i, arr*/) {
                return item.name === name;
            });
        },

        set = function _set (name) {
            var item = new When(name);
            collection.push(item);
            return item;
        },

    ///////////////
    // Interface //
    ///////////////

        When = function When (name) {
            this.name = name;
            this.played = false;
            this.stored = {};
            this.listeners = [];
            this.conditions = [];
        },

        exports = function when (name) {
            name = name.toLowerCase();
            return get(name) || set(name);
        };

    // Additional functionality

    exports.kill = function when$kill (name) {
        var index;
        if (name === "*") {

            // '*' applies as wild-card,
            collection = [];
        } else {
            index = getIndex(name);
            if (index !== -1) {
                collection.splice(index, 1);
            }
        }
        return this;
    };

    exports.has = function when$has (name) {
        return typeof get(name) !== "undefined";
    };

    exports.list = function when$list () {
        return collection.map(function (item) { return item.name; });
    };

    When.prototype = {

        // Fire this event
        emit: function When$emit (data) {
            var that = this;

            // Add data to stored data
            this.store(data);

            // Fire listeners
            this.listeners.forEach(function When$emit$batch (item) {
                item.call(null, that.stored);
            });

            this.played = true;
            return this;
        },

        // Add data to this event's stored data
        store: function When$store (data) {
            this.stored = combine(this.stored, data);
            return this;
        },

        // Simply add to listeners.
        // Will fire every time this event will happen in the future
        listen: function When$listen (fn) {
            if (typeof fn === "function") {
                this.listeners.push(fn);
            }
            return this;
        },

        // Fire once this event happens
        // Will fire immediately if event happened, or once when it will
        once: function When$once (fn) {
            if (this.played) {
                fn.call(null, this.stored);
            } else {
                this.listen(function oncememorizer () {
                    var memorized = fn;
                    return function onceEmitter () {
                        memorized.apply(null, arguments);
                        memorized = function () {};
                    };
                }());
            }
            return this;
        },

        // Empty listeners and stored data
        destroy: function When$destroy () {
            this.listeners = [];
            this.stored = {};
            return this;
        },

        /////////////////
        // Conditional //
        /////////////////

        // Conditional emitter
        register: function When$register (name, value) {

            // Don't override past "fail" or "pass"
            if (this.conditions.find(function (item) {
                    return item.name === name;
                }) === -1) {

                this.conditions.push({
                    name: name,
                    value: value
                });
            }

            if (this.conditions.some(function (item) {
                    return item.value !== true;
                })) {
                return this;
            }

            return this.emit();
        },

    };

    return exports;
}());

if (typeof module !== "undefined" && typeof module.exports === "object") {
    module.exports = when;
}
var engage = (function () {
    "use strict";
    var exports,    // API
        key, // object keys iterator
        collection = {},    // representing: @String- "event name": @EventListener- related event listener object

        Engage = function (name) {
            this.name = name;
            this.hasPlayed = false;
            this.listeners = [];
            return this;
        },

        Multiple;

    // add methods to the listeners array
    // will be fired each time the event is engaged
    Engage.prototype.listen = function () {
        var argument;
        while (arguments.length) {
            argument = [].pop.call(arguments);
            if (this.listeners.indexOf(argument) === -1) {
                this.listeners.push(argument);
            }
        }
        return this;
    };

    // remove methods to the listener
    Engage.prototype.unlisten = function () {
        var argument;
        while (arguments.length) {
            argument = [].pop.call(arguments);
            while (this.listeners.indexOf(argument) !== -1) {
                this.listeners.splice(this.listeners.indexOf(argument), 1);
            }
        }
        return this;
    };

    // will be fired if the event is marked as "hasPlayed"
    // will fire once when the event is engaged, then be removed from the Engage by unlisten
    Engage.prototype.once = function () {
        var that = this;

        [].forEach.call(arguments, function (argument) {
            if (that.hasPlayed === true) {
                argument.call(null, {
                    name: that.name,
                    data: null
                });
            } else {
                that.listen(function fn (data) {
                    argument.call(null, {
                        name: that.name,
                        data: data
                    });
                    that.unlisten(fn);
                });
            }
        });

        return this;
    };

    // emit the Event, mark it's "hasPlayed" to true, and fire all listeners
    Engage.prototype.emit = function (data) {
        var i = 0,
            len = this.listeners.length,
            
            // Add the context data
            evt = typeof data === "object" ? data : {};
        
        evt.name = this.name;
        
        while (i < len) {
            this.listeners[i].call(null, evt);
            ++i;
        }
        this.hasPlayed = true;
        return this;
    };

    // mark it's "hasPlayed" attribute to false
    // this is cool for using .once() later on
    Engage.prototype.renew = function () {
        this.hasPlayed = false;
        return this;
    };

    // listen
    // unlisten
    // once
    // emit
    // renew

    Multiple = function (name, args) {
        var that = this;
        this.name = name;
        this.events = [];
        [].forEach.call(args, function (item) {
            that.events.push(exports(item));
        });
    };

    // Apply all of the Event prototype methods
    for (key in Engage.prototype) {
        if (Engage.prototype.hasOwnProperty(key)) {
            (function (fName) {
                Multiple.prototype[fName] = function () {
                    var _arguments = arguments;
                    this.events.forEach(function (item) {
                        item[fName].apply(item, _arguments);
                    });
                };
            }(key));
        }
    }

    // Interface
    exports = function () {
        var args = [].join.call(arguments, ",");

        // multiple event listener
        if (arguments.length > 1 &&
                !collection[args]) {
            collection[args] = new Multiple(args, arguments);
            return collection[args];
        } else if (arguments.length === 1) {

            // create new event listener and add it to the collection
            if (!collection[args]) {
                collection[args] = new Engage(args);
                return collection[args];
            }
        }

        return collection[args];

        // return relevant event listener
    };

    exports.list = function () {
        var names = [],
            key;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                names.push(key);
            }
        }
        return names;
    };

    return exports;

}());

// for node.js:
if (typeof module !== "undefined" &&
        typeof module.exports === "object") {

    // export as node module
    module.exports = engage;
}
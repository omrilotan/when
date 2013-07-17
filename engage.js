var engage = (function () {
    "use strict";
    var exports,    // API
        key, // object keys iterator
        collection = [],    // representing: @String- "event name": @EventListener- related event listener object

        Event = function (name) {
            this.name = name;
            this.hasPlayed = false;
            this.listeners = [];
            return this;
        };

    // add methods to the listeners array
    // will be fired each time the event is engaged
    Event.prototype.listen = function () {
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
    Event.prototype.unlisten = function () {
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
    // will fire once when the event is engaged, then be removed from the Event by unlisten
    Event.prototype.once = function () {
        var argument,
            that,
            fn;
        while (arguments.length) {
            argument = [].pop.call(arguments);
            if (this.hasPlayed === true) {
                argument.call(null, {
                    name: this.name,
                    data: null
                });
                return this;
            }
            that = this;
            this.listen(function fn (data) {
                argument.call(null, {
                    name: that.name,
                    data: data
                });
                that.unlisten(fn);
            });
        }
        return this;
    };

    // emit the Event, mark it's "hasPlayed" to true, and fire all listeners
    Event.prototype.emit = function (data) {
        var i = 0,
            len = this.listeners.length;
        while (i < len) {
            this.listeners[i].call(null, {
                name: this.name,
                data: data
            });
            ++i;
        }
        this.hasPlayed = true;
        return this;
    };

    // mark it's "hasPlayed" attribute to false
    // this is cool for using .once() later on
    Event.prototype.renew = function () {
        this.hasPlayed = false;
        return this;
    };

    // listen
    // unlisten
    // once
    // emit
    // renew

    var Multiple = function (args) {
        var name,
            that = this;
        this.events = [];
        [].forEach.call(args, function (item) {
            that.events.push(exports(item));
        });
    };

    for (key in Event.prototype) {
        if (Event.prototype.hasOwnProperty(key)) {
            Multiple.prototype[key] = function () {
                this.events.forEach = function (item) {
                    item[key].apply(item, arguments);
                }
            };
        }
    }

    exports = function eventManager (name) {
        var args = [].join.call(arguments, ",");

        // multiple event listener
        if (arguments.length > 1 &&
                !collection[args]) {
            collection[args] = new Multiple(arguments);
        } else {

            // create new event listener and add it to the collection
            if (!collection[name]) {
                collection[name] = new Event(name);
            }
        }

        // return relevant event listener
        return collection[name];
    };

    return exports;

}());

// for node.js:
// module.exports = engage;
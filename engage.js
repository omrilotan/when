var engage = (function __engage__ () {
    "use strict";
    var collection = {},

        // Interface
        exports = function engage (name) {
            name = name.toLowerCase();    // Ignore case difference

            // Create new event listener and add it to the collection
            if (!collection[name]) {
                collection[name] = new Engage(name);
            }
            return collection[name];
        },

        // Constructor
        Engage = function Engage (name) {
            this.name = name;
            this.hasPlayed = false;
            this.listeners = [];
            return this;
        };

    Engage.prototype = {

        // Add methods to the listeners array
        // Will be fired each time the event is engaged
        listen: function engage$listen (fn) {
            if (this.listeners.indexOf(fn) === -1) {
                this.listeners.push(fn);
            }
            return this;
        },

        // Remove methods to the listener
        unlisten: function engage$unlisten (fn) {
            while (this.listeners.indexOf(fn) !== -1) {
                this.listeners.splice(this.listeners.indexOf(fn), 1);
            }
            return this;
        },

        // Will be fired if the event is marked as "hasPlayed"
        // Will fire once when the event is engaged, then be removed from the Engage by unlisten
        once: function engage$once (fn) {
            var that = this;
            if (this.hasPlayed === true) {
                fn.call(null, {
                    name: that.name,
                    data: null
                });
            } else {
                this.listen(function engage$fn (data) {
                    fn.call(null, {
                        name: that.name,
                        data: data
                    });
                    that.unlisten(fn);
                });
            }
            return this;
        },

        // Emit the Event, mark it's "hasPlayed" to true, and fire all listeners
        emit: function engage$emit (data) {
            
            // Add the context data
            var evt = typeof data === "object" ? data : {};
            evt.name = this.name;
            
            this.listeners.forEach(function engage$emit$batch (item) {
                item.call(null, evt);
            });
            this.hasPlayed = true;
            return this;
        },

        // Change "hasPlayed" attribute back to false
        //     this is cool for using .once() again later on
        renew: function engage$renew () {
            this.hasPlayed = false;
            return this;
        },
        
        // Remove all methods from the listeners array
        clear: function engage$clear () {
            this.listeners = [];
            return this;
        }
    };

    // Get a list of all event names in the collection
    exports.list = function engage$list () {
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
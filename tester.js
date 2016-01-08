// Set string interpolation: ${ key }
var interpolate = function(string, obj) {
    return string.replace(/\${(.*?)\s*}/g,
        function (a, b) {
            var r = obj[b.trim()];
            return ~["string", "number", "boolean"].indexOf(typeof r) ? r : a;
        }
    );
};

// Set up Tests
var test = (function _test_ () {
    var collection = {},
        Test = function Test (name) {
            this.name = name;

            // Default template
            this.template = "Result for test \"${ name }\" (${ description }): ${ result }";
        };
    Test.prototype = {
        describe: function Test$describe (description) {
            this.description = description;
            return this;
        },
        set: function Test$set (fn) {
            this.fn = fn;
            return this;
        },
        go: function Test$go () {
            this.result = this.fn();
            return this;
        },
        templatise: function Test$templatise (template) {
            this.template = typeof template === "string" ? template : this.template;
            return this;
        },
        report: function Test$report () {
            return interpolate(this.template, this);
        }
    };

    return function test (name) {
        if (!collection.hasOwnProperty(name)) {
            collection[name] = new Test(name);
            collection[name];
        }
        return collection[name];
    };
}());


if (typeof module !== "undefined" && typeof module.exports === "object") {
    module.exports = test;
}
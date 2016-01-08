var test = require("../tester"),
    when = require("../when"),
    helpers = require("./helpers");

test("Sanity")
    .describe("Sanity test")
    .set(function () {
        when("hello");
        when("there");

        return helpers.compare(
            ["hello", "there"],
            when.list()
        );
    })
    .go();

module.exports = test("Sanity").report();
var test = require("../tester"),
    when = require("../when"),
    helpers = require("./helpers");

test("Kill")
    .describe("Kill test")
    .set(function () {


        when("a");
        when("b");
        var a = helpers.compare(
            2,
            when.list().length
        );

        when.kill("*");
        var b = helpers.compare(
            0,
            when.list().length
        );

        return a && b;
    })
    .go();

module.exports = test("Kill").report();
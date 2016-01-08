var when = require("./when");


console.log([
    "------------------",
    " Unit Tests Begin",
    "------------------",
    ""
].join("\n"));

// Unit tests

console.log(require("./tests/sanity"));

when.kill("*");

console.log(require("./tests/kill"));

when.kill("*");
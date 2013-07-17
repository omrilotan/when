// global.process.features.debug = true;

var engage = require("./engage.js");
// single events

// 0
engage("simple test").listen(function (event) {
    console.log(event.data);
});
// 1
setTimeout(function () {
    engage("simple test").emit("test: first listener emitted");
    engage("simple test2").emit("test2: first listener emitted");
}, 500);

// 2
setTimeout(function () {
    engage("simple test2").listen(function (event) {
        console.log(event.data);
    });
    engage("simple test2").once(function (event) {
        console.log(event.data);
    });
}, 1000);

// 3
setTimeout(function () {
    engage("simple test2").emit("test2 listener (I should fire later, after Mr. once)");
}, 1500);



// Multiple
    
engage("multiple one", "multiple two", "multiple three").listen(function (event) {
    console.log("multiple one, two and three listen - " + event.data);
});

engage("multiple one").listen(function (event) {
    console.log("multiple one listen - " + event.data);
});

// 4

setTimeout(function () {
    engage("multiple one", "multiple two").emit("multiple one and multiple two emitted");
}, 2000);

// 5

setTimeout(function () {
    engage("multiple three").emit("multiple three emitted");
}, 2500);

// setTimeout(function () {
//     console.log(engage.list());
// }, 3000);
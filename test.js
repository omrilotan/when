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




engage("multiple one", "multiple two").listen(function () {
    console.log("multiple: first and second listener");
});

    
engage("multiple one", "multiple two", "multiple three").listen(function () {
    console.log("multiple three");
});

engage("multiple one").listen(function () {
    console.log("multiple: first listener");
});

setTimeout(function () {
    engage("multiple one", "multiple two").emit();
}, 2000);

setTimeout(function () {
    engage("multiple three").emit();
}, 2500);
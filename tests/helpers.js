module.exports = {
    compare: function compare (a, b) {
        var getVal = function (item) {
                switch (typeof arg) {
                    case "string":
                    case "number":
                    case "boolean":
                        return item;
                        break;
                    default:
                        return JSON.stringify(item);
                        break;
                }
            },
            args = [].slice.call(arguments),
            prev = args.pop(),
            curr;

        while (args.length) {
            if (getVal(prev) !== getVal(prev = args.pop())) {
                return false;
            }
        }
        return true;
    }
};
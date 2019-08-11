function checkTypes(array, dictionary, func) {
    let arg1 = array instanceof Array;
    console.assert(arg1, "Expected: Array");
    let arg2 = dictionary instanceof Object;
    console.assert(arg2, "Expected: Object");
    let arg3 = func instanceof Function;
    console.assert(arg3, "Expected: Function");
    if (arg3) {
        arg3 = arg3 && func.length === 3;
        console.assert(arg3, "Expected: Function with two arguments f(state, parameter)");
    }
}

function checkShape(array) {
    console.assert(math.size(array).length === 2 && math.size(array)[1] === 2, "State has wrong shape!")
}
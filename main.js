var state = math.ones([1, 2]);
var parameter = { w0: 1 };
var t = 0;

state[0][0] = 1;
state[0][1] = -1;

function acc(state, t, parameter) {
    let x = state[0][0];
    let w0 = parameter.w0;
    let a = math.ones([1, 1]);
    a[0][0] = -w0 * w0 * x;
    return a;
}

[state, t] = solRK(state, t, parameter, acc, 10000);

console.log(state);
console.log("elapsed time: " + t + "s");


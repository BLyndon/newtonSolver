/**
 * Example: Harmonic Oscillator
 */

var state = math.ones([2, 2]);
var parameter = { w0: 1 };
var t = 0;

state[0][0] = 1;
state[0][1] = -1;
state[1][0] = 1;
state[1][1] = -1;

function acc(state, t, parameter) {
    let x0 = state[0][0];
    let x1 = state[1][0];
    let w0 = parameter.w0;
    let a = math.ones([2, 1]);
    a[0][0] = -w0 * w0 * x0;
    a[1][0] = -w0 * w0 * x1;
    return a;
}

[state, t] = solRK(state, t, parameter, acc, 1000);

console.log(state);
console.log("elapsed time: " + t + "s");


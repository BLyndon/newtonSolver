/**
 *  Test: two coupled harmonic oscillators
 * 
 *      n:          number of degrees of freedom
 * 
 *      state:      first column = coordinates
 *                  second column = velocities
 * 
 *      parameter:  m1 = m2 = m = mass
 *                  k1 = springs coupling to the fixed boundaries
 *                  k2 = spring coupling the masses
 */
var n = 2
var state = math.ones([n, 2]);
var parameter = {
    m: 1,
    k1: 1,
    k2: 1
};
var initVal = {
    x: 0,
    y: 0,
    dx: 1,
    dy: 0
};
var t = 0;

state[0][0] = initVal.x;
state[1][0] = initVal.y;

state[0][1] = initVal.dx;
state[1][1] = initVal.dy;

function acc(state, t, parameter) {
    let x = state[0][0];
    let y = state[1][0];
    let m = parameter.m;
    let k1 = parameter.k1;
    let k2 = parameter.k2;
    let a = math.ones([n, 1]);
    a[0][0] = (k2 * y - (k1 + k2) * x) / m;
    a[1][0] = (k2 * x - (k1 + k2) * y) / m;
    return a;
}

[state, traj] = solverRK(state, t, parameter, acc, 10000, true, 0.01);


console.log("state: [xi, vi]");
console.log(state);
console.log(traj);

traj.forEach(item => document.write(item + "<br>"));


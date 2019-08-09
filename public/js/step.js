import { reshape, size, column, multiply, concat, add, divide, resize } from 'mathjs';

/** Single Runge-Kutta step in time for Euler-Lagrange-eq or Newton's equation of motion.
 * n is the number of generalised coordinates X/velocities V.
 *  state-vector: [x1, v1, ..., xn, vn, t] (alternating arrangement important for reshaping)
 *  state-matrix: [X, V, T] vertical stacked, i = 1 - n
 * @param {matrix} state vector: shape = [2n+1, 1]; matrix: shape = [n, 3]
 * @param {dictionary} params physical parameter, model parameters, external forces, etc.
 * @param {function} acceleration acceleration(state = [n, 3]-matrix, params = dictionary)
 * @param {number} dt timestep fixes time discretisation
 */
function step(state, params, acceleration, dt = 0.0001) {
    if (size(state)[1] === 1) {
        var vector = true;
        var n = (size(state)[0] - 1) / 2;
        var T = multiply(state[2 * n][0], [n, 1]);
        var time = state[2 * n][0]
        reshape(state, [n, 2]);
        concat(state, T);
    }
    else {
        var vector = false;
        var n = size(state)[0];
        var T = column(state, 2);
    }
    var V = column(state, 0);

    var state1 = state;
    var V1 = V;
    var T1 = T;
    var A1 = acceleration(state1, params);
    var K1 = multiply(dt, concat(V1, A1, T1));

    var state2 = add(state, divide(K1, 2));
    var V2 = coloumn(state2, 1);
    var T2 = add(dt / 2, T);
    var A2 = acceleration(state2, params);
    var K2 = multiply(dt, concat(V2, A2, T2));

    var state3 = add(state, divide(K2, 2));
    var V3 = coloumn(state3, 1);
    var T3 = T2;
    var A3 = acceleration(state3, params);
    var K3 = multiply(dt, concat(V3, A3, T3));

    var state4 = add(state, K3);
    var V4 = coloumn(state4, 1);
    var T4 = add(dt, T);
    var A4 = acceleration(state4, params);
    var K4 = multiply(dt, concat(V4, A4, T4));

    state = add(state, divide(add(K1, add(multiply(2, K2), add(multiply(2, K3), K4))), 6));

    if (vector) {
        state = concat(column(state, 0), column(state, 1));
        reshape(state, [2 * n, 1]);
        state = resize(state, [2 * n + 1, 1], time)

        return state;
    }
    else {
        return state;
    }
}
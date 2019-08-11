/** Single Runge-Kutta step in time for Euler-Lagrange-eq or Newton's equation of motion.
 * n is the number of generalised coordinates X/velocities V.
 * state-matrix: [X, V] vertical stacked, i = 1 - n
 * @param {matrix} state matrix: shape = [n, 2]
 * @param {dictionary} params physical parameter, model parameters, external forces, etc.
 * @param {function} acceleration acceleration(state = [n, 2]-matrix, time = number, params = dictionary)
 * @param {number} dt timestep fixes time discretisation
 */
function step(state, time, params, acceleration, dt = 0.001) {
    checkTypes(state, params, acceleration);
    checkShape(state);
    var n = math.size(state)[0];

    var state1 = state;
    var V1 = math.reshape([math.column(state, 1)], [n, 1]);;
    var T1 = time;
    var A1 = acceleration(state1, T1, params);
    var K1 = math.multiply(dt, math.concat(V1, A1, 1));

    var state2 = math.add(state, math.divide(K1, 2));
    var V2 = math.reshape([math.column(state2, 1)], [n, 1]);
    var T2 = time + dt / 2;
    var A2 = acceleration(state2, T2, params);
    var K2 = math.multiply(dt, math.concat(V2, A2, 1));

    var state3 = math.add(state, math.divide(K2, 2));
    var V3 = math.reshape([math.column(state3, 1)], [n, 1]);
    var T3 = T2;
    var A3 = acceleration(state3, T3, params);
    var K3 = math.multiply(dt, math.concat(V3, A3, 1));

    var state4 = math.add(state, K3);
    var V4 = math.reshape([math.column(state4, 1)], [n, 1]);
    var T4 = time + dt;
    var A4 = acceleration(state4, T4, params);
    var K4 = math.multiply(dt, math.concat(V4, A4, 1));

    state = math.add(state, math.divide(math.add(K1, math.add(math.multiply(2, K2), math.add(math.multiply(2, K3), K4))), 6));

    return [state, T4];
}
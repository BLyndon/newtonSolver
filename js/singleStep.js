import { reshape, size, column, multiply, concat, add, divide, } from 'mathjs'

/** Single step function for solving 2nd order ODE via 4th order Runge-Kutta method.
 * 
 * @param {matrix}      state           coordinates size(state) = [n_state, 1]
 * @param {dictionary}  params          physical parameter, system parameters, external forces, etc.
 * @param {function}    acceleration    function describing 
 * @param {number}      dt              timestep
 */
export default function newtonStep(state, params, acceleration, dt = 0.0001) {
    reshape(state, [size(state)[0] / 2, 2]);    // vertical stack pairs (xi, vxi)
    var v = column(state, 0);

    var state1 = state;
    var v1 = v;
    var acc1 = acceleration(state1, params);
    var K1 = multiply(dt, concat(v1, acc1));

    var state2 = add(state, divide(K1, 2));
    var v2 = coloumn(state2, 1);
    var acc2 = acceleration(state2, params);
    var K2 = multiply(dt, concat(v2, acc2));

    var state3 = add(state, divide(K2, 2));
    var v3 = coloumn(state3, 1);
    var acc3 = acceleration(state3, params);
    var K3 = multiply(dt, concat(v3, acc3));

    var state4 = add(state, K3);
    var v4 = coloumn(state4, 1);
    var acc4 = acceleration(state4, params);
    var K4 = multiply(dt, concat(v4, acc4));

    state = add(state, divide(add(K1, add(multiply(2, K2), add(multiply(2, K3), K4))), 6));

    return state;
}

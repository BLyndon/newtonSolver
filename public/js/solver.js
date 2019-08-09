import { reshape, size, column, multiply, concat, add, divide, resize } from 'mathjs';

/** RK-Solver for Euler-Lagrange-eq. or Newton's eq. of motion.
 * n is the number of generalised coordinates X/velocities V.
 *  state-vector: [x1, v1, ..., xn, vn, t] (alternating arrangement important for reshaping)
 *  state-matrix: [X, V, T] vertical stacked, i = 1 - n
 * @param {matrix} initialState vector: shape = [2n+1, 1]; matrix: shape = [n, 3]
 * @param {dictionary} params physical parameter, model parameters, external forces, etc.
 * @param {function} acceleration acceleration(state = [n, 3]-matrix, params = dictionary)
 * @param {number} numIterations number of steps
 * @param {number} dt timestep fixes time discretisation
 */
function solRK(initialState, params, acceleration, numIterations, saveTrajectory, dt = 0.0001) {
    var elapsedTime = numIterations * dt;
    var trajectory = saveHistory ? [] : null;
    var state = initialState;

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

    for (let i = 0; i < numIterations; i++) {
        state = step(state, params, acceleration, dt);
        if (saveTrajectory) trajectory.push([column(state, 0), i * dt]);
    }

    if (vector) {
        state = concat(column(state, 0), column(state, 1));
        reshape(state, [2 * n, 1]);
        state = resize(state, [2 * n + 1, 1], time)

        return saveTrajectory ? [state, trajectory] : [state, elapsedTime];
    }
    else {
        return saveTrajectory ? [state, trajectory] : [state, elapsedTime];
    }
}
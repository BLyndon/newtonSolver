/** RK-Solver for Euler-Lagrange-eq. or Newton's eq. of motion.
 * n is the number of generalised coordinates X/velocities V.
 * state-matrix: [X, V] vertical stacked, i = 1 - n
 * @param {matrix} initialState matrix: shape = [n, 2]
 * @param {dictionary} params physical parameter, model parameters, external forces, etc.
 * @param {function} acceleration acceleration(state = [n, 2]-matrix, time = number, params = dictionary)
 * @param {number} numIterations number of steps
 * @param {number} dt timestep fixes time discretisation
 */
function solverRK(initialState, time, params, acceleration, numIterations, saveTrajectory = false, dt = 0.001) {
    checkTypes(initialState, params, acceleration);
    checkShape(initialState);

    var elapsedTime = numIterations * dt;
    var trajectory = saveTrajectory ? [] : null;
    var state = initialState;
    var t = time;

    for (let i = 0; i < numIterations; i++) {
        [state, t] = step(state, time, params, acceleration, dt);
        if (saveTrajectory) trajectory.push([math.column(state, 0), t]);
    }


    return saveTrajectory ? [state, trajectory] : [state, elapsedTime];

}
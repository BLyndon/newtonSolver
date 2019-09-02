function rot2d(vec, angle) {
    let R = math.ones([2, 2]);

    R[0][0] = math.cos(angle);
    R[1][1] = math.cos(angle);
    R[1][0] = math.sin(angle);
    R[0][1] = -math.sin(angle);

    return math.multiply(R, vec);
}

function sol(t) {
    let [x, y] = [math.sin(t) / 2 + math.sin(math.sqrt(3) * t) / (2 * math.sqrt(3)), math.sin(t) / 2 - math.sin(math.sqrt(3) * t) / (2 * math.sqrt(3))];
    return [x, y];
}

function acc(state, t, parameter) {
    let x = state[0][0];
    let y = state[1][0];
    let m = parameter.m;
    let k1 = parameter.k1;
    let k2 = parameter.k2;
    let a = math.ones([math.size(state)[0], 1]);
    a[0][0] = (k2 * y - (k1 + k2) * x) / m;
    a[1][0] = (k2 * x - (k1 + k2) * y) / m;
    return a;
}
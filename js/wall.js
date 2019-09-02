function wall(X, phi, len, canvasSize) {
    stroke(125);
    strokeWeight(2);

    let [x1, x2] = X;
    line(x1, x2, x1 + len * math.cos(phi), x2 + len * math.sin(phi));
    a = canvasSize.x / 50;
    n = len / a;

    for (let i = 0; i < n; i++) {
        y1 = x1 + a * math.cos(phi + math.pi / 4);
        y2 = x2 + a * math.sin(phi + math.pi / 4);

        line(x1, x2, y1, y2);

        x1 = x1 + a * math.cos(phi);
        x2 = x2 + a * math.sin(phi);
    }

}
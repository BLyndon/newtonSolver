function mass(X, canvasSize) {
    let width = canvasSize.x / 10;
    let height = 2 * width / 3;


    // stroke(100);
    // strokeWeight(1);

    line(X[0], X[1] - 1.6 * canvasSize.y / 12, X[0], X[1] + 1.6 * canvasSize.y / 12);

    fill(255, 204, 0);
    rect(X[0] - width / 2, X[1] - height / 2, width, height);
}
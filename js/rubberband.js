function rubberBand(x, y, length0) {
    var length = Math.abs(x[0] - y[0]);

    var width = 6 * length0 / length;
    stroke(100);
    strokeWeight(1);
    fill(100);
    rect(x[0], x[1] - width / 2, length, width);
}
const canvasSize = {
  x: 640,
  y: 400
};
const fps = 60;
const length = 1.6 * canvasSize.y / 2;
const margin = 40;
const amplitude = 75;

var dt = 1 / fps;
dt = dt.toPrecision(3);
var t = 0;

const params = {
  m: 1,
  k1: 1,
  k2: 1
};

var stateAna = [0, 0];
var stateNum = math.resize([[0, 1], [0, 0]], [2, 2]);

var levelAna = margin + length / 3;
var levelNum = margin + 2 * length / 3;

var rAnaL = [canvasSize.x / 3, levelAna];
var rAnaR = [2 * canvasSize.x / 3, levelAna];
var rNumL = [canvasSize.x / 3, levelNum];
var rNumR = [2 * canvasSize.x / 3, levelNum];

function setup() {
  createCanvas(canvasSize.x, canvasSize.y);
}

function draw() {
  background(200, 200, 200);
  fill(100);
  textSize(25);
  text("dt = " + dt + ",   time = " + Math.floor(t) + "s", 3 * margin / 2, margin);
  textSize(15);
  text("analytical", 3 * margin / 2, levelAna - 10);
  text("numerical", 3 * margin / 2, levelNum - 10);

  let XL = [margin, margin];
  let XR = [canvasSize.x - margin, margin + length];

  wall(XL, math.pi / 2, length, canvasSize);
  wall(XR, -math.pi / 2, length, canvasSize);

  rubberBand([margin, levelAna], rAnaL, canvasSize.y / 3);
  rubberBand(rAnaL, rAnaR, canvasSize.y / 3);
  rubberBand(rAnaR, [canvasSize.x - margin, levelAna], canvasSize.y / 3);

  rubberBand([margin, levelNum], rNumL, canvasSize.y / 3);
  rubberBand(rNumL, rNumR, canvasSize.y / 3);
  rubberBand(rNumR, [canvasSize.x - margin, levelNum], canvasSize.y / 3);

  mass(rAnaL, canvasSize);
  mass(rAnaR, canvasSize);
  mass(rNumL, canvasSize);
  mass(rNumR, canvasSize);

  stateAna = sol(t);
  [stateNum, t] = step(stateNum, t, params, acc, 1 / fps);

  rAnaL = [canvasSize.x / 3 + amplitude * stateAna[0], levelAna];
  rAnaR = [2 * canvasSize.x / 3 + amplitude * stateAna[1], levelAna];
  rNumL = [canvasSize.x / 3 + amplitude * stateNum[0][0], levelNum];
  rNumR = [2 * canvasSize.x / 3 + amplitude * stateNum[1][0], levelNum];
}
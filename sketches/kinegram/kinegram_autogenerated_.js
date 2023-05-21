let canvas1, canvas2;
let vel = 0,
  dir = 1;
var currentOption = 1;

function setup() {
  createCanvas(600, 330);
  canvas1 = createGraphics(150, 150);
  canvas2 = createGraphics(150, 150);
  checkbox = createCheckbox("Correr animación", false);
  checkbox.position(10, 280);
  checkbox2 = createCheckbox("Mostrar patrón de líneas", false);
  checkbox2.position(10, 300);
  sel = createSelect();
  sel.position(170, 10);
  sel.option("Rueda");
  sel.option("Circulos");
  sel.changed(mySelectEvent);
}

function draw() {
  background(220);
  canvas1.background("yellow");
  textSize(13);
  text("Fotogramas", 15, 185);
  if (currentOption == 1) {
    drawWheel(canvas1, 0);
    image(canvas1, 0, 0);
  } else {
    if (currentOption == 2) {
      drawCircles(canvas1, 0);
      image(canvas1, 0, 0);
    }
  }
  t = 0;
  var [nFrames, tStep, strokeW, space, plus] = [4, 1, 6, 2, 0];
  if (currentOption == 2)
    [nFrames, tStep, strokeW, space, plus] = [4, 20, 6, 2, 0];
  frames = [];
  for (let y = 0; y < nFrames; y += 1) {
    if (currentOption == 1) drawWheel(canvas1, t);
    else if (currentOption == 2) drawCircles(canvas1, t);
    frames[y] = canvas1.get(0, 0, canvas1.width, canvas1.height);
    t += tStep;
    image(frames[y], 15 + y * 60, 200, 50, 50);
  }

  k = 0;
  for (let y = 0; y < canvas1.height; y += space) {
    let strip = frames[k % nFrames].get(0, y, canvas1.width, space);
    image(
      strip,
      (width * 3) / 4 - canvas1.width / 2,
      height / 2 - canvas1.height / 2 + y
    );
    k += 1;
  }

  if (checkbox2.checked())
    drawLines(320, 90 + vel, strokeW, strokeW + space + plus);
  if (checkbox.checked()) vel += 0.8 * dir;
  if (vel > 30 || vel < 0) {
    dir *= -1;
  }
}

function mySelectEvent() {
  let item = sel.value();
  if (item == "Rueda") {
    currentOption = 1;
  } else {
    if (item == "Circulos") currentOption = 2;
  }
}
// patrón de líneas superpuestas
function drawLines(beginX, beginY, strokeW, space) {
  for (let i = beginY; i < beginY + 200; i += space) {
    line(beginX, i, beginX + 250, i);
  }
  strokeWeight(strokeW);
  strokeCap(SQUARE);
}
// dibujo de la rueda
function drawWheel(canvas, t) {
  posX = rad = canvas.width;
  posY = canvas.height;
  canvas.noStroke();
  canvas.fill("red");
  canvas.ellipse(posX / 2, posY / 2, rad);
  canvas.fill("blue");
  canvas.arc(posX / 2, posY / 2, rad, rad, 0 + t, QUARTER_PI / 2 + t);
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 8 + t,
    (QUARTER_PI / 2) * 9 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 12 + t,
    (QUARTER_PI / 2) * 13 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 20 + t,
    (QUARTER_PI / 2) * 21 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 6 + t,
    (QUARTER_PI / 2) * 7 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 14 + t,
    (QUARTER_PI / 2) * 15 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 10 + t,
    (QUARTER_PI / 2) * 11 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 18 + t,
    (QUARTER_PI / 2) * 19 + t
  );
  canvas.fill("white");
  canvas.ellipse(posX / 2, posY / 2, 20);
}
// dibujo de los círculos
function drawCircles(canvas, t) {
  posX = rad = canvas.width;
  posY = canvas.height;
  canvas.noStroke();
  canvas.fill("red");
  canvas.circle(posX / 2, posY / 2, rad);
  canvas.strokeWeight(12);
  canvas.noFill();
  canvas.stroke("blue");
  canvas.circle(posX / 2, posY / 2, rad - 50 + t);
  canvas.circle(posX / 2, posY / 2, rad - 100 + t);
  canvas.circle(posX / 2, posY / 2, rad - 150 + t);
}

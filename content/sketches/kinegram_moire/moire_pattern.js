let checkbox;
let sel;
let currentPattern = 1;
let xpos = 380;
let xspeed = 0.5;
let xdir = 1;
let ypos = 250;
let yspeed = 0.1;
let dir = 1;

let myFont;
function preload() {
  myFont = loadFont("/showcase/sketches/kinegram_moire/narrowFont.ttf");
}

function setup() {
  createCanvas(600, 400);
  checkbox = createCheckbox("run", true);
  checkbox.changed(checkLoop);
  checkbox.position(10, 360);
  sel = createSelect();
  sel.position(10, 10);
  sel.option("Line moiré");
  sel.option("Moiré pattern");
  sel.option("Shape moiré");
  sel.selected("Line moiré");
  sel.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = sel.value();
  if (item == "Line moiré") {
    currentPattern = 1;
  } else {
    if (item == "Moiré pattern") {
      currentPattern = 2;
    } else {
      if (item == "Shape moiré") {
        currentPattern = 3;
      }
    }
  }
}

function checkLoop() {
  if (this.checked()) {
    loop();
  } else {
    noLoop();
  }
}

function draw() {
  background(200);
  setupDefaultText();
  if (currentPattern == 1) {
    drawLines("v", 240, 120, 4, 10, 220, 250);
    drawLines("v", 300, 80 - (frameCount % 50) * 0.3, 5, 8, 220, 250);
  }
  if (currentPattern == 2) {
    drawCircles(380, 200);
    xpos = xpos + xspeed * xdir;
    if (xpos > 420 || xpos < 340) xdir *= -1;
    drawCircles(xpos, 200);
  }
  if (currentPattern == 3) {
    ypos = ypos - yspeed * 2 * dir;
    //drawLines("h", 35, ypos, 6, 6, 300, 300);
    drawLines("h", 35, ypos, 7, 8, 300, 300);
    if (ypos > 250 || ypos < 220) dir = dir * -1;
    drawText(100, "V");
    drawText(170, "e");
    drawText(240, "9");
    drawText(310, ">");
  }
}

function setupDefaultText() {
  fill(0);
  textFont("Georgia");
  textSize(15);
  text("pattern type", 130, 27);
  noFill();
}

function drawLines(type, beginX, beginY, strokeW, space, n1, n2) {
  for (let i = beginY; i < beginY + n1; i += space) {
    if (type == "v") {
      line(beginX, i, beginX + n2, i);
    }
    if (type == "h") {
      line(i, beginX, i, beginX + n2);
    }
  }
  strokeWeight(strokeW);
  strokeCap(SQUARE);
}

function drawCircles(beginX, beginY) {
  for (let i = 0; i < beginY + 100; i += 12) {
    circle(beginX, beginY, i);
  }
  strokeWeight(3);
  noFill();
}

function drawText(ypos, inputText) {
  outputText = "";
  for (let i = 0; i < 38; i += 1) {
    outputText += inputText;
  }
  fill(0);
  textFont(myFont);
  textSize(50);
  text(outputText, 250, ypos);
}

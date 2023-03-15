let img;

let sliderX;
let showTrees;
let treemode = false;

function setup() {
  createCanvas(650, 459);
  sliderX = createSlider(-50, 50, 0);
  sliderX.position(30, 10);
  sliderY = createSlider(1, height, height / 2, 0);
  sliderY.position(-50, 80);
  sliderY.style("transform", "rotate(270deg)");
  showTrees = createButton(treemode ? "Hide Trees" : "Show Trees");
  showTrees.position(width * (4 / 5), 10);
  showTrees.mousePressed(treeMode);
}

function preload() {
  img = loadImage("/showcase/sketches/monocular_cues/tree.png");
}
let finalLine;
let XDeviation;

let state = true;
let movement = false;

function draw() {
  sliderY.style("display", treemode ? "none" : "block");
  showTrees.html(treemode ? "Hide Trees" : "Show Trees");
  background("#519e52");
  XDeviation = sliderX.value();
  finalLine = sliderY.value();
  drawBackgroundLines(finalLine);
  let horizon = finalLine;
  stroke("black");
  line(0, horizon, width, horizon);
  drawSky(horizon);
  drawVanishingRoad(horizon);
}

function drawTree(img, posX, posY, sizeX, sizeY) {
  let newImg = img.get();
  newImg.resize(sizeX, sizeY);
  image(newImg, posX, posY);
}

function treeMode() {
  treemode = !treemode;

  sliderY.value(height / 2);
}

function drawBackgroundLines(finalPos) {
  stroke("#326133");
  let posY = finalPos;
  let difference = height - finalPos;
  for (let i = 0; i <= 30; i++) {
    posY += ((difference / 30) * i) / 15;
    line(0, posY, width, posY);
  }
  return posY;
}

function drawSky(horizon) {
  noStroke();
  fill("#87ceeb");
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, horizon);
  vertex(0, horizon);
  endShape();
}

function drawVanishingRoad(posY) {
  stroke("black");
  fill("#5f5f5f");

  //Vía
  beginShape();
  vertex(width * (1 / 10) + XDeviation * 10, height);
  vertex(width / 2 - width / 150, posY);
  vertex(width / 2 + width / 150, posY);
  vertex(width * (9 / 10) + XDeviation * 10, height);
  endShape();

  //Andénes
  fill("#c4c4c4");
  beginShape();
  vertex(width * (1 / 10) + XDeviation * 10, height);
  vertex(width / 2 - width / 150, posY);
  vertex(0 + XDeviation * 10, height);
  endShape();

  beginShape();
  vertex(width * (9 / 10) + XDeviation * 10, height);
  vertex(width / 2 + width / 150, posY);
  vertex(width + XDeviation * 10, height);
  endShape();

  fill("white");
  //líneas del centro
  beginShape();
  vertex(width / 2 - 2 * (width * (1 / 40)) + XDeviation * 10, height);
  vertex(width / 2 - width / 1000, posY);
  vertex(width / 2 - width * (1 / 70) + XDeviation * 10, height);
  endShape();

  beginShape();
  vertex(width / 2 + 2 * (width * (1 / 40)) + XDeviation * 10, height);
  vertex(width / 2 + width / 1000, posY);
  vertex(width / 2 + width * (1 / 70) + XDeviation * 10, height);
  endShape();

  //árboles
  if (treemode) {
    drawTree(img, width / 2.7 + XDeviation * 1.85, height - posY, 50, 50);
    drawTree(
      img,
      width / 2.7 + XDeviation * 1.85 + width * (4.15 / 24),
      height - posY,
      50,
      50
    );
    drawTree(img, width / 4 + XDeviation * 3.9, height - posY / 1, 100, 100);
    drawTree(
      img,
      width / 4 + XDeviation * 3.9 + width * (4.15 / 12),
      height - posY / 1,
      100,
      100
    );
    drawTree(img, XDeviation * 7.8, height - posY / 1, 200, 200);
    drawTree(
      img,
      XDeviation * 7.8 + width * (4.15 / 6),
      height - posY / 1,
      200,
      200
    );
  }

  //
}

let colorPicker1, colorPicker2;
let sliderMode1, sliderMode2;
let selectMode1, selectMode2;
let shaderMode1, shaderMode2;
let mode1 = 1;
let mode2 = 2;
let brightness1 = 1.0;
let brightness2 = 1.0;

function preload() {
  shaderMode1 = loadShader(
    "/showcase/sketches/coloring/shader.vert",
    "/showcase/sketches/coloring/shader.frag"
  );
  shaderMode2 = loadShader(
    "/showcase/sketches/coloring/shader.vert",
    "/showcase/sketches/coloring/shader.frag"
  );
}

function setup() {
  createCanvas(600, 400);

  colorPicker1 = createColorPicker("#F09A9A");
  colorPicker1.position(width / 2 - 140, height - 60);
  colorPicker2 = createColorPicker("#E2D98D");
  colorPicker2.position(width / 2 + 80, height - 60);

  selectMode1 = createSelect();
  selectMode1.position(15, height / 2 - 70);
  selectMode1.option("BLEND");
  selectMode1.option("DARKEST");
  selectMode1.option("LIGHTEST");
  selectMode1.option("ADDITION");
  selectMode1.option("PLUS DARKER");
  selectMode1.option("SUBSTRACT");
  selectMode1.option("MULTIPLY");
  selectMode1.option("SCREEN");
  selectMode1.option("OVERLAY");
  selectMode1.selected("LIGHTEST");
  selectMode1.changed(mySelectEvent);

  selectMode2 = createSelect();
  selectMode2.position(15, height / 2 + 50);
  selectMode2.option("BLEND");
  selectMode2.option("DARKEST");
  selectMode2.option("LIGHTEST");
  selectMode2.option("ADDITION");
  selectMode2.option("PLUS DARKER");
  selectMode2.option("SUBSTRACT");
  selectMode2.option("MULTIPLY");
  selectMode2.option("SCREEN");
  selectMode2.option("OVERLAY");
  selectMode2.selected("DARKEST");
  selectMode2.changed(mySelectEvent);

  sliderMode1 = createSlider(0, 255, 50);
  sliderMode1.position(width - 110, height / 2 - 70);
  sliderMode1.style("width", "80px");
  sliderMode2 = createSlider(0, 255, 200);
  sliderMode2.position(width - 110, height / 2 + 50);
  sliderMode2.style("width", "80px");

  colorMode1 = createGraphics(100, 120, WEBGL);
  colorMode1.shader(shaderMode1);
  colorMode2 = createGraphics(100, 120, WEBGL);
  colorMode2.shader(shaderMode2);
}

function draw() {
  background(220);
  c1 = colorPicker1.color();
  c2 = colorPicker2.color();

  shaderMode1.setUniform("uMaterial1", c1._array);
  shaderMode1.setUniform("uMaterial2", c2._array);
  shaderMode1.setUniform("blendMode", mode1);
  if (mode1 == 1 || mode1 == 2 || mode1 == 3) {
    brightness_1 = sliderMode1.value() / 255;
    sliderMode1.show();
  } else {
    brightness_1 = 1.0;
    sliderMode1.hide();
  }
  shaderMode1.setUniform("brightness", brightness_1);
  colorMode1.rect(0, 0, 100, 100);

  shaderMode2.setUniform("uMaterial1", c1._array);
  shaderMode2.setUniform("uMaterial2", c2._array);
  shaderMode2.setUniform("blendMode", mode2);
  if (mode2 == 1 || mode2 == 2 || mode2 == 3) {
    brightness2 = sliderMode2.value() / 255;
    sliderMode2.show();
  } else {
    brightness2 = 1.0;
    sliderMode2.hide();
  }
  shaderMode2.setUniform("brightness", brightness2);
  colorMode2.rect(0, 0, 100, 100);

  imageMode(CENTER);
  rectMode(CENTER);
  image(colorMode1, width / 2, height / 2 - 65);
  fill(colorPicker1.color());
  rect(width / 2 - 110, height / 2, 100, 250);
  noFill();
  rect(width / 2, height / 2 - 65, 100, 120);
  fill(colorPicker2.color());
  rect(width / 2 + 110, height / 2, 100, 250);

  colorMode2.rect(0, 0, 100, 100);
  image(colorMode2, width / 2, height / 2 + 65);
  noFill();
  rect(width / 2, height / 2 + 65, 100, 120);
}

function mySelectEvent() {
  if (selectMode1.value() == "BLEND") mode1 = 1;
  if (selectMode1.value() == "DARKEST") mode1 = 2;
  if (selectMode1.value() == "LIGHTEST") mode1 = 3;
  if (selectMode1.value() == "ADDITION") mode1 = 4;
  if (selectMode1.value() == "PLUS DARKER") mode1 = 5;
  if (selectMode1.value() == "SUBSTRACT") mode1 = 6;
  if (selectMode1.value() == "MULTIPLY") mode1 = 7;
  if (selectMode1.value() == "SCREEN") mode1 = 8;
  if (selectMode1.value() == "OVERLAY") mode1 = 9;
  if (selectMode2.value() == "BLEND") mode2 = 1;
  if (selectMode2.value() == "DARKEST") mode2 = 2;
  if (selectMode2.value() == "LIGHTEST") mode2 = 3;
  if (selectMode2.value() == "ADDITION") mode2 = 4;
  if (selectMode2.value() == "PLUS DARKER") mode2 = 5;
  if (selectMode2.value() == "SUBSTRACT") mode2 = 6;
  if (selectMode2.value() == "MULTIPLY") mode2 = 7;
  if (selectMode2.value() == "SCREEN") mode2 = 8;
  if (selectMode2.value() == "OVERLAY") mode2 = 9;
}

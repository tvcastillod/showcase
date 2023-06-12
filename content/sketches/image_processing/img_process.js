let img, myShader;
let mode = 2;
let mask5 = false;
let tool = 2;
let btool = 1;
let zoom = 0.3;

function preload() {
  img = loadImage("/showcase/sketches/image_processing/anim2.png");
  myShader = loadShader(
    "/showcase/sketches/image_processing/shader.vert",
    "/showcase/sketches/image_processing/shader.frag"
  );
}

function setup() {
  createCanvas(400, 400, WEBGL);
  input = createFileInput(handleFile);
  input.position(10, height + 15);
  selectMode = createSelect();
  selectMode.position(410, 35);
  selectMode.option("IDENTITY");
  selectMode.option("RIDGE");
  selectMode.option("SHARPEN");
  selectMode.option("SHARPEN2");
  selectMode.option("GAUSSIAN BLUR");
  selectMode.option("EMBOSS");
  selectMode.changed(mySelectEvent);
  selectMode.selected("RIDGE");
  selectTool = createSelect();
  selectTool.position(410, 90);
  selectTool.option("NONE");
  selectTool.option("ROI");
  selectTool.option("MAGNIFIER");
  selectTool.changed(mySelectEvent2);
  selectTool.selected("ROI");
  slider = createSlider(20, 100, 80);
  slider.position(410, 140);
  slider.style("width", "100px");
  sliderZoom = createSlider(0.1, 0.6, 0.3, 0.05);
  sliderZoom.position(410, 190);
  sliderZoom.style("width", "100px");
  radio = createRadio();
  radio.option("1", " none  \n");
  radio.option("2", "intensity");
  radio.option("3", "value\n  ");
  radio.option("4", "lightness");
  radio.option("5", "luma");
  radio.style("width", "80px");
  radio.selected("1");
  radio.position(408, 280);
  let text1 = createSpan("Mask");
  text1.position(410, 10);
  let text2 = createSpan("Tool");
  text2.position(410, 65);
  let text3 = createSpan("Size");
  text3.position(410, 120);
  let text4 = createSpan("Zoom");
  text4.position(410, 170);
  let text5 = createSpan("Brightness");
  text5.position(410, 250);
}

let mask_ = [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];
let mask2 = [
  1 / 256,
  4 / 256,
  6 / 256,
  4 / 256,
  1 / 256,
  4 / 256,
  16 / 256,
  24 / 256,
  16 / 256,
  4 / 256,
  6 / 256,
  24 / 256,
  36 / 256,
  24 / 256,
  6 / 256,
  4 / 256,
  16 / 256,
  24 / 256,
  16 / 256,
  4 / 256,
  1 / 256,
  4 / 256,
  6 / 256,
  4 / 256,
  1 / 256,
];
function draw() {
  background(225);
  switch (mode) {
    case 1:
      mask_ = [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];
      break;
    case 2:
      mask_ = [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0];
      break;
    case 3:
      mask_ = [0.0, -1.0, 0.0, -1.0, 5.0, -1.0, 0.0, -1.0, 0.0];
      break;
    case 4:
      mask_ = [-1.0, -1.0, -1.0, -1.0, 9.0, -1.0, -1.0, -1.0, -1.0];
      break;
    case 5:
      mask2 = [
        1 / 273,
        4 / 273,
        7 / 273,
        4 / 273,
        1 / 273,
        4 / 273,
        16 / 273,
        26 / 273,
        16 / 273,
        4 / 273,
        7 / 273,
        26 / 273,
        41 / 273,
        26 / 273,
        7 / 273,
        4 / 273,
        16 / 273,
        26 / 273,
        16 / 273,
        4 / 273,
        1 / 273,
        4 / 273,
        7 / 273,
        4 / 273,
        1 / 273,
      ];
      break;
    case 6:
      mask2 = [
        0, 0, 0, 0, 0, 0, -2, -1, 0, 0, 0, -1, 1, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0,
        0, 0,
      ];
      break;
    default:
    //
  }
  shader(myShader);
  myShader.setUniform("texture", img);
  myShader.setUniform("mask5", mask5);
  myShader.setUniform("mask", mask_);
  myShader.setUniform("mask2", mask2);
  myShader.setUniform("texOffset", [1 / img.width, 1 / img.height]);
  myShader.setUniform("mousePos", [
    mouseX * pixelDensity(),
    (height - mouseY) * pixelDensity(),
  ]);
  rect(0, 0, 100, 100);
  myShader.setUniform("radius", slider.value());
  myShader.setUniform("tool", tool);
  myShader.setUniform("btool", radio.value());

  // valores adaptados de https://gamedevserj.github.io/godot-magnifying-glass-tutorial.html
  zoom = sliderZoom.value();
  xOffset = (zoom * mouseX) / width;
  yOffset = (zoom * mouseY) / height;

  var tiling = [1 - zoom, 1 - zoom];
  var offset = [xOffset, yOffset];

  myShader.setUniform("tiling", tiling);
  myShader.setUniform("offset", offset);
}

function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data);
  } else {
    alert("El archivo seleccionado no es una imagen.");
  }
}

function mySelectEvent() {
  if (selectMode.value() == "IDENTITY") {
    mode = 1;
    mask5 = false;
  }
  if (selectMode.value() == "RIDGE") {
    mode = 2;
    mask5 = false;
  }
  if (selectMode.value() == "SHARPEN") {
    mode = 3;
    mask5 = false;
  }
  if (selectMode.value() == "SHARPEN2") {
    mode = 4;
    mask5 = false;
  }
  if (selectMode.value() == "GAUSSIAN BLUR") {
    mode = 5;
    mask5 = true;
  }
  if (selectMode.value() == "EMBOSS") {
    mode = 6;
    mask5 = true;
  }
}

function mySelectEvent2() {
  if (selectTool.value() == "NONE") tool = 1;
  if (selectTool.value() == "ROI") tool = 2;
  if (selectTool.value() == "MAGNIFIER") tool = 3;
}

var s1 = function (sketch) {
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(570, 50, sketch.WEBGL);
    canvas1.position(0, 400);
  };
  sketch.draw = function () {
    sketch.background(230);
  };
};

new p5(s1);

var s2 = function (sketch) {
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(170, 400, sketch.WEBGL);
    canvas1.position(400, 0);
  };
  sketch.draw = function () {
    sketch.background(230);
  };
};

new p5(s2);

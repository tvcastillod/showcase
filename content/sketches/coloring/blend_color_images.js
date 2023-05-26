let mode = 1;
let brightness_ = 1.0;
let layer;

var s1 = function (sketch) {
  let img, myShader;
  sketch.preload = function () {
    img = sketch.loadImage("/showcase/sketches/coloring/lenna.png");
    myShader = sketch.loadShader(
      "/showcase/sketches/coloring/shader_img.vert",
      "/showcase/sketches/coloring/shader_img.frag"
    );
  };
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(300, 300, sketch.WEBGL);
    canvas1.position(0, 0);
    sketch.input = sketch.createFileInput(handleFile);
    sketch.input.position(10, canvas1.height + 15);
  };
  sketch.draw = function () {
    sketch.background(220);
    sketch.shader(myShader);
    if (mode == 1 || mode == 2 || mode == 3) {
      brightness_ = sliderMode.value() / 255;
    } else {
      brightness_ = 1.0;
    }
    myShader.setUniform("blendMode", mode);
    myShader.setUniform("brightness", brightness_);
    myShader.setUniform("base", img);
    myShader.setUniform("layer", layer);
    sketch.rect(0, 0, 100, 100);
  };
  function handleFile(file) {
    if (file.type === "image") {
      img = sketch.loadImage(file.data);
    } else {
      alert("El archivo seleccionado no es una imagen.");
    }
  }
};

// codigo base para crear dos canvas diferentes: https://editor.p5js.org/caminofarol/sketches/r609C2cs
// se crea una nueva instancia de p5 pasando la función para el sketch 1
new p5(s1);

var s2 = function (sketch) {
  sketch.preload = function () {
    layer = sketch.loadImage("/showcase/sketches/coloring/black-gradient.jpg");
  };
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(300, 300, sketch.WEBGL);
    canvas1.position(300, 0);
    sketch.input = sketch.createFileInput(handleFile);
    sketch.input.position(310, canvas1.height + 15);
  };
  sketch.draw = function () {
    sketch.background(220);
    sketch.layer = imgResize(layer);
    sketch.image(layer, -150, -150);
  };
};

new p5(s2);

function handleFile(file) {
  if (file.type === "image") {
    layer = loadImage(file.data);
  } else {
    alert("El archivo seleccionado no es una imagen.");
  }
}

function imgResize(img) {
  let imgW, imgH;
  if (img != null && img.width > 10) {
    if (img.width > 300 || img.height > 300) {
      /*si el tamaño de la imagen es muy grande,
        se hace un reajuste*/
      if (img.width - img.height < 50 || img.width <= img.height) {
        imgW = (300 * img.width) / img.height;
        imgH = 300;
      } else {
        imgW = 300;
        imgH = (300 * img.height) / img.width;
      }
      return img.resize(imgW, imgH);
    }
  }
}

function setup() {
  createCanvas(600, 400);
  background(220);
  selectMode = createSelect();
  selectMode.position(10, 350);
  selectMode.option("BLEND");
  selectMode.option("DARKEST");
  selectMode.option("LIGHTEST");
  selectMode.option("ADDITION");
  selectMode.option("PLUS DARKER");
  selectMode.option("SUBSTRACT");
  selectMode.option("MULTIPLY");
  selectMode.option("SCREEN");
  selectMode.option("OVERLAY");
  selectMode.selected("BLEND");
  selectMode.changed(mySelectEvent);
  sliderMode = createSlider(0, 255, 150);
  sliderMode.position(150, 350);
  sliderMode.style("width", "80px");
}

function draw() {
  noStroke();
  fill(220);
  rect(235, 340, 240, 360);
  fill(0);
  textSize(12);
  text(sliderMode.value() / 255, 240, 357);
  noStroke();
  fill(220);
  rect(263, 340, 240, 360);
}

function mySelectEvent() {
  if (selectMode.value() == "BLEND") mode = 1;
  if (selectMode.value() == "DARKEST") mode = 2;
  if (selectMode.value() == "LIGHTEST") mode = 3;
  if (selectMode.value() == "ADDITION") mode = 4;
  if (selectMode.value() == "PLUS DARKER") mode = 5;
  if (selectMode.value() == "SUBSTRACT") mode = 6;
  if (selectMode.value() == "MULTIPLY") mode = 7;
  if (selectMode.value() == "SCREEN") mode = 8;
  if (selectMode.value() == "OVERLAY") mode = 9;
}

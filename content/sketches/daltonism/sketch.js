let img; // imagen original
let newImg; // imagen transformada
let dropdown;

var colorMats = {
  Normal: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  Protanopia: [
    [0.567, 0.433, 0.0],
    [0.558, 0.442, 0.0],
    [0.0, 0.242, 0.758],
  ],
  Protanomaly: [
    [0.817, 0.183, 0.0],
    [0.333, 0.667, 0.0],
    [0.0, 0.125, 0.875],
  ],
  Deuteranopia: [
    [0.625, 0.375, 0.0],
    [0.7, 0.3, 0.0],
    [0.0, 0.3, 0.7],
  ],
  Deuteranomaly: [
    [0.8, 0.2, 0.0],
    [0.258, 0.742, 0.0],
    [0.0, 0.142, 0.858],
  ],
  Tritanopia: [
    [0.95, 0.05, 0.0],
    [0.0, 0.433, 0.567],
    [0.0, 0.475, 0.525],
  ],
  Tritanomaly: [
    [0.967, 0.033, 0.0],
    [0.0, 0.733, 0.267],
    [0.0, 0.183, 0.817],
  ],
  Achromatopsia: [
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
  ],
  Achromatomaly: [
    [0.618, 0.32, 0.062],
    [0.163, 0.775, 0.062],
    [0.163, 0.32, 0.516],
  ],
};

function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data, drawImage);
  } else {
    alert("El archivo seleccionado no es una imagen.");
  }
}

function drawImage() {
  background(220);
  image(img, 0, 0);
}

let matrix = colorMats.Deuteranopia;

function preload() {
  img = loadImage("/showcase/sketches/daltonism/visionTest.png");
}

function setup() {
  input = createFileInput(handleFile);
  input.position(200, 10);
  dropdown = createSelect();
  dropdown.position(10, 10);
  for (let tipo in colorMats) {
    dropdown.option(tipo);
  }
  createCanvas(img.width, img.height);
}

function draw() {
  if (img.width > 800 || img.height > 800) {
    img.resize(800, Math.floor(800 * (img.height / img.width)));
  }
  resizeCanvas(img.width, img.height);
  let val = dropdown.value();
  matrix = colorMats[val];
  newImg = createImage(img.width, img.height);
  newImg.loadPixels();
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
      let newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
      let newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;
      newImg.pixels[index] = newR;
      newImg.pixels[index + 1] = newG;
      newImg.pixels[index + 2] = newB;
      newImg.pixels[index + 3] = img.pixels[index + 3];
    }
  }
  newImg.updatePixels();
  image(newImg, 0, 0);
}

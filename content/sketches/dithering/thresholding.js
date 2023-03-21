let img; // imagen original
let newImg; // imagen transformada
let slider;
let pxs = new Array(256);

function preload() {
  img = loadImage("/showcase/sketches/dithering/paleta_grises.png");
}

function setup() {
  createCanvas(600, 500);
  background("#C0DDEB");
  input = createFileInput(handleFile);
  input.position(10, height - 200);
  slider = createSlider(0, 250, 0, 25);
  slider.position(10, height - 30);
  slider.style("width", "150px");
  text("thresholding value", 170, height - 15);
  text("  0     50  100  150  200   250", 10, height - 35);
  cur_thr = slider.value();
}

let thr = 0; //thresholding value
let maxval = 255;
function dst(x, y) {
  //destination pixel
  if (src(x, y) > thr) {
    //source pixel
    return color(maxval, maxval, maxval);
  } else {
    return color(0, 0, 0);
  }
}

function src(x, y) {
  px = img.get(x, y)[0];
  return px;
}

let k;
let data;
function updateImg() {
  let newImg = createImage(img.width, img.height);
  newImg.loadPixels();
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      newImg.set(i, j, dst(i, j));
    }
  }
  newImg.updatePixels();
  image(newImg, width / 2, 0);
  getPixelInfo();
}

let cur_thr;
function draw() {
  thr = slider.value();
  image(img, 0, 0);
  //filter(GRAY);
  if (modified == true || thr != cur_thr) {
    updateImg();
    modified = false;
    cur_thr = slider.value();
  }
  fill("#C0DDEB");
  noStroke();
  rect(width / 2 + img.width, 0, width / 2 - img.width, width / 2);
  rect(img.width, 0, width / 2 - img.width, width / 2);
  rect(width / 2, img.height, img.width, width / 2 - img.height);
  rect(0, img.height, img.width, width / 2 - img.height);

  //gráfica de pixeles
  noStroke();
  fill("#FFF5A2");
  rect(width / 2, 300, 300, 200);
  let sp = "         ";
  fill(50);
  text(
    "  0" + sp + "  50" + sp + " 100" + sp + "150" + sp + "200" + sp + "250",
    width / 2 + 10,
    height - 25
  );
  fill("red");
  graph();
  noStroke();
  fill("black");
  translate(width / 2 + 12, height - 90);
  rotate(-HALF_PI);
  text("cantidad", 0, 0);
  translate(-80, 100);
  rotate(HALF_PI);
  text("valor del pixel", 0, 0);
}

let modified = false;
function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data);
    modified = true;
  } else {
    alert("El archivo seleccionado no es una imagen.");
  }
}

function getPixelInfo() {
  pxs = new Array(256);
  for (let i = 0; i <= 255; i++) pxs[i] = 0;
  img.loadPixels();
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      pxs[img.get(i, j)[0]] += 1;
    }
  }
}

function graph() {
  strokeWeight(1);
  stroke("red");
  fill("blue");
  let m = max(pxs);
  for (let i = 0; i <= 255; i++) {
    line(
      width / 2 + 20 + i * 1,
      height - 38,
      width / 2 + 20 + i * 1,
      height - 38 - (pxs[i] / m) * (200 - 38 - 10)
    );
  }
}

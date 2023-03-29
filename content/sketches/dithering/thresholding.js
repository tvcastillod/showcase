let img; //imagen original
let newImg; //imagen transformada
let slider;
let pxs = new Array(256); //arreglo de cantidad de cada pixel
let modified = false;
let thr = 50; //valor del umbral
let cur_thr;

function preload() {
  img = loadImage("/showcase/sketches/dithering/paleta_grises.png");
}

function setup() {
  createCanvas(600, 500);
  background("#C0DDEB");
  input = createFileInput(handleFile);
  input.position(10, height - 190);
  slider = createSlider(0, 250, 50, 25);
  slider.position(10, height - 30);
  slider.style("width", "150px");
  text("thresholding value", 170, height - 15);
  text("  0     50  100  150  200   250", 10, height - 35);
  cur_thr = slider.value();
  modified = true;
}

function dst(x, y) {
  //calcula el pixel destino
  if (src(x, y) > thr) {
    //condición thresholding
    return color(255, 255, 255);
  } else {
    return color(0, 0, 0);
  }
}

function src(x, y) {
  //obtiene el pixel original
  px = img.get(x, y)[0];
  return px;
}

function updateImg() {
  newImg = createGraphics(img.width, img.height);
  img.loadPixels();
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      newImg.set(i, j, dst(i, j));
    }
  }
  newImg.updatePixels();
  image(newImg, width / 2, 0);
  getPixelInfo();
}

function draw() {
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
      img.resize(imgW, imgH);
      getPixelInfo();
    }
    image(img, 0, 0);
    thr = slider.value();
    if (modified == true || thr != cur_thr) {
      /*actualiza la imagen filtrada sólo cuando se modifica el
      valor del umbral o cuando se sube una nueva imagen,evitando
      así la repetición de cálculos en cada llamada a draw()*/
      updateImg();
      modified = false;
      cur_thr = slider.value();
    }
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

function handleFile(file) {
  if (file.type === "image") {
    modified = true;
    img = loadImage(file.data);
    img.filter(GRAY); // convierte la imagen a escala de grises
  } else {
    alert("El archivo seleccionado no es una imagen.");
  }
}

function drawImage() {
  background(220);
  image(img, 100, 100);
}

function getPixelInfo() {
  pxs = new Array(256);
  for (let i = 0; i <= 255; i++) pxs[i] = 0;
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      pxs[get(i, j)[0]] += 1;
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

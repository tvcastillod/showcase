let img; //imagen original
let newImg; //imagen transformada
let slider;
let pxs = new Array(256); //arreglo de cantidad de cada pixel
let modified = false;
let rmin = 1; //rango minimo del umbral
let rmax = 256; //rango maximo del umbral

function preload() {
  img = loadImage("/showcase/sketches/dithering/paleta_grises.png");
}

function setup() {
  createCanvas(600, 400);
  background("#C0DDEB");
  input = createFileInput(handleFile);
  input.position(10, height - 80);
  button = createButton("generar nueva imagen");
  button.position(width / 2, height - 80);
  button.mousePressed(generateNewImg);
  sel = createSelect();
  sel.position(width / 2 + 160, height - 80);
  sel.option("0 - 255");
  sel.option("50 - 200");
  sel.option("100 - 255");
  sel.selected("0 - 255");
  sel.changed(mySelectEvent);
  modified = true;
}

function dst(x, y) {
  //calcula el pixel destino
  if (src(x, y) > umb) {
    //condición de dithering
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
  newImg.loadPixels();
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      umb = random(rmin, rmax);
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
    if (modified == true) {
      /*actualiza la imagen filtrada sólo cuando se sube una
      nueva imagen,evitando así la repetición de cálculos en
      cada llamada a draw()*/
      updateImg();
      modified = false;
    }
  }
  fill("#C0DDEB");
  noStroke();
  rect(width / 2 + img.width, 0, width / 2 - img.width, width / 2);
  rect(img.width, 0, width / 2 - img.width, width / 2);
  rect(width / 2, img.height, img.width, width / 2 - img.height);
  rect(0, img.height, img.width, width / 2 - img.height);
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

function generateNewImg() {
  modified = true;
}

function mySelectEvent() {
  let item = sel.value();
  if (item == "0 - 255") {
    rmin = 1;
    rmax = 256;
  } else if (item == "100 - 255") {
    rmin = 100;
    rmax = 255;
  } else if (item == "50 - 200") {
    rmin = 50;
    rmax = 200;
  } else {
    rmin = 50;
    rmax = 200;
  }
}

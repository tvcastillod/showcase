let inputElement, userImage;
let canvas1, canvas2;
let vel = 0,
  dir = 1;
let button, slider;
let strokeW = 4,
  space = 1;

function setup() {
  createCanvas(600, 400);
  canvas1 = createGraphics(width / 2 - 20, height / 2 - 20);
  canvas2 = createGraphics(width / 2 - 20, height / 2 - 20);
  inputElement = createFileInput(handleFile);
  inputElement.position(width / 2 + 10, height / 2 - 60);
  button = createButton("añadir fotograma");
  button.position(width / 2 + 10, height / 2 - 30);
  button.mousePressed(saveFrame);
  checkbox = createCheckbox("correr animación", false);
  checkbox.position(10, 340);
  checkbox2 = createCheckbox("mostrar patrón de líneas", false);
  checkbox2.position(10, 360);
  slider = createSlider(2, 6, 1, 1);
  slider.position(140, 280);
  slider.style("width", "120px");
  slider2 = createSlider(2, 10, 1, 1);
  slider2.position(140, 250);
  slider2.style("width", "120px");
}

let n = 0;
let frames = [];
// almacena la imagen actual en un arreglo con todos los fotogramas
function saveFrame() {
  frames[n] = currentImg;
  n += 1;
}

let currentImg;
var posX = 10,
  posY = 10;
function draw() {
  background(200);
  displayText();
  canvas1.background("white");
  canvas2.background("white");
  image(canvas1, 10, 10);
  image(canvas2, width / 2 + 10, height / 2 + 10);
  // ajusta la imagen cargada al tamaño del canvas
  if (userImage != null) {
    if (
      userImage.width - userImage.height < 50 ||
      userImage.width <= userImage.height
    ) {
      imgW = (canvas1.height * userImage.width) / userImage.height;
      imgH = canvas1.height;
    } else {
      imgW = canvas1.width;
      imgH = (canvas1.width * userImage.height) / userImage.width;
    }
    image(userImage, canvas1.width / 2 + 10 - imgW / 2, posY, imgW, imgH);
  }

  currentImg = get(posX, posY, canvas1.width, canvas1.height);
  space = slider.value();
  strokeW = slider2.value();

  // genera la imagen subyacente con las imágenes ya añadidas
  if (frames.length > 0) {
    k = 0;
    for (let y = 0; y < canvas1.width; y += space) {
      let strip = frames[k % frames.length].get(y, 0, space, canvas1.height);
      image(strip, width / 2 + 10 + y, height / 2 + 10);
      k += 1;
    }
  }
  if (checkbox2.checked())
    drawLines(width / 2 + vel, height / 2, strokeW, strokeW + space);
  if (checkbox.checked()) vel += 0.3 * dir;
  if (vel > 50 || vel < 0) dir *= -1;
}
// dibuja el patrón de líneas superpuesto
function drawLines(beginX, beginY, strokeW, space) {
  for (let i = beginX; i < beginX + 300; i += space) {
    line(i, beginY, i, beginY + 220);
  }
  strokeWeight(strokeW);
  strokeCap(SQUARE);
}
// función para manejar la carga de las imágenes
function handleFile(file) {
  if (file.type === "image") {
    userImage = createImg(file.data, "");
    userImage.hide();
  } else userImage = null;
}

function displayText() {
  textSize(13);
  text(slider.value(), 270, 295);
  text(slider2.value(), 270, 265);
  text("espacio entre líneas", 10, 295);
  text("grosor de línea", 10, 265);
  text(str(n), width / 2 + 120, height / 2 - 20);
}

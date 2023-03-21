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
  inputElement.position(10, height / 2 + 10);
  button = createButton("add frame");
  button.position(10, height / 2 + 45);
  button.mousePressed(saveFrame);
  checkbox = createCheckbox("run", false);
  checkbox.position(10, 340);
  checkbox2 = createCheckbox("show lines", false);
  checkbox2.position(10, 360);
  slider = createSlider(1, 3, 1, 1);
  slider.position(10, 280);
  slider.style("width", "80px");
}

let n = 0;
let frames = [];
var [posX, posY] = [10, 10];
function saveFrame() {
  frames[n] = currentImg;
  n += 1;
  print(frames);
}

let currentImg;
function draw() {
  background(200);
  textSize(13);
  text("  1      2      3", 10, 320);
  text("line space", 100, 295);
  canvas1.background("white");
  canvas2.background("white");
  image(canvas1, 10, 10);
  image(canvas2, width / 2 + 10, height / 2 + 10);
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

  let nFrames = frames.length;
  space = slider.value();

  if (frames.length > 0) {
    k = 0;
    for (let y = 0; y < canvas1.width; y += space) {
      let strip = frames[k % nFrames].get(y, 0, space, canvas1.height);
      image(strip, width / 2 + 10 + y, height / 2 + 10);
      k += 1;
    }
  }
  if (checkbox2.checked())
    drawLines(width / 2 + vel, height / 2, strokeW, strokeW + space);
  if (checkbox.checked()) vel += 0.3 * dir;
  if (vel > 50 || vel < 0) dir *= -1;
}

function drawLines(beginX, beginY, strokeW, space) {
  for (let i = beginX; i < beginX + 300; i += space) {
    line(i, beginY, i, beginY + 220);
  }
  strokeWeight(strokeW);
  strokeCap(SQUARE);
}

function handleFile(file) {
  if (file.type === "image") {
    userImage = createImg(file.data, "");
    userImage.hide();
  } else userImage = null;
}

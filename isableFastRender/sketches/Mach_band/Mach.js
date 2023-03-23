
let cols, rows;
let scl ;
let w = 1000;
let h = 600;

let flying = 0;
let vel;
let band;
let strk;

let terrain = [];
let color = [];

function setSize() {
  let s = scl.value();
  cols = w / s;
  rows = h / s;
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    color[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
      color[x][y] = 0;
    }
  }
}

function setup() {
  createCanvas(600, 600, WEBGL);

  scl = createSlider(4, 80,20, 2);
  scl.position(10, 10);
  scl.style('width', '80px');
  scl.input(setSize);
  setSize();


  vel = createSlider(0, 0.1, 0, 0.001);
  vel.position(10, 40);
  vel.style('width', '80px');

  band = createCheckbox('band', true);
  band.position(10, 70);
  band.style('color', '#19E9F5');

  strk = createCheckbox('stroke', false);
  strk.position(10, 100);
  strk.style('color', '#FC1A9F');
}

function draw() {
  background(0);
    
  flying -= vel.value();
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let h = map(noise(xoff, yoff), 0, 1, -100, 100);
      terrain[x][y] = h;
      color[x][y] = map(h, -100, 100, 0, 255);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  translate(0, 50);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);
  verify_stroke();
  verify_band();

}
function verify_stroke(){
    if (!strk.checked()) {
    noStroke();
  } else {
    stroke(0, 255, 0);
  }
}

function verify_band(){
    let s = scl.value();
  if (band.checked()) {
    fill(200, 200, 200, 50);
    for (let y = 0; y < rows - 1; y++) {
      beginShape(TRIANGLES);
      for (let x = 0; x < cols - 2; x++) {
        fill((color[x][y] + color[x][y + 1] + color[x + 1][y]) / 3);
        vertex(x * s      , y * s      , terrain[x][y]);
        vertex(x * s      , (y + 1) * s, terrain[x][y + 1]);
        vertex((x + 1) * s, y * s      , terrain[x + 1][y]);
        fill((color[x + 1][y + 1] + color[x + 2][y] + color[x + 2][y + 1]) / 3);
        vertex((x + 1) * s, (y + 1) * s, terrain[x + 1][y + 1]);
        vertex((x + 2) * s, y * s      , terrain[x + 2][y]);
        vertex((x + 2) * s, (y + 1) * s, terrain[x + 2][y + 1]);
      }
      endShape();
    }
  }
  else {
    for (let y = 0; y < rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        fill(color[x][y]);
        vertex(x * s, y * s, terrain[x][y]);
        fill(color[x][y+1]);
        vertex(x * s, (y + 1) * s, terrain[x][y + 1]);
      }
      endShape();
    }
  }
}

let ball;
let walls = [];
let floorImg;
let roofImg;
let wallImg;
let nasalizationFont;

let camera;

function preload() {
  // load images
  floorImg = loadImage("/showcase/sketches/3d_model/floor.jpg");
  roofImg = loadImage("/showcase/sketches/3d_model/roof.jpg");
  wallImg = loadImage("/showcase/sketches/3d_model/wall.jpg");
  nasalizationFont = loadFont("/showcase/sketches/3d_model/nasalization-rg.otf");
}


function setup() {
  rectMode(CORNER);
  createCanvas(800, 800, WEBGL);
  textFont(nasalizationFont);
  textureMode(REPEAT); // set texture mode to repeat

  // create walls
  walls.push(new Wall(createVector(0, 0, 0), 3200, 600, 0, 0, wallImg));
  walls.push(new Wall(createVector(0, 0, 1200), 3200, 600, 0, 0, wallImg));
  walls.push(new Wall(createVector(1600, 0, 600), 1200, 600, PI / 2, 0, wallImg));
  walls.push(new Wall(createVector(-1600, 0, 600), 1200, 600, PI / 2, 0, wallImg));

  // create roof
  walls.push(new Wall(createVector(0, -300, 600), 3200, 1200, 0, PI / 2, roofImg));

  // create floor
  walls.push(new Wall(createVector(0, 300, 600), 3200, 1200, 0, PI / 2, floorImg));
  
  //camera = createCamera();
  camera = createCamera();
}

function draw() {

  
  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }

  // move person with awsd
  if (keyIsDown(65)) {
    camera.move(-10, 0, 0);
  }
  if (keyIsDown(68)) {
    camera.move(10, 0, 0);
  }
  if (keyIsDown(87)) {
    camera.move(0, 0, -10);
  }
  if (keyIsDown(83)) {
    camera.move(0, 0, 10);
  }


  // rotate person with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    camera.pan(0.1);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    camera.pan(-0.1);
  }


  // tomado de: https://editor.p5js.org/rjgilmour/sketches/DKDWmmvrm
  let pan = atan2(camera.eyeZ - camera.centerZ, camera.eyeX - camera.centerX)
  let tilt = atan2(camera.eyeY - camera.centerY, dist(camera.centerX, camera.centerZ, camera.eyeX, camera.eyeZ))
  
  translate(camera.eyeX, camera.eyeY, camera.eyeZ)
  rotateY(-pan)
  rotateZ(tilt + PI)
  translate(200, 0, 0)
  rotateY(-PI/2)
  rotateZ(PI)
  fill(0)
  push()
    translate(-125, -65, 0)
    text("HEALTH", 0, 0)
  pop()
  translate(125, -70, 0)
  text("100", 0, 0)
}



class Wall {
  constructor(pos, width, height, Ydirection, Xdirection=0, img=null, [r, g, b] = [200, 200, 200]) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.Ydirection = Ydirection;
    this.Xdirection = Xdirection;
    [this.r, this.g, this.b] = [r, g, b];
    this.img = img;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.Ydirection);
    rotateX(this.Xdirection);

    if (this.img) {
      texture(this.img);
    } else {
      fill(this.r, this.g, this.b, 255);
    }
    box(this.width, this.height, 20);
    pop();
  }
}




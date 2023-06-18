let ball;
let walls = [];
let camera;
let floorImg;
let roofImg;
let wallImg;
let nasalizationFont;

let easycam;

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
  easycam = createEasyCam();
   easycam.setState({
      distance: 300, 
      center:   [0, 0, 500],     
      rotation: [0, 0, 100, 0]
    }
  );
  initHud = createGraphics(width, height);  
 
}

function draw() {

  
  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }

  beginHUD();
  // clear background
  initHud.clear();
  // draw hud
  initHud.background(0, 0, 0, 0);
  initHud.fill(255);
  initHud.textSize(20);

  //instructions
  initHud.text("Use WASD to move and arrow keys to rotate", 10, 20);

  //camera position
  let centerShow = easycam.getCenter().map(coord => coord.toFixed(3));
  initHud.text("Camera position: " + centerShow[0] + ", " + centerShow[1] + ", " + centerShow[2], 10, 40);
  
  image(initHud, 0, 0);
  endHUD();

  let state = easycam.getState();
  let center = easycam.getCenter();
  let rotation = easycam.getRotation();
  // move person with awsd
  if (keyIsDown(65)) {
    easycam.panX(-10);
  }
  if (keyIsDown(68)) {
    easycam.panX(10);
  }
  if (keyIsDown(87)) {
    easycam.zoom(-10);
    let newCenter = [center[0], center[1], center[2] + 10]
    easycam.setCenter(newCenter, 0.1);
  }

  if (keyIsDown(83)) {
    easycam.zoom(10);
  }

  // rotate person with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    easycam.rotateY(0.1);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    easycam.rotateY(-0.1);
  }
  translate(center[0], center[1], center[2]);
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




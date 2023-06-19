let ball;
let walls = [];
let floorImg;
let roofImg;
let wallImg;
let nasalizationFont;
let controlsHud = true;
let lastUpdate = 0;
let fps = 0;
let bend = false;
let bendImage;
let standImage;

let camera;
let initialY;
let jumping = false;
let jumpHeight = -100;
let jumpDirection = 1;
let lampModel;
let glassBaseTexture;
let basicDooorModel; 
let doorTexture; 
let deskModel;
let blackBedModel;
let woolTexture;
let windowModel;
let monitorModel;

function preload() {
  // load images
  floorImg = loadImage("/showcase/sketches/3d_model/floor.jpg");
  roofImg = loadImage("/showcase/sketches/3d_model/roof.jpg");
  wallImg = loadImage("/showcase/sketches/3d_model/wall.jpg");
  nasalizationFont = loadFont("/showcase/sketches/3d_model/nasalization-rg.otf");
  bendImage = loadImage("/showcase/sketches/3d_model/bend.png");
  standImage = loadImage("/showcase/sketches/3d_model/stand.png");
  lampModel = loadModel("/showcase/sketches/3d_model/lamp.obj", true);
  glassBaseTexture = loadImage("/showcase/sketches/3d_model/glass_base.jpg");
  basicDooorModel = loadModel("/showcase/sketches/3d_model/basic_door.obj", true);
  doorTexture = loadImage("/showcase/sketches/3d_model/door_texture.jpg");
  deskModel = loadModel("/showcase/sketches/3d_model/desk.obj", true);
  blackBedModel = loadModel("/showcase/sketches/3d_model/black_bed.obj", true);
  woolTexture = loadImage("/showcase/sketches/3d_model/wool.jpg");
  windowModel = loadModel("/showcase/sketches/3d_model/window.obj", true);
  monitorModel = loadModel("/showcase/sketches/3d_model/monitor.obj", true);
}


function setup() {
  rectMode(CORNER);
  createCanvas(1200, 800, WEBGL);
  textFont(nasalizationFont);
  textSize(5);

  // prevent scrolling with arrow keys
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  // create walls
  walls.push(new Wall(createVector(0, 0, 0), 3200, 600, 0, 0, wallImg));
  walls.push(new Wall(createVector(0, 0, 1200), 3200, 600, 0, 0, wallImg));
  walls.push(new Wall(createVector(1600, 0, 600), 1200, 1300, PI / 2, 0, wallImg));
  walls.push(new Wall(createVector(-1600, 0, 600), 1200, 1300, PI / 2, 0, wallImg));

  // create roof
  walls.push(new Wall(createVector(0, -500, 850), 3200, 800, 0, PI / 3, roofImg));
  walls.push(new Wall(createVector(0, -500, 350), 3200, 800, 0, -(PI / 3), roofImg));
  


  // create floor
  walls.push(new Wall(createVector(0, 300, 600), 3200, 1200, 0, PI / 2, floorImg));
  
  //camera = createCamera();
  camera = createCamera();
  initialY = camera.eyeY;
}

function draw() {
  // free camera orbit
  //orbitControl();

  lastUpdate++;
  
  //pointLight in side walls position
  pointLight(255, 255, 255, 1300, -400, 600);
  pointLight(255, 255, 255, -1300, -400, 600);

  push();
  //translate to light position to put the lamp
  translate(1510, -400, 600);
  //rotate the lamp
  rotateY(-PI/2);
  noStroke();
  texture(glassBaseTexture);
  model(lampModel);
  pop();

  push();
  //translate to light position to put the lamp
  translate(-1510, -400, 600);
  //rotate the lamp
  rotateY(PI/2);
  noStroke();
  texture(glassBaseTexture);
  model(lampModel);
  pop();

 //draw the door
  push();
  translate(0, 85, 10);
  rotateY(PI/2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2.5)
  model(basicDooorModel);
  pop();

  //draw the desk
  push();
  translate(1320, 180, 420);
  rotateY(PI/2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(4)
  model(deskModel);

  //draw the monitor
  push();
  translate(0, 45, -40);
  rotateY(-PI/2);
  //rotateX(PI/4);
  noStroke();
  fill('black');
  scale(0.3)
  model(monitorModel);
  pop();

  pop();

  //draw the bed
  push();
  translate(-1200, 140, 800);
  rotateX(PI);
  noStroke();
  texture(woolTexture);
  scale(4)
  model(blackBedModel);
  pop();

  //draw the windows 
  push();
  translate(600, 0, 25);
  rotateY(-PI/2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2)
  model(windowModel);
  pop();

  push();
  translate(-600, 0, 25);
  rotateY(-PI/2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2)
  model(windowModel);
  pop();

  push();
  translate(-600, 0, 1175);
  rotateY(PI/2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2)
  model(windowModel);
  pop();

  push();
  translate(600, 0, 1175);
  rotateY(PI/2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2)
  model(windowModel);
  pop();


 



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

  // decrease y position if jumping and not at less than -100
  if (jumping && camera.eyeY > -100 && jumpDirection == 1) {
    camera.move(0, -10, 0);
  }  else if (jumping && camera.eyeY < initialY && jumpDirection == -1) {
    camera.move(0, 10, 0);
  } 

  // change jump direction if at max or min height
  if (camera.eyeY <= -100) {
    jumpDirection = -1;
  }

  // change jump to false if at initial height
  if (camera.eyeY == 0) {
    jumping = false;
    jumpDirection = 1;
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
    translate(-170, -100, 0)
    fill(255)
    if(controlsHud){
    // triangles indicating direction keys awsd
    triangle(5, 5, 10, 10, 10, 0)
    text("A", 0, 6)
    triangle(10, 0, 15, -5, 20, 0)
    text("W", 12.5, -6)
    triangle(10, 10, 15, 15, 20, 10)
    text("S", 13.5, 20)
    triangle(20, 10, 25, 5, 20, 0)
    text("D", 26, 6)

    // text indicating arrow keys
    text("Use arrow keys to rotate or crouch/stand", 40, 0)
    } else {
      // text framerate
        if (lastUpdate > 30) {
            fps = frameRate().toFixed(2);
            lastUpdate = 0;
        }
        text("Framerate: " + fps, 40, 0);

      // text camera position

      
      text("Camera position: ", 0, -10);
      text("x: " + camera.eyeX.toFixed(2), 0, 0);
      text("y: " + camera.eyeY.toFixed(2), 0, 10);
      text("z: " + camera.eyeZ.toFixed(2), 0, 20);
      }
        
    let watchOption = controlsHud ? "scene statistics" : "controls";

    // message to change hud mode
    text("Press 'h' to see " + watchOption, 40, 10)
    
    if(bend){
      image(bendImage, 325, 200, 10, 10);
    } else {
      image(standImage, 325, 200, 10, 10);
    }

  pop();
}

function keyReleased() {
  //hud control
  if (keyCode === 72) {
    controlsHud = !controlsHud;
  }

  //crouch camera with down arrow
  if (keyCode === DOWN_ARROW) {
    if(!bend){
      camera.move(0, 100, 0);
      bend = true;
    }
  }

  // stand with up arrow
  if (keyCode === UP_ARROW) {
    if(bend){
      camera.move(0, -100, 0);
      bend = false;
    }
  }
  
  // jump with spacebar
  if (keyCode === 32) {
    if (!bend && !jumping) {
      jumping = true;
    }
  }

  return false; // prevent any default behavior
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
    //clear();
    pop();
  }
}

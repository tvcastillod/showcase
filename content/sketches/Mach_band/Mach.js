var cols, rows;
var scl = 20;
var h = 900;
var w = 1200;
var flying = 0;
let terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);

  cols = w / scl;
  rows = h / scl;
  terrain = createArray(cols, rows);
}

function draw() {
  flying += 0.01;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  stroke(255);
  noFill();
  
  //translate(width/2,height/2)
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function createArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
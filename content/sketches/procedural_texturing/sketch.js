let color_pg;
let truchet_pg;
let truchetShader;
let colorShader;
let dropdown;
let dropdown1;
let currentShader = "color";
let pg;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  colorShader = readShader(
    "/showcase/sketches/procedural_texturing/color.frag"
  );
  truchetShader = readShader(
    "/showcase/sketches/procedural_texturing/truchet.frag"
  );
  brickShader = readShader(
    "/showcase/sketches/procedural_texturing/brick.frag"
  );
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();

  truchet_pg = createGraphics(600, 600, WEBGL);
  truchet_pg.noStroke();
  truchet_pg.shader(truchetShader);
  truchet_pg.textureMode(NORMAL);
  truchet_pg.emitResolution(truchetShader);

  color_pg = createGraphics(600, 600, WEBGL);
  color_pg.noStroke();
  color_pg.shader(colorShader);
  color_pg.textureMode(NORMAL);
  color_pg.emitResolution(colorShader);

  brick_pg = createGraphics(600, 600, WEBGL);
  brick_pg.noStroke();
  brick_pg.shader(brickShader);
  brick_pg.textureMode(NORMAL);
  brick_pg.emitResolution(brickShader);

  dropdown = createSelect();
  dropdown.position(10, 10);
  dropdown.option("Ellipsoid");
  dropdown.option("Cylinder");
  dropdown.option("Cone");
  dropdown.option("Cube");

  dropdown1 = createSelect();
  dropdown1.position(10, 30);
  dropdown1.option("truchet");
  dropdown1.option("color");
  dropdown1.option("brick");
}

function draw() {
  background(44);
  orbitControl();

  //change currentShader based on dropdown value
  if (dropdown1.value() == "color") {
    currentShader = "color";
    pg = color_pg;
  } else if (dropdown1.value() == "truchet") {
    currentShader = "truchet";
    pg = truchet_pg;
  } else if (dropdown1.value() == "brick") {
    currentShader = "brick";
    pg = brick_pg;
  }

  texture(pg);

  switch (dropdown.value()) {
    case "Cone":
      cone(width * 0.4, height * 0.5);
      break;
    case "Cylinder":
      cylinder(width * 0.3, height * 0.4);
      break;
    case "Ellipsoid":
      ellipsoid(width * 0.3, height * 0.225, height * 0.4);
      break;
    case "Cube":
      box(width * 0.4);
      break;
    default:
      break;
  }
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  if (currentShader == "color") {
    colorShader.setUniform("u_zoom", int(map(mouseX, 0, width, 1, 30)));
    // color_pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
    color_pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  } else if (currentShader == "truchet") {
    truchetShader.setUniform("u_zoom", int(map(mouseX, 0, width, 1, 30)));
    truchet_pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  } else if (currentShader == "brick") {
    brickShader.setUniform("u_zoom", int(map(mouseX, 0, width, 1, 30)));
    brick_pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  }
}

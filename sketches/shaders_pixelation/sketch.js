let image_src;
let video_src;
let mosaic;

let resolution;
let video_on;
let mode;
let font;
let fps;

function preload() {
  image_src = loadImage("/showcase/sketches/shaders_pixelation/peinture.jpg");
  video_src = createVideo(["/showcase/sketches/shaders_pixelation/wagon.webm"]);
  video_src.hide();
  mosaic = readShader("/showcase/sketches/shaders_pixelation/pixelator.frag", {
    varyings: Tree.texcoords2,
  });
  //preload roboto font
  font = loadFont("/showcase/sketches/shaders_pixelation/Roboto-Regular.ttf");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pg = createGraphics(600, 600, WEBGL);
  textFont(font);
  textSize(15);
  pg.textureMode(NORMAL);
  noStroke();
  pg.shader(mosaic);
  resolution = createSlider(1, 100, 30, 1);
  resolution.position(10, 35);
  resolution.style("width", "80px");
  resolution.input(() => mosaic.setUniform("resolution", resolution.value()));
  mosaic.setUniform("resolution", resolution.value());
  video_on = createCheckbox("video", false);
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform("source", video_src);
      video_src.loop();
    } else {
      mosaic.setUniform("source", image_src);
      video_src.pause();
    }
  });
  mosaic.setUniform("source", image_src);
  video_on.position(10, 55);
  mode = createSelect();
  mode.position(10, 75);
  mode.option("original");
  mode.option("pixelator");
  mode.selected("pixelator");
  mode.changed(() => {
    mosaic.setUniform("original", mode.value() === "original");
    mode.value() === "original" ? resolution.hide() : resolution.show();
  });
}

let lastUpdate = 0;
function draw() {
    /*
                y                  v
                |                  |
    (-1,1)|     (1,1)        (0,1)     (1,1)
    *_____|_____*            *__________*   
    |     |     |            |          |        
    |_____|_____|__x         | texture  |        
    |     |     |            |  space   |
    *_____|_____*            *__________*___ u
    (-1,-1)    (1,-1)       (0,0)    (1,0) 
    */
    pg.beginShape();
    pg.vertex(-1, -1, 0, 0, 1);
    pg.vertex(1, -1, 0, 1, 1);
    pg.vertex(1, 1, 0, 1, 0);
    pg.vertex(-1, 1, 0, 0, 0);
    pg.endShape();
    image(pg, -width / 2, -height / 2);

    fill(255);
    // show framerate
    if (frameCount % 30 === 0 && millis() - lastUpdate > 500) {
        fps = floor(frameRate());
        lastUpdate = millis();
    }
    text("fps: " + fps, 180, -270);
}

let pg;
let shader;
let aleatorio=false;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  shader = readShader(
    "/showcase/sketches/procedural_texturing/others.frag"
  );

}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  pg = createGraphics(600, 600, WEBGL);
  pg.noStroke();
  pg.shader(shader);
  pg.textureMode(NORMAL);
  pg.emitResolution(shader);
  texture(pg);
  slider = createSlider(0, 1, 0.5, 0.01);
slider.position(200, 10);
slider.style('width', '140px');

slider2 = createSlider(1.0, 8.0, 2.0, 0.5);
slider2.position(200, 30);
slider2.style('width', '140px');
//poner un boton 

button = createButton('Aleatorio');
button.position(200, 50);
button.mousePressed(() => {
    if (aleatorio === true) {
      aleatorio = false;
    }
    else {
        aleatorio = true;
    
    }
});





}

function draw() {
  background(44);
  orbitControl();
 
  //change currentShader based on dropdown value
 
 ellipsoid(width * 0.3, height * 0.225, height * 0.4);


}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
    shader.setUniform("u_zoom", int(map(mouseX, 0, width, 1, 30)));
    // color_pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
     shader.setUniform("var3", aleatorio);
     shader.setUniform("u_time", millis() / 1000.0);
     shader.setUniform("var1", slider.value());
    shader.setUniform("var2", slider2.value());
    console.log(slider.value());
    console.log(slider2.value());

 
}

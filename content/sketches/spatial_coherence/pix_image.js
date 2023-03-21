let img;
let slider;
let num=300;
function preload() {
  img = loadImage("/showcase/sketches/spatial_coherence/perrito.jpg");
}

function setup() {
  createCanvas(600, 350);
  slider =createSlider(10,350,num);
  slider.position(10, 10); 
  slider.input(updateData);
  image(img, 0, 0);
  
}
function draw(){
  
  pixelar(img);

}
function pixelar(img){
   let pixelatedImg = createImage(img.width, img.height);
  
  // cargar la imagen original en la nueva imagen pixelada
  
  pixelatedImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

  pixelatedImg.resize(num, num); // reduce el tamaño de la imagen
  pixelatedImg.resize(600,350);
  image(pixelatedImg,0,0);
}
function updateData(){
  num=this.value();
}

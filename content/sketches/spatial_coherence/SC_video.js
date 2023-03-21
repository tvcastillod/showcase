let blockSize = 2;
let video;
let slider;
 let img;
function preload() {
  video = createVideo("/showcase/sketches/spatial_coherence/rana.mp4");
}

function setup() {
  createCanvas(640, 360);
  slider = createSlider(5, 50, blockSize);
  video.hide(); // oculta el elemento <video> en la página
   //video.play(); // comienza a reproducir el video
    slider.position(10, 10); 
    slider.input(updateData); // llama a la función updateData() cuando se mueve el scrollbar
    video.loop();
  
}
function draw(){
    img =video.get();
  if(blockSize>5){
 

  pixelateSpatialCoherence(img);
  }
  else{
    image(img,0,0);
  }

  
}

function pixelateSpatialCoherence(originalImg) {
  // crear una nueva imagen pixelada
  let pixelatedImg = createImage(originalImg.width, originalImg.height);
  
  // cargar la imagen original en la nueva imagen pixelada
  
  pixelatedImg.copy(originalImg, 0, 0, originalImg.width, originalImg.height, 0, 0, originalImg.width, originalImg.height);

  // loop para recorrer cada bloque en la imagen pixelada
  for (let x = 0; x < pixelatedImg.width; x += blockSize) {
    for (let y = 0; y < pixelatedImg.height; y += blockSize) {
      // obtener un color aleatorio dentro del bloque
      let randX = floor(random(x, x + blockSize));
      let randY = floor(random(y, y + blockSize));
      let blockColor = originalImg.get(randX, randY);

      // loop para recorrer cada pixel en el bloque
      for (let i = x; i < x + blockSize; i++) {
        for (let j = y; j < y + blockSize; j++) {
          // asignar el color aleatorio al pixel en la imagen pixelada
          pixelatedImg.set(i, j, blockColor);
        }
      }
    }
  }
  // actualizar la imagen pixelada para mostrar los cambios
  pixelatedImg.updatePixels();
  image(pixelatedImg,0,0);
}
function updateData(){
  blockSize=this.value();

}


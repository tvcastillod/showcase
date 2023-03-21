
// definir el tamaño del bloque
let blockSize = 30;
let img;
let slider;

function preload() {
  img = loadImage("/showcase/sketches/spatial_coherence/perrito.jpg");
}

function setup() {
  createCanvas(600, 350);
  slider = createSlider(5, 60, blockSize);
  slider.input(updateData);
  slider.position(10, 10);
  image(img,0,0);
  
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
  return pixelatedImg;
}
function updateData(){
  blockSize=60-this.value();
  image(pixelateSpatialCoherence(img),0,0);
}

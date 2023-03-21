
  let video;
  let resolucion=300;
  
  
  function setup() {
    video = createVideo("/showcase/sketches/spatial_coherence/rana.mp4");
    createCanvas(640,360);
    let slider = createSlider(10, 300, resolucion);
    
    video.hide(); // oculta el elemento <video> en la página
    //video.play(); // comienza a reproducir el video
    slider.position(10, 10); // establece la posición del scrollbar
    slider.input(updateData); // llama a la función updateData() cuando se mueve el scrollbar
    video.loop();
  }
  
  function draw() {
  
      let img =video.get();
      Pixelar(img)
      
  }
  
  function Pixelar(img){
    
    let h= height;
    let w= width;
  
    img.resize(resolucion,resolucion); // reduce el tamaño de la imagen
    
    img.resize(w, h); // vuelve a escalar la imagen a su tamaño original, creando el efecto de pixelado
    image(img, 0, 0); // muestra la imagen pixelada
  }
  function updateData(){
    resolucion=this.value();
  }
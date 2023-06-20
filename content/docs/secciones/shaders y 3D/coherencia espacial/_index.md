---
bookCollapseSection: true
weight: 4
---


# Spatial coherence 

## Introducción 
<blockquote>
<p style = 'text-align: justify;'>
Este ejercicio tiene como objetivo  comparar  los procesos de la entrega uno de ilusiones visuales y los mismos procesos pero realizados con Shaders .La finalidad es demostrar que los procesos paralelos son considerablemente más rápidos que los lineales.. 
<br>
Durante la realización de este ejercicio, se emplea un concepto importante conocido como procesamiento de señales (Downsampling). Este proceso se utiliza comúnmente con señales digitales para obtener aproximaciones de lo que se habría observado de una señal a una velocidad más baja, es decir, realizando un submuestreo. En este ejercicio, se utiliza para ajustar la forma en que los píxeles son procesados en los Shaders, de manera eficiente y equitativa para cada núcleo del procesador.
</p>
</blockquote>


## Antecedentes
<blockquote>
<p style = 'text-align: justify;'>
En la entrega anterior se realizaron dos ejercicios sobre <a href="/showcase/docs/secciones/ilusiones-visuales/Coherencia-espacial/"> coherencia espacial </a>uno con color averaging 
que utilizaba una función especial de P5.js para recalcularla resolución de la imagen mediante la función "resize()". El segundo ejercicio  fue  "spathial coherence" donde se calculaba el color más frecuente en el cuadro que se debía unir y se pintaba dicho color.
<br>
Para este ejercicio, se ha desarrollado un nuevo algoritmo lineal que calcula el promedio de color de los cuadros que se deben unir y lo coloca en el píxel más grande formado. Este algoritmo se llama "pixelator original" y fue mencionado en la entrega anterior sobre ilusiones visuales.
</p>
</blockquote>

## Ejercicio 
{{< hint info >}}

<p style='text-align: justify;'>
Implemente un software pixelator que no use coherencia espacial y compare los resultados obtenidos.
</p>

{{< /hint >}}

## Resultados
<blockquote>
<p style = 'text-align: justify;'>
Debido a consideraciones de rendimiento, los ejercicios se presentaron en páginas separadas.
<br>
Se realizaron dos ejercicios para compararlos,el  <a href=" /showcase/docs/secciones/shaders-y-3D/coherencia-espacial/Shaders/">ejercicio 1</a> se implementó  con Shaders , es una adaptación del ejercicio proporcionado por  el profesor en el que se puede pixelar una imagen o un video y hay un slider para ajustar el tamaño de los pixeles a gusto del usuario. En este ejercicio se colocó también en la parte superior derecha la cuenta de los FPS a los que corre el programa y se puede observar que siempre está sobre los 60fps tanto en imagen como en video, así mismo, la fluidez del programa se siente a simple vista. 
<br>
Para el <a href=" /showcase/docs/secciones/shaders-y-3D/coherencia-espacial/Lineal/">ejercicio 2</a> se tiene el pixelator lineal que calcula el promedio de color de los pixeles que debe unir por medio de dos for anidados y luego colorea el pixel que le corresponde. Este ejercicio también tiene una opción para imagen o video y un slider para decidir que tna pixelado se quiere la imagen, sin embargo, como puede comprobar el usuario, es supremamente lento y se traba a cada rato, esto porque la carga operacional que se ejerce para un programa lineal es muy grande. Esto se comprueba en la parte superior derecha donde también se puso la cantidad de FPS a los que trabaja el programa y se puede verificar que no sube de 3, y casi siempre está en 0 porque sencillamente no puede cargar todas las operaciones que debe hacer en un tiempo razonable. Razón por la cual también tuvimos que ponerlos en páginas separadas, porque si no no funcionaban los shaders y la página completa explotaba y dejaba de funcionar.
<br>
Si se desea examinar con más detalle el código implementado en esta sección, se proporcionarán los códigos JavaScript de los dos ejercicios, así como el archivo .frag utilizado para los Shaders.
</p>
</blockquote>

### Código
<blockquote>
{{< details title="Código completo Ejercicio 1, la implementación con shaders" open=false >}}

```javascript
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
```

{{< /details >}}
</br>
El código del shader utilizado:

{{< details title="Shader.frag" open=false >}}

```glsl
precision mediump float;


uniform sampler2D source;

uniform bool original;

uniform bool uv;

uniform float resolution;

varying vec2 texcoords2; // (defined in [0..1] ∈ R)

void main() {
  if (original) {
    gl_FragColor = uv ? vec4(texcoords2.st, 0.0, 1.0) :
                        texture2D(source, texcoords2);
  }
  else {


    vec2 stepCoord = texcoords2 * resolution;

    stepCoord = floor(stepCoord);
  
    stepCoord = stepCoord / vec2(resolution);
   
    gl_FragColor = uv ? vec4(stepCoord.st, 0.0, 1.0) :
                        texture2D(source, stepCoord);
   
  }
}
```

{{< /details >}}
</br>
Y el código del pixelator lineal:

{{< details title="Código completo Ejercicio 2, la implementación del pixelator lineal" open=false >}}

```javascript

let img;
let video;
let pixelSize = 10;
let useVideo = false;
let checkbox;
let slider;
let font;

function preload() {
    img = loadImage("/showcase/sketches/shaders_pixelation/peinture.jpg", () => {
        img.resize(width, height);
    });
      font = loadFont("/showcase/sketches/shaders_pixelation/Roboto-Regular.ttf");

    video = createVideo(["/showcase/sketches/shaders_pixelation/wagon.webm"]);
    video.hide();
    video.loop();
}

function setup() {
    createCanvas(img.width, img.height);
    textFont(font);
    textSize(15);
    noStroke();
    noSmooth(); // disable smoothing for pixelated effect
    checkbox = createCheckbox('Use video', false);
    checkbox.position(10, 10);
    slider = createSlider(1, 50, 10);
    slider.position(10, 30);
    slider.style('width', '80px');
    //quitarle el sonido al video
    video.volume(0);
}

function draw() {
    background(255);
    pixelSize = slider.value();
    useVideo = checkbox.checked();
    if (useVideo) {
        //mostrar el video
        image(video, 0, 0, width, height);
        img =
        video.get();
        Pixelar(img);
        
    } else {
        img= img.get();
        image(img, 0, 0, width, height);
        img.loadPixels();
        Pixelar(img);
    }
    fill(0);
    //show framerate
    text("FPS: " + floor(frameRate()), width-50, 15);

}

function Pixelar(img){
    for (let x = 0; x < img.width; x += pixelSize) {
        for (let y = 0; y < img.height; y += pixelSize) {
            let c = getAverageColor(img, x, y, pixelSize);
            fill(c);
            rect(x, y, pixelSize, pixelSize);
        }
    }
}

function getAverageColor(img, x, y, size) {
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = x; i < x + size; i++) {
        for (let j = y; j < y + size; j++) {
            if (i < img.width && j < img.height) {
                let c = img.get(i, j);
                r += red(c);
                g += green(c);
                b += blue(c);
                count++;
            }
        }
    }
    r /= count;
    g /= count;
    b /= count;
    return color(r, g, b);
}

function toggleUseVideo() {
    useVideo = !useVideo;
    if (useVideo) {
        video.loop();
    } else {
        video.pause();
    }
}

```

{{< /details >}}
</br>
</blockquote>

## Conclusiones y trabajo futuro

<blockquote>
<p style = 'text-align: justify;'>
En conclusión, hemos comprendido la importancia de los Shaders en el campo de la computación gráfica. Sin ellos, el avance de los videojuegos y otras aplicaciones gráficas no habría llegado tan lejos como lo ha hecho. Los Shaders permiten un procesamiento paralelo eficiente, lo que garantiza un rendimiento fluido y una experiencia visual de alta calidad. En contraste, los enfoques lineales pueden ser significativamente más lentos y menos efectivos en términos de rendimiento.
<br>
En cuanto al trabajo futuro, es recomendable seguir explorando y aprendiendo sobre el uso de Shaders en diferentes contextos. Esto incluye no solo aplicaciones gráficas, sino también otros campos como la simulación, la realidad virtual y aumentada, y el procesamiento de imágenes y videos en tiempo real. Además, se pueden investigar técnicas más avanzadas de Shaders, como sombreadores de fragmentos más complejos, sombreadores de vértices y geometría, para lograr efectos visuales aún más impresionantes.
<br>
En resumen, los Shaders son una herramienta esencial en el campo de la computación gráfica y su dominio puede abrir nuevas oportunidades para crear experiencias visuales asombrosas.
</p>
</blockquote>

## Referencias
1.  https://visualcomputing.github.io/docs/shaders/spatial_coherence/
2.  https://es.wikipedia.org/wiki/Submuestreo
3. https://es.wikipedia.org/wiki/Pixelado
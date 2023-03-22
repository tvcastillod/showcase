---
weight: 1
---

# Cuantificación del Color y Dithering

<p style="text-align: justify">La cuantificación del color consiste en reducir el número de colores utilizados en una imagen dada un condición. Esto es importante para la visualización de imágenes en dispositivos que soportan un número limitado de colores y para obtener una mayor eficiencia en la compresión de ciertos tipos de imágenes. A continuación se implementarán algunos tipos de dithering como acercamiento al concepto de cuantización de color.</p>

## ¿Qué es dithering?

<p style="text-align: justify">El dithering es una forma de ruido aplicada a una imagen para aleatorizar el error en la cuantificación de color, con el fin de evitar patrones a gran escala, como lo son las bandas de color en imágenes. Asimismo se usa para crear una ilusión de profundidad de color en imágenes con una paleta de colores limitada. Este proceso también suele ser utilizado en el procesamiento de datos de audio y vídeo.</p>

## Thresholding o dithering promedio

<p style="text-align: justify"> Este método consiste en comparar cada valor de píxel con un umbral fijo y dependiendo de esto se le asigna un valor de pixel de 0 o 255, dando como resultado una imagen binaria, compuesta únicamente de pixeles blancos y negros. Aunque es uno de los algoritmos más sencillos, este suele provocar una pérdida de detalle y contorno significativa.</p>
<p style="text-align: justify"> La efectividad de este método se puede evidenciar mejor en imágenes donde la diferencia entre los pixeles de los objetos y del fondo es alta, es decir, imágenes donde los objetos se distinguen fácilmente del fondo. Veamos cómo con la ayuda de un histograma de pixeles podemos aproximar el valor óptimo de umbral para procesar una imagen. Se tiene el siguiente ejemplo:</p>
<p align = "center"><img src = "/showcase/img/example_img_hist.png" alt="" width="450px"><br>Fig.1 - imagen ejemplo con su respectivo histograma de pixeles</p>
<p style="text-align: justify"> Haciendo un análisis general del histograma, podemos notar que hay un pico en pixeles con un valor alrededor de 80, y podemos deducir que estos corresponde al fondo de la imagen, ya que es el color que predomina en la imagen. Con esta simple observación, podemos conjeturar que el valor óptimo de umbral está alrededor 100, pues es allí donde se marca una diferencia de valores en los pixeles. Veamos cómo se ve la imagen con diferentes valores de umbral, en particular en el rango de 100 a 150.
<p align = "center"><img src = "/showcase/img/example_img_u.png" alt="" width="500px"><br>Fig.2 - imagen ejemplo con su respectivo histograma de pixeles</p>
<p style="text-align: justify">Podemos evidenciar que el valor de umbral supuesto es adecuado. Ahora, si intentáramos realizar un análisis similar para una imágen que no cumple con las mismas condiciones sugeridas al inicio, el umbral ya no es tan evidente y de hecho, la imagen resultante en general no es clara(vease la figura 3).</p>

<p align = "center"><img src = "/showcase/img/example2_img_hist_u.png" alt="" width="500px"><br>Fig.3 - histograma de pixeles e imagenes con umbral igual a 100 125 y 150</p>

<p style="text-align: justify">Esto ocurre ya que los pixeles de la imagen son más homogéneos, lo cual hace que no se puedan diferencia tan fácilmente los objetos en la imagen, lo cual se puede evidenciar en el histograma, el cual no muestra un patrón que nos ayude a diferenciar las zonas de la imagen como en el anterior ejemplo.</p>
<p style="text-align: justify">A continuación, tenemos la implementación del algoritmo de thresholding. Se pueden cargar imágenes a color, las cuales son transformadas a escala de grises para posteriormente aplicar el algoritmo. Además, muestra el histograma con los valores de los pixeles y la cantidad que hay de cada uno. Se puede ajustar el valor de threshold en un rango de 0 a 250 con saltos de 25.</p>

{{<p5-iframe sketch="/showcase/sketches/dithering/thresholding.js" width="625" height="525">}}

{{< details title="Código fuente - implementación del algoritmo de thresholding" open=false >}}

```javascript
let img; //imagen original
let newImg; //imagen transformada
let slider;
let pxs = new Array(256); //arreglo de cantidad de cada pixel
let modified = false;
let thr = 50; //valor del umbral
let maxval = 255;
let cur_thr;

function preload() {
  img = loadImage("/showcase/sketches/dithering/paleta_grises.png");
}

function setup() {
  createCanvas(600, 500);
  background("#C0DDEB");
  input = createFileInput(handleFile);
  input.position(10, height - 190);
  slider = createSlider(0, 250, 50, 25);
  slider.position(10, height - 30);
  slider.style("width", "150px");
  text("thresholding value", 170, height - 15);
  text("  0     50  100  150  200   250", 10, height - 35);
  cur_thr = slider.value();
  modified = true;
}

function dst(x, y) {
  //calcula el pixel destino
  if (src(x, y) > thr) {
    //condición thresholding
    return color(maxval, maxval, maxval);
  } else {
    return color(0, 0, 0);
  }
}

function src(x, y) {
  //obtiene el pixel original
  px = img.get(x, y)[0];
  return px;
}

function updateImg() {
  newImg = createGraphics(img.width, img.height);
  newImg.loadPixels();
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      newImg.set(i, j, dst(i, j));
    }
  }
  newImg.updatePixels();
  image(newImg, width / 2, 0);
  getPixelInfo();
}

function draw() {
  if (img != null && img.width > 10) {
    if (img.width > 300 || img.height > 300) {
      /*si el tamaño de la imagen es muy grande,
      se hace un reajuste*/
      if (img.width - img.height < 50 || img.width <= img.height) {
        imgW = (300 * img.width) / img.height;
        imgH = 300;
      } else {
        imgW = 300;
        imgH = (300 * img.height) / img.width;
      }
      img.resize(imgW, imgH);
      getPixelInfo();
    }
    image(img, 0, 0);
    thr = slider.value();
    if (modified == true || thr != cur_thr) {
      /*actualiza la imagen filtrada sólo cuando se modifica el
      valor del umbral o cuando se sube una nueva imagen,evitando
      así la repetición de cálculos en cada llamada a draw()*/
      updateImg();
      modified = false;
      cur_thr = slider.value();
    }
  }
  fill("#C0DDEB");
  noStroke();
  rect(width / 2 + img.width, 0, width / 2 - img.width, width / 2);
  rect(img.width, 0, width / 2 - img.width, width / 2);
  rect(width / 2, img.height, img.width, width / 2 - img.height);
  rect(0, img.height, img.width, width / 2 - img.height);

  //gráfica de pixeles
  noStroke();
  fill("#FFF5A2");
  rect(width / 2, 300, 300, 200);
  let sp = "         ";
  fill(50);
  text(
    "  0" + sp + "  50" + sp + " 100" + sp + "150" + sp + "200" + sp + "250",
    width / 2 + 10,
    height - 25
  );
  fill("red");
  graph();
  noStroke();
  fill("black");
  translate(width / 2 + 12, height - 90);
  rotate(-HALF_PI);
  text("cantidad", 0, 0);
  translate(-80, 100);
  rotate(HALF_PI);
  text("valor del pixel", 0, 0);
}

function handleFile(file) {
  if (file.type === "image") {
    modified = true;
    img = loadImage(file.data);
    img.filter(GRAY); // convierte la imagen a escala de grises
  } else {
    alert("El archivo seleccionado no es una imagen.");
  }
}

function drawImage() {
  background(220);
  image(img, 100, 100);
}

function getPixelInfo() {
  pxs = new Array(256);
  for (let i = 0; i <= 255; i++) pxs[i] = 0;
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      pxs[get(i, j)[0]] += 1;
    }
  }
}

function graph() {
  strokeWeight(1);
  stroke("red");
  fill("blue");
  let m = max(pxs);
  for (let i = 0; i <= 255; i++) {
    line(
      width / 2 + 20 + i * 1,
      height - 38,
      width / 2 + 20 + i * 1,
      height - 38 - (pxs[i] / m) * (200 - 38 - 10)
    );
  }
}
```

{{< /details >}}

{{< hint info >}}

<p style='text-align: justify;'>Debido a que la escogencia del umbral es vital, y este depende en gran medida de la composición de la imagen, lo ideal es que este valor sea definido automáticamente. Por esto existen métodos un poco más elaborados de thresholding basados en características como la forma del histograma, los atributos del objeto, la entropía. Además, de métodos basados en clustering(agrupación), métodos espaciales y métodos locales(ver referencia 3).</p>
{{< /hint >}}

## Referencias

1. Wikipedia contributors. "Dither". From https://en.wikipedia.org/wiki/Dither#Applications
2. Bankhead, Pete. "Thresholding". From https://bioimagebook.github.io/chapters/2-processing/3-thresholding/thresholding.html
3. Guruprasad, Prathima. "OVERVIEW OF DIFFERENT THRESHOLDING METHODS IN IMAGE PROCESSING".From https://www.researchgate.net/publication/342038946_OVERVIEW_OF_DIFFERENT_THRESHOLDING_METHODS_IN_IMAGE_PROCESSING

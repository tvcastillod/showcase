---
weight: 1
---

# Cuantificación del Color y Dithering

## Introducción

<blockquote>
<p style="text-align: justify">La cuantificación del color consiste en reducir el número de colores utilizados en una imagen dada un condición. Esto es importante para la visualización de imágenes en dispositivos que soportan un número limitado de colores y para obtener una mayor eficiencia en la compresión de ciertos tipos de imágenes. A continuación se implementarán algunos tipos de dithering como acercamiento al concepto de cuantización de color.</p>

</blockquote>

### Antecedentes y trabajo previo

<blockquote>

<p style="text-align: justify">El dithering es una forma de ruido aplicada a una imagen para aleatorizar el error en la cuantificación de color, con el fin de evitar patrones a gran escala, como lo son las bandas de color en imágenes. Asimismo se usa para crear una ilusión de profundidad de color en imágenes con una paleta de colores limitada. Este proceso también suele ser utilizado en el procesamiento de datos de audio y vídeo.</p>

#### Thresholding o dithering promedio

<p style="text-align: justify"> Este método consiste en comparar cada valor de píxel con un umbral fijo y dependiendo de esto se le asigna un valor de pixel de 0 o 255, dando como resultado una imagen binaria, compuesta únicamente de pixeles blancos y negros. Aunque es uno de los algoritmos más sencillos, este suele provocar una pérdida de detalle y contorno significativa.</p>

#### Dithering aleatorio

<p style="text-align: justify"> Este método es análogo al thresholding básico, la única diferencia es que en vez de tener un valor de umbral fijo, se tiene un valor aleatorio entre 1 y 256 para cada pixel. En este caso no tenemos el problema de hallar el valor indicado de umbral sin embargo el "ruido blanco" que se genera por la aleatoriedad hace que el detalle de la imagen se pierda.
</p>

#### Trabajo previo

A continuación se listan algunos trabajos previos realizados sobre este tema:

- [Image Based Artistic Dithering](https://www.visgraf.impa.br/Courses/ip00/proj/Dithering1/) es un software que implementa los algoritmos más clásicos de dithering como dithering promedio, dithering de Floyd-Steinberg, dithering ordenado y dithering aleatorio.
- [Dither it!](https://ditherit.com/) es una herramienta que nos da dos opciones de dithering, el método de Bayer y el método de difusión de error, además permite modificar la paleta de colores de la imagen final.

</blockquote>

## Ejercicio

{{< hint info >}}
Investigar e implementar algunas aplicaciones visuales de dither.
{{< /hint >}}

### Solución

<blockquote>

<p style="text-align: justify"> Primero, analicemos el algoritmo de thresholding. La efectividad de este método se puede evidenciar mejor en imágenes donde la diferencia entre los pixeles de los objetos y del fondo es alta, es decir, imágenes donde los objetos se distinguen fácilmente del fondo. Veamos cómo con la ayuda de un histograma de pixeles podemos aproximar el valor óptimo de umbral para procesar una imagen. Se tiene el siguiente ejemplo:</p>

<br>

<p align = "center"><img src = "/showcase/img/example_img_hist.png" alt="" width="450px"><br>Fig.1 - imagen ejemplo con su respectivo histograma de pixeles</p>

<br>

<p style="text-align: justify"> Haciendo un análisis general del histograma, podemos notar que hay un pico en pixeles con un valor alrededor de 80, y podemos deducir que estos corresponde al fondo de la imagen, ya que es el color que predomina en la imagen. Con esta simple observación, podemos conjeturar que el valor óptimo de umbral está alrededor 100, pues es allí donde se marca una diferencia de valores en los pixeles. Veamos cómo se ve la imagen con diferentes valores de umbral, en particular en el rango de 100 a 150.

<br>

<p align = "center"><img src = "/showcase/img/example_img_u.png" alt="" width="500px"><br>Fig.2 - imagen ejemplo con su respectivo histograma de pixeles</p>

<br>

<p style="text-align: justify">Podemos evidenciar que el valor de umbral supuesto es adecuado. Ahora, si intentáramos realizar un análisis similar para una imagen que no cumple con las mismas condiciones sugeridas al inicio, el umbral ya no es tan evidente y de hecho, la imagen resultante en general no es tan clara(véase la figura 3).</p>

<p align = "center"><img src = "/showcase/img/example2_img_hist_u.png" alt="" width="500px"><br>Fig.3 - histograma de pixeles e imágenes con umbral igual a 100 125 y 150</p>

<br>

<p style="text-align: justify">Esto ocurre ya que los pixeles de la imagen son más homogéneos, lo cual hace que no se puedan diferencia tan fácilmente los objetos en la imagen, lo cual se puede evidenciar en el histograma, el cual no muestra un patrón que nos ayude a diferenciar las zonas de la imagen como en el anterior ejemplo.</p>

<blockquote>
<p style="text-align: justify">A continuación, tenemos la implementación del algoritmo de thresholding. Se pueden cargar imágenes a color, las cuales son transformadas a escala de grises para posteriormente aplicar el algoritmo. Además, muestra el histograma con los valores de los pixeles y la cantidad que hay de cada uno. Se puede ajustar el valor de threshold en un rango de 0 a 250 con saltos de 25.</p>

{{<p5-iframe sketch="/showcase/sketches/dithering/thresholding.js" width="625" height="525">}}

</blockquote>
{{< hint info >}}

<p style='text-align: justify;'>Debido a que la escogencia del umbral es vital, y este depende en gran medida de la composición de la imagen, lo ideal es que este valor sea definido automáticamente. Por esto existen métodos un poco más elaborados de thresholding basados en características como la forma del histograma, los atributos del objeto, la entropía. Además, de métodos basados en clustering(agrupación), métodos espaciales y métodos locales(ver referencia 3).</p>
{{< /hint >}}

<div style='text-align: justify;'>
Ahora, veamos el algoritmo de dithering aleatorio. En este caso ya no tenemos control directo sobre el valor del umbral, ya que este depende únicamente de cómo se generen los números aleatorios para cada pixel. Al igual que el método anterior, este algoritmo es más conveniente para imágenes donde los objetos se distinguen fácilmente del fondo, pues de lo contrario, el ruido que se genera hace más difícil distinguir los objetos en la imagen. Veamos un primer ejemplo de esto:

<br>

<p align = "center"><img src = "/showcase/img/img_dit_aleat.png" alt="" width="500px"><br>Fig.3 - imagen generado con dithering aleatorio</p>

<br>

Podemos observar que la imagen se puede distinguir fácilmente y es bastante similar a la original, incluyendo detalles como las zonas oscuras al interior de los objetos. Es importante tener en cuenta que los valores aleatorios se están generando en un rango de 0 a 255 pixeles, pero ¿qué pasa si este rango cambia? tal vez podríamos lograr un balance entre el primer método y el actual. Veamos qué sucede si cambiamos el rango en el que se genera el umbral aleatorio, en una imagen con mayor detalle y rango de pixeles.

<p align = "center"><img src = "/showcase/img/img_dit_aleat2.png" alt="" width="400px"><br>Fig.3 - imagen con valores de umbral aleatorio en distintos rangos</p>

<br>

Al limitar el rango de aleatoriedad, se reduce la cantidad de ruido que se genera, por lo que podemos notar una mejora significativa en la imagen. Vemos que detalles como sombras o ciertos objetos que probablemente no se podrían ver con claridad usando thresholding. Aquí, lo interesante es identificar un rango ideal para lograr la mayor cantidad de detalles con la menor cantidad de ruido posible.

Notemos que para la primera imagen utilizada(figura 1), usando thresholding obtenemos un resultado adecuado, sin embargo, usando dithering aletorio y limitando el rango del umbral podemos obtener una imagen un poco más detallada.

<p align = "center"><img src = "/showcase/img/img_dit_aleat3.png" alt="" width="500px"><br>Fig.3 - otro ejemplo de dithering aleatorio sujeto a un rango de 50 a 200px</p>

</div>

<blockquote>
<p style="text-align: justify">A continuación, tenemos la implementación del algoritmo de dithering aleatorio. Este funciona de la misma manera que el anterior algoritmo, solo que en este caso, el parámetro a modificar es el rango de valores en los cuales varía el umbral generado aleatoriamente. Además, se da la opción al usuario de generar una nueva imagen con valores aleatorios diferentes.</p>
{{<p5-iframe sketch="/showcase/sketches/dithering/random_dithering.js" width="625" height="425">}}
</blockquote>

</blockquote>

### Código

<blockquote>

{{< details title="Código completo la implementación del algoritmo de thresholding" open=false >}}

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

<div style='text-align: justify;'>

A continuación se muestra de forma más detallada las partes claves del código anterior.

{{< details title="algoritmo base de dithering" open=true >}}
Como algoritmo base tenemos la función `dst` que retorna el pixel final resultante del algoritmo de dithering. Dentro de esta, la función `src` obtiene el pixel de la imagen original para después evaluar si este es mayor o menor al umbral `thr` definido y dependiendo de esto retorna un pixel blanco `color(255, 255, 255)` o un pixel negro `color(0, 0, 0)`.

```javascript
function dst(x, y) {
  if (src(x, y) > thr) {
    return color(maxval, maxval, maxval);
  } else {
    return color(0, 0, 0);
  }
}

function src(x, y) {
  px = img.get(x, y)[0];
  return px;
}
```

{{< /details >}}
</br>
{{< details title="actualización de la imagen" open=true >}}
Con el fin de evitar cargar y actualizar los pixeles de la imagen en cada llamada de la función `draw()` se opta por tener la función `updateImg()` que es llamada únicamente cuando se carga una imagen o cuando se modifica un parámetro. Esta se encarga de obtener los datos de la imagen original, para esto primero se cargan los datos de los pixeles con ayuda de `img.loadPixels()`, luego creamos un objeto p5.Renderer con `newImg = createGraphics(img.width, img.height)` en el cual vamos a almacenar los datos procesados por nuestro algoritmo con ayuda de un for que recorre toda la imagen y con `newImg.set(i, j, dst(i, j))`. Finalmente, usamos `newImg.updatePixels()` para que aparezcan los cambios y actualizamos la información de los pixeles con `getPixelInfo()` para generar la gráfica correspondiente.

```javascript
function draw(){
  ...
  if (modified == true || thr != cur_thr){
    updateImg();
  ...
}

function updateImg() {
  newImg = createGraphics(img.width, img.height);
  img.loadPixels();
  for (let i = 0; i <= img.width; i++) {
    for (let j = 0; j <= img.height; j++) {
      newImg.set(i, j, dst(i, j));
    }
  }
  newImg.updatePixels();
  image(newImg, width / 2, 0);
  getPixelInfo();
}
```

{{< /details >}}
</br>
{{< details title="gráfica de pixeles" open=true >}}
Cada vez que se actualiza la imagen, la información del número de pixeles que hay de cada valor se actualiza con la función `getPixelInfo()`. Allí se crea un arreglo de tamaño 256 con todas sus posiciones inicializadas en 0, luego se recorre toda la imagen y se va sumando uno a la cantidad total de pixeles con determinado valor. Con esta información se genera la gráfica con `graph()` la cual dependiendo del valor dibuja una línea de un tamaño proporcional a esa cantidad(se usa el valor máximo del arreglo para escalar todos los valores).

```javascript
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

</div>
</br>
{{< details title="Código completo de la implementación del algoritmo de dithering aleatorio" open=false >}}

```javascript
let img; //imagen original
let newImg; //imagen transformada
let slider;
let pxs = new Array(256); //arreglo de cantidad de cada pixel
let modified = false;
let rmin = 1; //rango mínimo del umbral
let rmax = 256; //rango máximo del umbral

function preload() {
  img = loadImage("/showcase/sketches/dithering/paleta_grises.png");
}

function setup() {
  createCanvas(600, 400);
  background("#C0DDEB");
  input = createFileInput(handleFile);
  input.position(10, height - 80);
  button = createButton("generar nueva imagen");
  button.position(width / 2, height - 80);
  button.mousePressed(generateNewImg);
  sel = createSelect();
  sel.position(width / 2 + 160, height - 80);
  sel.option("0 - 255");
  sel.option("50 - 200");
  sel.option("100 - 255");
  sel.selected("0 - 255");
  sel.changed(mySelectEvent);
  modified = true;
}

function dst(x, y) {
  //calcula el pixel destino
  if (src(x, y) > umb) {
    //condición de dithering
    return color(255, 255, 255);
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
      umb = random(rmin, rmax);
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
    if (modified == true) {
      /*actualiza la imagen filtrada sólo cuando se sube una
      nueva imagen,evitando así la repetición de cálculos en
      cada llamada a draw()*/
      updateImg();
      modified = false;
    }
  }
  fill("#C0DDEB");
  noStroke();
  rect(width / 2 + img.width, 0, width / 2 - img.width, width / 2);
  rect(img.width, 0, width / 2 - img.width, width / 2);
  rect(width / 2, img.height, img.width, width / 2 - img.height);
  rect(0, img.height, img.width, width / 2 - img.height);
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

function generateNewImg() {
  modified = true;
}

function mySelectEvent() {
  let item = sel.value();
  if (item == "0 - 255") {
    rmin = 1;
    rmax = 256;
  } else if (item == "100 - 255") {
    rmin = 100;
    rmax = 255;
  } else if (item == "50 - 200") {
    rmin = 50;
    rmax = 200;
  } else {
    rmin = 50;
    rmax = 200;
  }
}
```

{{< /details >}}

<div style='text-align: justify;'>

Para el algoritmo de dithering aleatorio de reutilizó gran parte del código para thresholding. El único cambio significativo es en la variable del umbral `umb` la cual esta vez es generada de manera aleatoria en un rango entre `rmin` y `rmax`, valores que pueden ser modificadas por el usuario.

```javascript
umb = random(rmin, rmax);
```

</div>

</blockquote>

## Conclusión

<blockquote>

<div style='text-align: justify;'>
La implementación del dithering es una buena manera de tener un primer acercamiento al concepto de cuantización de color. Este nos permite representar una imagen en escala de grises como una imagen formada únicamente con pixeles de colores blanco y negro. Existen diversos métodos de dithering, entre ellos están el thresholding o dithering promedio y el dithering aleatorio. Con ambos métodos podemos obtener una buena representación de imágenes con poco nivel de detalle y con alto contraste entre los objetos que la componen. Sin embargo, para imágenes donde los colores son más homogéneos y hay una mayor cantidad de detalles, estos algoritmos suelen fallar. Este problema se pueda solucionar parcialmente utilizando dithering aleatorio para un rango de valores limitado, lo cual ayuda a disminuir el ruido generado por la aleatoriedad, dando con resultado una imagen con más detalle del que se puede obtener con el algoritmo de thresholding.
</div>

### Trabajo Futuro

<div style='text-align: justify;'>
Debido a los diferentes inconvenientes que se generan con una u otra implementación de dithering, han surgido otro tipo de variaciones de este algoritmo, los cuales corrigen algunos problemas o tienen una mejora sustancial en el algoritmo para mejorar la representación de las imágenes. Por esta razón, como trabajo futuro se propone implementar otros tipos de dithering, algunos de los más conocidos incluyen: el dithering ordenado, que usa una matriz para modificar cada pixel y el dithering por difusión de error, que se retroalimenta de la información de los pixeles más cercanos a cada pixel particular. Además, se puede explorar el dithering aplicado en un rango mayor de colores, es decir, utilizar más de dos colores en la generación de una imagen.
<p align = "center"><img src = "/showcase/img/ditheringmontage.png" alt="" width="400px"><br>Fig.3 - diferentes tipos de dithering</p>
</div>

</blockquote>

## Referencias

1. Wikipedia contributors. "Dither". Tomado de https://en.wikipedia.org/wiki/Dither#Applications
2. Bankhead, Pete. "Thresholding". Tomado de https://bioimagebook.github.io/chapters/2-processing/3-thresholding/thresholding.html
3. Guruprasad, Prathima. "OVERVIEW OF DIFFERENT THRESHOLDING METHODS IN IMAGE PROCESSING". Tomado de https://www.researchgate.net/publication/342038946_OVERVIEW_OF_DIFFERENT_THRESHOLDING_METHODS_IN_IMAGE_PROCESSING
4. Correia, A. Salgado, P. Blanco, W. "Random Dithering". Tomado de https://www.visgraf.impa.br/Courses/ip00/proj/Dithering1/random_dithering.html
5. "Dithering". Tomado de https://imagej.net/plugins/dithering

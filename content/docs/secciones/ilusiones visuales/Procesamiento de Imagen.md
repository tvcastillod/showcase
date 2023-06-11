---
weight: 2
---

# Procesamiento de Imágenes y máscaras

## Introducción

<blockquote>
<div style="text-align: justify">

Cuando hablamos de procesamiento de imágenes, nos referimos a un conjunto de técnicas aplicadas a imágenes con el propósito de mejorar la calidad o facilitar la búsqueda de información. En [webgl](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) se utiliza la texturización en el procesamiento de imágenes. En este caso estamos interesados en explorar el uso de máscaras para modificar las imágenes con el fin de obtener resultados como una mayor nitidez en la imágen o detectar los bordes de los objetos que se encuentran dentro de esta.

</div>
</blockquote>

### Antecedentes y trabajo previo

<blockquote>
<div style="text-align: justify">

El procesamiento de imágenes es ampliamente usado en distintos campos de estudio desde la industria del entretenimiento, hasta el campo de la medicina. Algunos de los usos más comunes son: el suavizado de imágenes, la eliminación de ruido, la detección de bordes, entre otros. Este procesamiento permite realzar los detalles de una imagen, lo cual permite obtener información adicional sobre esta. Con el uso de máscaras, herramientas de luminosidad y magnificación, podemos procesar imágenes. Y con el uso de shaders y texturización podemos facilitar aún más este proceso.

</div>

#### Trabajo previo

<div style="text-align: justify">
A continuación se listan algunos trabajos previos realizados sobre este tema:

- [Photokako](https://www.photo-kako.com/en/convolution/) Es una herramienta que nos permite aplicar diferentes máscaras, con matrices definidas por el usuario, o predeterminados con efectos como detección de bordes.
- [Planetcalc](https://planetcalc.com/9313/) Esta página ofrece numerosas herramientas y una de ellas permite procesar imágenes con los efectos más comunes como el suavizado y difuminado de imágenes.
</div>
</blockquote>

## Ejercicio

{{< hint info >}}
Implementar una aplicación de procesamiento de imagen/ video que utilice diferentes [máscaras](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29), incluyendo otros tamaños de kernel diferente a 3x3, y:

- Una herramienta base de [región de interés](https://en.wikipedia.org/wiki/Region_of_interest) para aplicar selectivamente una máscara determinada. Sugerencia: las regiones circulares alrededor del puntero del ratón son prácticas y bastante sencillas de implementar mediante la [distancia glsl](https://thebookofshaders.com/glossary/?search=distance).
- Una herramienta de lupa. Requiere un poco de investigación. Por ejemplo, se puede buscar en [shadertoy](https://www.shadertoy.com/results?query=magnifier).
- Integrar [luma](https://visualcomputing.github.io/docs/shaders/texturing/#texture-sampling) y otras [herramientas de brillo de coloración](https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages).
  {{< /hint >}}

### Solución

<blockquote>

#### Texturado

<div style="text-align: justify">

Para el procesamiento de imágenes, se utilizará el concepto de texturización, implementado con shaders. Cuando hablamos de textura nos referimos a un mapa de bits o una textura procedimental (una imagen) la cual se mapea sobre una superficie de una forma específica. Para manipular una imagen con el uso de shaders, es necesario utilizar la función `texture2D(texture, texcoords)` la cual muestrea la imagen `texture` en las coordenadas de textura `texcoords`.

</div>

#### Máscaras

<div style="text-align: justify">

Para crear diferentes efectos en las imágenes, utilizaremos máscaras. Una máscara, kernel o matriz de convolución es una matriz la cual se opera con la información de los pixeles de la imagen con el fin de lograr diferentes efectos de enfoque, desenfoque, nitidez, detección de bordes, entre otros. El proceso se compone de 3 elementos:

- Una imagen de entrada de dimensión igual o mayor a la de la máscara que se va a aplicar.
- Una máscara de convolución, es decir, una matriz cuadrada de dimensión impar.
- La imagen de salida del mismo tamaño que la imagen original.

El procedimiento consiste en aplicar la máscara a cada uno de los pixeles de la imagen. La idea es multiplicar componente a componente la matriz de convolución por la matriz que contiene al pixel actual y los pixeles que lo rodean, para después sumar los valores y obtener el nuevo valor del pixel en la imagen procesada. En la figura 1 se puede ver una ilustración de este proceso.

<p align = "center"><img src = "/showcase/img/convolution.png" alt="" width="400px"><br>Fig.1 - Operación de convolución</p>

A continuación veremos algunos ejemplos de máscaras y los efectos que tienen sobre una imagen.

<p align = "center"><img src = "/showcase/img/convol1.png" alt="" width="610px"><br>Fig.2 - Máscaras IDENTITY, RIDGE y SHARPEN</p>

Primero tenemos la máscara `IDENTITY` o identidad, esta matriz solo le da peso al pixel del centro que es el pixel a modificar, por lo que no tiene ningún efecto sobre la imagen, ya que simplemente mapea cada pixel inicial a la imagen resultante. Segundo, tenemos la máscara `RIDGE` o de bordes, esta matriz le da un peso negativo a los pixeles que rodean al pixel principal **_p_**, esto con el fin de que para valores muy cercanos a **_p_** (es decir, cuando no hay bordes y la superficie es más bien homogénea), el resultado es pequeño tomando colores oscuros; mientras que para valores lejanos a **_p_** (es decir, cuando hay presencia de bordes y hay un contraste significativo de colores), el resultado es mayor y toma colores más claros, haciendo que estos bordes destaquen en la imagen final, por esta razón con esta máscara se pueden detectar los bordes de una imagen. Tercero, tenemos la máscara `SHARPEN`, esta matriz le da peso únicamente a los pixeles que están abyacentes al pixel principal **_p_**, esto da como resultado una imagen más nítida donde los detalles, como los borden, son resaltados.

<p align = "center"><img src = "/showcase/img/convol2.png" alt="" width="610px"><br>Fig.3 - Máscaras SHARPEN2, GAUSSIAN BLUR y EMBOSS</p>

Las máscaras mencionadas anteriormente pueden tener algunas variantes que generan resultados ligeramente distintos en la imagen final, por ejemplo, tenemos una segunda versión de la máscara de nitidez, la cual llamamos `SHARPEN2`, esta le da un poco más de peso al pixel **_p_** haciendo que la nitidez de la imagen sea mucho mayor que la de la otra máscara, en la figura 3 podemos ver cómo algunos detalles como el pelaje del animal es más notorio en ciertas zonas. También tenemos la máscara `GAUSSIAN BLUR` o de difuminado Gaussiano la cuál nos permise suavizar la imágenes generando un efecto de desenfoque que hace ver a la imagen un poco borrosa, aquí vemos que la matriz es más grande con un tamaño de 5x5 la cual determina el grado de desenfoque que se aplica (si tomaramos una matriz más grande la imagen final se vería aún más borrosa). Por último, tenemos la máscara `EMBOSS` o de relieve, en este caso la matriz le da un poco más de peso a los pixeles que hay alrededor de **_p_** resaltando aún más los bordes de la imagen, dando a la imagen un poco de relieve.

Adicional a las máscaras existen otras herramientas que nos permiten ver detalles específicos de las imágenes, sin necesidad de aplicar el filtro a la imágen completa. Esto nos sirve para cuando solo estamos interesados en analizar solo una parte de la imagen o hacer comparaciones con la imagen original. A continuación hablaremos de 2 de estas herramientas.

</div>

#### Herramienta de región de interés (ROI) y magnificación

<div style="text-align: justify">

<p align = "center"><img src = "/showcase/img/tools1.png" alt="" width="400px"><br>Fig.4 - Región de interés (ROI) y magnificación</p>

Por un lado, tenemos la herramienta de región de interés o en inglés Region Of Interest (ROI). Esta consiste en tomar una sección de la imagen la cual se quiere detallar o analizar. Estas se suelen usar en distintos ámbitos, como por ejemplo en imágenes médicas cuando se quiere analizar los límites de un tumor. En la figura 4 podemos ver en la imagen izquierda que se aplicó la máscara de **_RIDGE_** únicamente en una parte de la imagen, en este caso, una parte de las alas del animal. Por otro lado, tenemos la herramienta de magnificación la cuál es básicamente una lupa que nos permite ver una parte de la imagen más de cerca (con más zoom). En la figura 4 podemos ver a la derecha que se hizo un acercamiento a la cabeza del pájaro, lo cual nos permite ver con más detalle a este además de ver mejor cómo actúa la máscara de **_difuminado Gaussiano_**.

Además de las herramientas mencionadas anteriormente, tenemos otras que nos permiten manipular el brillo de una imagen, esto con el fin de resaltar ciertar zonas de la imagen donde hay una mayor luminosidad. A continuación mencionamos 4 métodos para modificar el brillo de una imagen.

</div>

#### Herramienta de brillo

<div style="text-align: justify">

Es importante mencionar que existen representaciones alternas al modelo de color RGB, las cuales fueron diseñadas con el fin de ajustarse más a la forma en la que la visión humana percibe el color. Cada modelo destaca atributos diferentes de color, como la intensidad o luminosidad, algunos de los modelos más conocidos son el HSL (Hue, Saturation, Lightness) y el HSV (Hue, Saturation, Value). Veamos cómo está definido cada uno y qué efecto tiene en una imagen. Primero, tenemos la opción de `INTENSITY` o intensidad, esta se refiere al brillo u opacidad de un color, si es más brillante es más intenso,y si es más oscuro tiene menor intensidad. Esta se calcula tomando el promedio de los valores RGB `I = (R + G + B) / 3` lo cual nos dá como resultado una imagen donde la intensidad de los colores está balanceada como podemos ver en la primera imagen de la figura 5. Segundo, tenemos la opción de `VALUE` o valor, la cual nos dice que tan claro u oscuro es un color, este toma el valor máximo de los valores RGB `V = máx {R, G, B}`. Recordemos que entre mayor es el número el color es más claro y por ende más brillante, por lo cual esta opción nos permite hacer la imagen más brillante en las zonas donde los colores son más claros como se puede observar en la segunda imagen de la figura 5.

<p align = "center"><img src = "/showcase/img/tools2.png" alt="" width="630px"><br>Fig.5 - Herramientas de brillo Intensity, Value, Lightness y Luma</p>

Tercero, tenemos la opción de `LIGHTNESS` la cual se define como el promedio de la mayor y menor componente de los valores RGB, lo cual da como resultado los componentes medios de la paleta de colores, es decir, nos ayuda a balancear el brillo de una imagen al igual que el modelo **_INTENSITY_**. En la tercera imagen de la figura 5 podemos ver que el resultado es muy similar el de la primera imagen. Cuarto, tenemos la opción de `LUMA` la cual es definida como la media ponderada de los valores RGB con corrección gamma, es decir, esta se base en la contribución de cada canal a la luminosidad percibida. Los factores de cada componente pueden variar dependiendo el estándar que se utilice como referencia, en este caso se toma **_SDTV (Standard Definition Television)_** la cual se define como `Y = 0.2989 R + 0.5870 G + 0.1140 B`, y podemos ver el resultado en la última imagen de la figura 5, allí podemos notar que también se llogra un balance pero destacando ligeramente las zonas donde los colores son más claros y brillantes.

<blockquote>

A continuación tenemos la implementación de toda la información dada anteriormente. En primera instancia tenemos la opción de escoger entre 6 diferentes máscaras, incluyendo algunas con una tamaño diferente al usual de 3x3. Además, tenemos la opción de usar herramientas de magnificación y región de interés, a las cuales se les pueden modificar el tamaño de la región que se quiere observas y para el caso de la lupa también se puede ajustar el zoom. Finalmente, tenemos la opción de aplicar 4 modelos diferentes de iluminación, los cuales se muestra en escala de grises ya que el valor resultante se toma para los tres canales de color.

{{<p5-iframe sketch="/showcase/sketches/image_processing/img_process.js" width="575" height="455" background-color="white">}}

</blockquote>

</div>

</blockquote>

### Código

<blockquote>

{{< details title="Código completo la implementación de las diferentes herramientas de procesamiento de imagen" open=false >}}

```javascript
let img, myShader;
let mode = 2;
let mask5 = false;
let tool = 2;
let btool = 1;
let zoom = 0.3;

function preload() {
  img = loadImage("/showcase/sketches/image_processing/anim2.png");
  myShader = loadShader(
    "/showcase/sketches/image_processing/shader.vert",
    "/showcase/sketches/image_processing/shader.frag"
  );
}

function setup() {
  createCanvas(400, 400, WEBGL);
  input = createFileInput(handleFile);
  input.position(10, height + 15);
  selectMode = createSelect();
  selectMode.position(410, 35);
  selectMode.option("IDENTITY");
  selectMode.option("RIDGE");
  selectMode.option("SHARPEN");
  selectMode.option("SHARPEN2");
  selectMode.option("GAUSSIAN BLUR");
  selectMode.option("EMBOSS");
  selectMode.changed(mySelectEvent);
  selectMode.selected("RIDGE");
  selectTool = createSelect();
  selectTool.position(410, 90);
  selectTool.option("NONE");
  selectTool.option("ROI");
  selectTool.option("MAGNIFIER");
  selectTool.changed(mySelectEvent2);
  selectTool.selected("ROI");
  slider = createSlider(20, 100, 80);
  slider.position(410, 140);
  slider.style("width", "100px");
  sliderZoom = createSlider(0.1, 0.6, 0.3, 0.05);
  sliderZoom.position(410, 190);
  sliderZoom.style("width", "100px");
  radio = createRadio();
  radio.option("1", " none  \n");
  radio.option("2", "intensity");
  radio.option("3", "value\n  ");
  radio.option("4", "lightness");
  radio.option("5", "luma");
  radio.style("width", "80px");
  radio.selected("1");
  radio.position(408, 280);
  let text1 = createSpan("Mask");
  text1.position(410, 10);
  let text2 = createSpan("Tool");
  text2.position(410, 65);
  let text3 = createSpan("Size");
  text3.position(410, 120);
  let text4 = createSpan("Zoom");
  text4.position(410, 170);
  let text5 = createSpan("Brightness");
  text5.position(410, 250);
}

let mask_ = [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];
let mask2 = [
  1 / 256,
  4 / 256,
  6 / 256,
  4 / 256,
  1 / 256,
  4 / 256,
  16 / 256,
  24 / 256,
  16 / 256,
  4 / 256,
  6 / 256,
  24 / 256,
  36 / 256,
  24 / 256,
  6 / 256,
  4 / 256,
  16 / 256,
  24 / 256,
  16 / 256,
  4 / 256,
  1 / 256,
  4 / 256,
  6 / 256,
  4 / 256,
  1 / 256,
];
function draw() {
  background(225);
  switch (mode) {
    case 1:
      mask_ = [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];
      break;
    case 2:
      mask_ = [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0];
      break;
    case 3:
      mask_ = [0.0, -1.0, 0.0, -1.0, 5.0, -1.0, 0.0, -1.0, 0.0];
      break;
    case 4:
      mask_ = [-1.0, -1.0, -1.0, -1.0, 9.0, -1.0, -1.0, -1.0, -1.0];
      break;
    case 5:
      mask2 = [
        1 / 273,
        4 / 273,
        7 / 273,
        4 / 273,
        1 / 273,
        4 / 273,
        16 / 273,
        26 / 273,
        16 / 273,
        4 / 273,
        7 / 273,
        26 / 273,
        41 / 273,
        26 / 273,
        7 / 273,
        4 / 273,
        16 / 273,
        26 / 273,
        16 / 273,
        4 / 273,
        1 / 273,
        4 / 273,
        7 / 273,
        4 / 273,
        1 / 273,
      ];
      break;
    case 6:
      mask2 = [
        0, 0, 0, 0, 0, 0, -2, -1, 0, 0, 0, -1, 1, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0,
        0, 0,
      ];
      break;
    default:
    //
  }
  shader(myShader);
  myShader.setUniform("texture", img);
  myShader.setUniform("mask5", mask5);
  myShader.setUniform("mask", mask_);
  myShader.setUniform("mask2", mask2);
  myShader.setUniform("texOffset", [1 / img.width, 1 / img.height]);
  myShader.setUniform("mousePos", [
    mouseX * pixelDensity(),
    (height - mouseY) * pixelDensity(),
  ]);
  rect(0, 0, 100, 100);
  myShader.setUniform("radius", slider.value());
  myShader.setUniform("tool", tool);
  myShader.setUniform("btool", radio.value());
  myShader.setUniform("iResolution", [
    width * pixelDensity(),
    height * pixelDensity(),
  ]);

  zoom = sliderZoom.value();
  xOffset = (zoom * mouseX) / width;
  yOffset = (zoom * mouseY) / height;

  var tiling = [1 - zoom, 1 - zoom];
  var offset = [xOffset, yOffset];

  myShader.setUniform("tiling", tiling);
  myShader.setUniform("offset", offset);
}

function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data);
  } else {
    alert("El archivo seleccionado no es una imagen.");
  }
}

function mySelectEvent() {
  if (selectMode.value() == "IDENTITY") {
    mode = 1;
    mask5 = false;
  }
  if (selectMode.value() == "RIDGE") {
    mode = 2;
    mask5 = false;
  }
  if (selectMode.value() == "SHARPEN") {
    mode = 3;
    mask5 = false;
  }
  if (selectMode.value() == "SHARPEN2") {
    mode = 4;
    mask5 = false;
  }
  if (selectMode.value() == "GAUSSIAN BLUR") {
    mode = 5;
    mask5 = true;
  }
  if (selectMode.value() == "EMBOSS") {
    mode = 6;
    mask5 = true;
  }
}

function mySelectEvent2() {
  if (selectTool.value() == "NONE") tool = 1;
  if (selectTool.value() == "ROI") tool = 2;
  if (selectTool.value() == "MAGNIFIER") tool = 3;
}

var s1 = function (sketch) {
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(570, 50, sketch.WEBGL);
    canvas1.position(0, 400);
  };
  sketch.draw = function () {
    sketch.background(230);
  };
};

new p5(s1);

var s2 = function (sketch) {
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(170, 400, sketch.WEBGL);
    canvas1.position(400, 0);
  };
  sketch.draw = function () {
    sketch.background(230);
  };
};

new p5(s2);
```

{{< /details >}}

<div style='text-align: justify;'>

A continuación se muestra de forma más detallada las partes claves del código anterior.

{{< details title="algoritmo base de dithering" open=true >}}
Como algoritmo...

```javascript

```

{{< /details >}}
</br>
{{< details title="actualización de la imagen" open=true >}}
Con el fin de...

```javascript

```

{{< /details >}}
</br>
{{< details title="gráfica de pixeles" open=true >}}
Cada vez que...

```javascript

```

{{< /details >}}

</div>
</br>
{{< details title="Código completo de la implementación del algoritmo de dithering aleatorio" open=false >}}

```javascript

```

{{< /details >}}

<div style='text-align: justify;'>

Para el algoritmo...

```javascript

```

</div>

</blockquote>

## Conclusión

<blockquote>

<div style='text-align: justify;'>

</div>

### Trabajo Futuro

<div style='text-align: justify;'>

<p align = "center"><img src = "/showcase/img/ditheringmontage.png" alt="" width="400px"><br>Fig.3 - </p>
</div>

</blockquote>

## Referencias

1. Wikipedia contributors. "Digital image processing". Tomado de https://en.wikipedia.org/wiki/Digital_image_processing
2. Bankhead, Pete. "Thresholding". Tomado de https://bioimagebook.github.io/chapters/2-processing/3-thresholding/thresholding.html
3. Guruprasad, Prathima. "OVERVIEW OF DIFFERENT THRESHOLDING METHODS IN IMAGE PROCESSING". Tomado de https://www.researchgate.net/publication/342038946_OVERVIEW_OF_DIFFERENT_THRESHOLDING_METHODS_IN_IMAGE_PROCESSING
4. Correia, A. Salgado, P. Blanco, W. "Random Dithering". Tomado de https://www.visgraf.impa.br/Courses/ip00/proj/Dithering1/random_dithering.html
5. "Dithering". Tomado de https://imagej.net/plugins/dithering

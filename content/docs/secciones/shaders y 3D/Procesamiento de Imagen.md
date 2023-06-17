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

  // valores adaptados de https://gamedevserj.github.io/godot-magnifying-glass-tutorial.html
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
</br>
{{< details title="vertex shader (genérico)" open=false >}}

```javascript
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  // flip the coordinates
  vTexCoord = vec2(aTexCoord.s, 1.0 - aTexCoord.t);

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}
```

{{< /details >}}
</br>
{{< details title="fragment shader" open=false >}}

```javascript
precision mediump float;

uniform sampler2D texture;

uniform vec2 texOffset;
uniform float mask[9];
uniform float mask2[25];
uniform bool mask5;
uniform vec2 mousePos;
uniform int tool;
uniform int btool;
uniform float radius;
uniform vec2 tiling;
uniform vec2 offset;

varying vec2 vTexCoord;

vec4 color_mask;
vec4 color_normal;
vec4 color_base;

vec4 applyMask2(vec2 vTexCoord) {
  vec2 tc0 = vTexCoord + vec2(-2.0*texOffset.s, -2.0*texOffset.t);
  vec2 tc1 = vTexCoord + vec2(-1.0*texOffset.s, -2.0*texOffset.t);
  vec2 tc2 = vTexCoord + vec2(             0.0, -2.0*texOffset.t);
  vec2 tc3 = vTexCoord + vec2(+1.0*texOffset.s, -2.0*texOffset.t);
  vec2 tc4 = vTexCoord + vec2(+2.0*texOffset.s, -2.0*texOffset.t);

  vec2 tc5 = vTexCoord + vec2(-2.0*texOffset.s, -1.0*texOffset.t);
  vec2 tc6 = vTexCoord + vec2(-1.0*texOffset.s, -1.0*texOffset.t);
  vec2 tc7 = vTexCoord + vec2(             0.0, -1.0*texOffset.t);
  vec2 tc8 = vTexCoord + vec2(+1.0*texOffset.s, -1.0*texOffset.t);
  vec2 tc9 = vTexCoord + vec2(+2.0*texOffset.s, -1.0*texOffset.t);

  vec2 tc10 = vTexCoord + vec2(-2.0*texOffset.s,              0.0);
  vec2 tc11 = vTexCoord + vec2(-1.0*texOffset.s,              0.0);
  vec2 tc12 = vTexCoord + vec2(             0.0,              0.0);
  vec2 tc13 = vTexCoord + vec2(+1.0*texOffset.s,              0.0);
  vec2 tc14 = vTexCoord + vec2(+2.0*texOffset.s,              0.0);

  vec2 tc15 = vTexCoord + vec2(-2.0*texOffset.s, +1.0*texOffset.t);
  vec2 tc16 = vTexCoord + vec2(-1.0*texOffset.s, +1.0*texOffset.t);
  vec2 tc17 = vTexCoord + vec2(             0.0, +1.0*texOffset.t);
  vec2 tc18 = vTexCoord + vec2(+1.0*texOffset.s, +1.0*texOffset.t);
  vec2 tc19 = vTexCoord + vec2(+2.0*texOffset.s, +1.0*texOffset.t);

  vec2 tc20 = vTexCoord + vec2(-2.0*texOffset.s, +2.0*texOffset.t);
  vec2 tc21 = vTexCoord + vec2(-1.0*texOffset.s, +2.0*texOffset.t);
  vec2 tc22 = vTexCoord + vec2(             0.0, +2.0*texOffset.t);
  vec2 tc23 = vTexCoord + vec2(+1.0*texOffset.s, +2.0*texOffset.t);
  vec2 tc24 = vTexCoord + vec2(+2.0*texOffset.s, +2.0*texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[25];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);
  rgba[9] = texture2D(texture, tc9);
  rgba[10] = texture2D(texture, tc10);
  rgba[11] = texture2D(texture, tc11);
  rgba[12] = texture2D(texture, tc12);
  rgba[13] = texture2D(texture, tc13);
  rgba[14] = texture2D(texture, tc14);
  rgba[15] = texture2D(texture, tc15);
  rgba[16] = texture2D(texture, tc16);
  rgba[17] = texture2D(texture, tc17);
  rgba[18] = texture2D(texture, tc18);
  rgba[19] = texture2D(texture, tc19);
  rgba[20] = texture2D(texture, tc20);
  rgba[21] = texture2D(texture, tc21);
  rgba[22] = texture2D(texture, tc22);
  rgba[23] = texture2D(texture, tc23);
  rgba[24] = texture2D(texture, tc24);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 25; i++) {
    convolution += rgba[i]*mask2[i];
  }

  vec4 color_mask = vec4(convolution.rgb, 1.0);
  return color_mask;
}

vec4 applyMask(vec2 vTexCoord) {
  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec2 tc0 = vTexCoord + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = vTexCoord + vec2(         0.0, -texOffset.t);
  vec2 tc2 = vTexCoord + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = vTexCoord + vec2(-texOffset.s,          0.0);
  // origin (current fragment texcoords)
  vec2 tc4 = vTexCoord + vec2(         0.0,          0.0);
  vec2 tc5 = vTexCoord + vec2(+texOffset.s,          0.0);
  vec2 tc6 = vTexCoord + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = vTexCoord + vec2(         0.0, +texOffset.t);
  vec2 tc8 = vTexCoord + vec2(+texOffset.s, +texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*mask[i];
  }

  vec4 color_mask = vec4(convolution.rgb, 1.0);
  return color_mask;
}

float intensity(vec3 texel) {
  return (texel.r + texel.g + texel.b)/3.0;
}

float value(vec3 texel) {
  return max(max(texel.r, texel.g), texel.b);
}

float lightness(vec3 texel) {
  float mx = max(max(texel.r, texel.g), texel.b);
  float mn = min(min(texel.r, texel.g), texel.b);
  return (mx + mn)/2.0;
}

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

void main() {
  if (mask5 == true) {
    color_mask = applyMask2(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask2(vTexCoord * tiling + offset);
  } else {
    color_mask = applyMask(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask(vTexCoord * tiling + offset);
  }

  if (btool == 2) {
    color_mask = vec4(vec3(intensity(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(intensity(color_normal.xyz)),1.0);
    color_base = vec4(vec3(intensity(color_base.xyz)),1.0);
  } else if (btool == 3) {
    color_mask = vec4(vec3(value(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(value(color_normal.xyz)),1.0);
    color_base = vec4(vec3(value(color_base.xyz)),1.0);
  } else if (btool == 4) {
    color_mask = vec4(vec3(lightness(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(lightness(color_normal.xyz)),1.0);
    color_base = vec4(vec3(lightness(color_base.xyz)),1.0);
  } else if (btool == 5) {
    color_mask = vec4(vec3(luma(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(luma(color_normal.xyz)),1.0);
    color_base = vec4(vec3(luma(color_base.xyz)),1.0);
  } else if (mask5 == true){
    color_mask = applyMask2(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask2(vTexCoord * tiling + offset);
  } else {
    color_mask = applyMask(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask(vTexCoord * tiling + offset);
  }

  // cálculo de la distancia tomado de https://stackoverflow.com/questions/45270803/webgl-shader-to-color-the-texture-according-to-mouse-position
  float dist = distance(mousePos, gl_FragCoord.xy);
  float mixAmount = clamp((dist - radius) , 0., 1.);

  if (tool == 1) {
    gl_FragColor = color_mask;
  } else if (tool == 2) {
    gl_FragColor = mix(color_mask, color_normal, mixAmount);
  } else {
    gl_FragColor = mix(color_base, color_mask, mixAmount);
  }
}
```

{{< /details >}}

<div style='text-align: justify;'>

A continuación se muestra de forma más detallada las partes claves del código anterior.
{{< details title="parámetros que se envían a los shaders" open=true >}}

Veamos los parámetros que se necesitan enviar al fragment shader. Para aplicar las máscaras se necesita la imagen `texture` la cual es recibida en el shader como un elemento de tipo `sampler2D`, es decir una textura, la cual posteriormente es mapeada con la función `texture2D()`. Además, tenemos la matriz de convolución que corresponde a un vector de tamaño 9(3x3) `mask` o 25(5x5) `mask2`, estas son asignadas a dos variables diferentes. También es necesario definir `texOffset` la cual nos ayuda a obtener los pixeles vecinos del pixel principal cuando se aplica la máscara. Para las herramientas de ROI y magnificación necesitamos los datos de la posición del mouse `mousePos`, además del radio `radius` que indica el tamaño de la región que se quiere observar, y en el caso de la lupa se necesitan `tiling` y `offset` que ayudan a enfocar y hacer zoom a la región deseada. Finalmente se utiliza `tool` y `btool` para indicar qué herramienta de detalle y luminosidad se quiere utilizar.

```javascript
// dentro de la función draw()
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

// valores adaptados de https://gamedevserj.github.io/godot-magnifying-glass-tutorial.html
zoom = sliderZoom.value();
xOffset = (zoom * mouseX) / width;
yOffset = (zoom * mouseY) / height;

var tiling = [1 - zoom, 1 - zoom];
var offset = [xOffset, yOffset];

myShader.setUniform("tiling", tiling);
myShader.setUniform("offset", offset);
```

{{< /details >}}
</br>
{{< details title="código de shaders" open=true >}}

Para el vertex shader el único dato relevante es que debemos pasar información sobre las coordenadas de textura `aTexCoord`, que nos permite definir cómo se mapea una imagen en una superficie. Y pasamos este dato al fragment shader como `vTexCoord`. Además, realizamos una operación que nos permite voltear la imagen, ya que si no se hace, la imagen se muestra al revéz.

```javascript
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  // flip the coordinates
  vTexCoord = vec2(aTexCoord.s, 1.0 - aTexCoord.t);
  ...
}
```

Para el fragment shader tenemos tres secciones importantes:

1. La función `vec4 applyMask2(vec2 vTexCoord)` la cual la operación entre los pixeles de la textura `texture` y la máscara `mask[9]`. El proceso consiste en: primero se hayan los valores de los pixeles que rodean al pixel principal, para esto usamos el parámetro de `texOffset` que nos permite movernos en el espacio de la textura, segundo almacemos estos datos en un array con los valores `rgba` de cada pixel, tercero aplicamos la máscara de convolución con ayuda de un for que recorre ambos arrays mientras opera los valores y almacena la suma en un vector de 4 posiciones `convolution` con el resultado final del color (RGBA) del pixel.

```javascript
vec4 applyMask(vec2 vTexCoord) {
  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec2 tc0 = vTexCoord + vec2(-texOffset.s, -texOffset.t);
  ...

  // origin (current fragment texcoords)
  vec2 tc4 = vTexCoord + vec2(         0.0,          0.0);
  ...
  vec2 tc8 = vTexCoord + vec2(+texOffset.s, +texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  ...
  rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*mask[i];
  }

  vec4 color_mask = vec4(convolution.rgb, 1.0);
  return color_mask;
}
```

Se tomó como referencia el código de [image processing](https://visualcomputing.github.io/docs/shaders/image_processing/) con el procedimiento base para una máscara de 3x3. Este procedimiento se adaptó para una máscara de 5x5, la cual se puede detallar en el código completo del fragment shader.

2. Las funciones para aplicar las herramientas de brillo. Estas son `intensity`, `value`, `lightness` y `luma`, cada una recibe como parámetro un vector `texel` de 3 posiciones que corresponden al color RGB del pixel de la textura o texel, luego se realiza la operación correspondiente y se devuelve un valor de tipo _float_.

```javascript
float intensity(vec3 texel) {
  return (texel.r + texel.g + texel.b)/3.0;
}

float value(vec3 texel) {
  return max(max(texel.r, texel.g), texel.b);
}

float lightness(vec3 texel) {
  float mx = max(max(texel.r, texel.g), texel.b);
  float mn = min(min(texel.r, texel.g), texel.b);
  return (mx + mn)/2.0;
}

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}
```

Las fórmulas se tomaron de la sección [Lightness](https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages) en la página con es tema de los modelos HSL y HSV.

3. Para las herramientas de detalle tenemos por una lado la de magnificación, para este se usan los parámetros de `tiling` y `offset`, los cuales nos dan información sobre cuanto se debe agrandar la imagen (que corresponde al zoom) y cuando se debe desplazar para compensar en cambio de distancia al agrandar la imagen. Este último se calcula antes de pasar al shader, ya que se necesita el tamaño del canvas para calcular en _offset_ ideal. Con estos valores, simplemente en vez de pasar como parámetro `vTexCoord` a la función `applyMask`, se pasa la coordenada multiplicada por el _tiling_ y sumada con el _offset_.

```javascript
color_mask = applyMask(vTexCoord * tiling + offset);
```

Para entender lo anterior se tomó como referencia [Magnifying glass shader](https://gamedevserj.github.io/godot-magnifying-glass-tutorial.html). Por otro lado, tenemos la región de interés, para esta usamos una región circular de radio `radius` definida por el usuario y dada la posición `mousePos`. Para esto usamos la función `distance` para calcular la distancia entre el mouse y el la coordenada del pixel actual, luego restamos el radio y ajustamos el resultado a valores entre 0 y 1. Finalmente, utilizamos la función `mix(x, y, a)` de GLSL que realiza una interpolación lineal entre los pixeles de la textura original _x_ y los pixeles de la textura modificada _y_ utilizando un a peso dado por `mixAmount` _a_ entre ellas, el cual corresponde a la región de interés circular.

```javascript
// en el main()
float dist = distance(mousePos, gl_FragCoord.xy);
float mixAmount = clamp((dist - radius) , 0., 1.);
...
gl_FragColor = mix(color_mask, color_normal, mixAmount);
```

Este fragmento de código fué adaptado de [WebGL shader to color the texture according to mouse position](https://stackoverflow.com/questions/45270803/webgl-shader-to-color-the-texture-according-to-mouse-position).

{{< /details >}}

</div>

</blockquote>

## Conclusión

<blockquote>

<div style='text-align: justify;'>
Existen numerosas herramientas para el procesamiento de imágenes. Entre estas algunas de las más conocidas incluyen las máscaras de convolución, que tiene funciones como mejorar la nitidez o detectar los bordes de una imagen. Herramientas de magnificación y región de interés que nos permine ver una sección de la imagen aumentada o aplicar la máscara solo en una parte de la imagen. Herramientas de brillo como la opción de _value_ basada en el modelo HSV que da la imagen más luminosidad en partes donde los colores son más claros/ brillantes o la opción de `luma` que da un mejor balance sobre el brillo de una imagen. Todas estas herramientas nos permiten tener imágenes más vistosas, nítidas, que nos permiten ver detalles que tal vez no se pueden ver en la imagen original. Estas son de gran utilidad en distintos campos como el de la medicina donde las imágenes que se obtienen no son tan claras como las imágenes que se toman con una cámara.
</div>

### Trabajo Futuro

<div style='text-align: justify;'>
Actualmente, existen muchas más herramientas para el procesamiento de imágen. Aunque se implementaron algunas de las máscaras más conocidas, existe una gran variedad de máscaras de convolución que permiten crear otros efectos que realzan otras características del color en una imagen, por lo cual sería bueno más adelante implementar más opciones de máscara, con matrices de tamaños mayores, y dar la posibilidad al usuario de definir sus propias máscaras. Por otro lado, en cuanto a las herramientas de detalla, sería bueno implementar otros tipos de lupa, además de dar opciones de escoger la forma del ROI, tal vez que el usuario pueda trazar manualmente la zona que desea modificar. Además, dentro de las herramientas de luminosidad existen otros modos que se pueden estudiar, además que la implementación que se realizó da una imagen en escala de grises, por lo que sería bueno investigar un poco más sobre cómo se pueden obtener un resultado para generar imágenes a color de forma que la luminosidad sea más evidente respecto a la imagen original.
</br>
<p align = "center"><img src = "/showcase/img/trabajofuturo.png" alt="" width="400px"><br>Fig.6 - más herramientas de procesamiento de imágenes</p>
</div>

</blockquote>

## Referencias

1. Wikipedia contributors. "Digital image processing". Tomado de https://en.wikipedia.org/wiki/Digital_image_processing
2. Poweel, Victor. "Image Kernels". Tomado de https://setosa.io/ev/image-kernels/
3. Charalambos, Jean Pierre. "Procedural Texturing". Tomado de https://visualcomputing.github.io/docs/shaders/procedural_texturing/

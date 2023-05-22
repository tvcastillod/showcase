---
weight: 2
---

# Coloring y modos de fusión

## Introducción

<blockquote>
<div style="text-align: justify">
Los modos de fusión se utilizan para controlar cómo se mezclan dos colores entre sí. En la edición de imágenes digitales, estos modos se utilizan para componer imágenes o generar efectos que permiten oscurecer, aclarar o resaltar ciertos colores de una imagen. Un color en glsl se define como una variable vec4 de valores rgba float normalizados, es decir, cada uno está en el rango de [0.0, 1.0]. Con la ayuda de shaders, podemos modificar esta variable con base en ciertos parámetros. A continuación se realizará la implementación de algunos de los modos de fusión de colores con el uso de shaders.
</div>
</blockquote>

### Antecedentes y trabajo previo

<blockquote>

<div style="text-align: justify">
Los modos de fusión se originaron en la fotografía de cuarto oscuro y posteriormente se desarrollaron y mejoraron por programas de imagen digital como Adobe Photoshop. Los modos de fusión, que permiten combinar dos o más imágenes en una sola, fueron bien recibidos y se incorporaron rápidamente en otros programas de edición de imágenes [1]. Cuando se usan estos modos de fusión usualmente hay dos capas, una inferior que es la capa base, y una superior que es la capa de fusión. Cada uno de estos modos utiliza una operación matemática específica a los datos de color de cada píxel de la capa base y de fusión, lo cual resulta en una imagen compuesta. A continuación podemos ver algunos de los modos de fusión más conocidos

</div>
<p align = "center"><img src = "/showcase/img/blending_modes.png" alt="" width="450px"><br>Fig.1 - modos de fusión</p>

#### Trabajo previo

<div style="text-align: justify">
Actualmente, cualquier herramienta de edición de imágenes ofrece la opción de aplicar modos de fusión, sin embargo, a continuación mencionamos un trabajo que se enfoca solo en este tema y es un proyecto de código libre disponible en github:
<br>

- [Filter Blend](https://ilyashubin.github.io/FilterBlend/) es una herramienta que permite componer dos imágenes por medio de diferentes modos de fusión, además permite aplicar filtros y controlar el parámetro de transparencia.
</div>

</blockquote>

## Ejercicio

{{< hint info >}}
Replicar el código js de los programas en [coloring](https://visualcomputing.github.io/docs/shaders/coloring/). Implementar otros modos de mezcla, tomando como referencia inicial la función [blendMode()](https://p5js.org/es/reference/#/p5/blendMode) de p5js.
{{< /hint >}}

### Solución

<blockquote>

<div style="text-align: justify">

Recordemos que cada color es representado como un vector de 4 posiciones, donde las primeras 3 corresponden a los niveles de rojo, verde y azul de cada pixel, en el caso del modelo de color RGB, y la última representa el canal alfa que controla el nivel de transparencia. La idea general para implentar cualquier modo de fusión se basa en operar matemáticamente los valores de los pixeles de cada imagen, componente a componente. Uno de los modos más básicos es el <span style="color:yellow">BLEND</span>, que consiste en multiplicar los valores del primer color `A` por un `factor` (entre 0-1) y sumarlo a los valores del segundo color `B`.

<pre><code>C = A * factor + B
</code></pre>

Este modo es una simple interpolación lineal de colores, donde el factor controla el nivel del color `A` que se aplica a B. Cuando el factor es igual a 0, el resultado es únicamente el color `B`. Cuando el factor es igual a 1, este funciona como el modo <span style="color:yellow">ADDITION </span> que suma los valores `A` y `B`.

<pre><code>C = A + B
</code></pre>

Es importante recordar que el valor de los pixeles está condicionado a un rango de 0.0 a 1.0 por lo que si los valores establecidos están fuera de este rango, estos automáticamente se ajustan al valor más cercano, 0.0 si es un valor negativo o 1.0 si es positivo mayor que 1. Por esta razón, cuando la suma de ambos valores es mayor a 1, el resultado es un color blanco representado como (1.0, 1.0, 1.0). Este modo también es conocido como _plus lighter_ pues el resultado siempre produce un color más claro, ya que toma valores más altos. Una variante de este modo es el <span style="color:yellow">PLUS DARKER</span> que consiste en restar 1.0 al valor final, dando como resultado un valor más oscuro que si es menor a 0 muestra un color negro.

<pre><code>C = A + B - 1.0</code></pre>

Análogo al modo _addition_ se define el modo <span style="color:yellow">SUBSTRACT</span> como la resta de `A` y `B`.

<pre><code>C = A - B</code></pre>

Aquí, de forma opuesta al modo anterior, lo que sucede es que se dan valores negativos y por tanto, cuando la resta es menor a 0, el resultado da un color negro. Se tienen además los modos <span style="color:yellow">DARKEN ONLY</span> y su contraparte <span style="color:yellow">LIGHTEN ONLY</span> donde se toma el menor componente de cada pixel.

<pre><code>C = (min(A.r, B.r), min(A.g, B.g), min(A.b, B.b)) // darken only
C = (max(A.r, B.r), max(A.g, B.g), max(A.b, B.b)) // lighten only
</code></pre>

En este caso, al tomar el valores menor/mayor de cada componente, hace que el resultado sea más o menos oscuro/claro. También está el modo <span style="color:yellow">MULTIPLY</span> que consiste en multiplicar los dos valores

<pre><code>C = A * B</code></pre>

Si uno de los colores está dentro de la escala de grises, este modo genera un efecto de oscurecimiento sobre el otro color, donde un color cercano al negro hace que el otro color se vuelva más oscuro. Con el modo <span style="color:yellow">SCREEN</span> los valores de los pixeles de los dos colores se invierten, se multiplican y se vuelven a invertir, dando un resultado opuesto al del modo _multiplicar_, dando un efecto de aclarado.

<pre><code>C = 1 - (1 - A)(1 - B)</code></pre>

Algo que también se puede hacer es combinar dos modos distintos, como por ejemplo el _multiply_ y el _screen_. Dependiendo de la condición, la combinación de estos dos modos toma un nombre diferente, en este caso usaremos el llamado modo <span style="color:yellow">OVERLAY</span> que se define de la siguiente manera:

<pre><code>Si a < 0.5 entonces C = 2AB
sino C = 1 - 2(1 - A)(1 - B)</code></pre>

Aquí, se usa el modo _multiply_ para valores más oscuros y _screen_ para valores más claros, de modo que las zonas más oscuras en una imagen se vuelven más oscuras y las zonas más claras se vuelven más claras. La constante 2 cumple la función de compensar la mezcla de colores, haciendo que haya una transición más homogénea cuando se está cerca de la igualdad de la condición.

</div>

<blockquote>
<p style="text-align: justify">
A continuación, tenemos la implementación de los modos de fusión en colores. Se muestran dos modos al tiempo con el fin de observar las diferencias entre los resultados de cada modo.
</p>

{{<p5-iframe sketch="/showcase/sketches/coloring/blend_color_modes.js" width="625" height="425">}}

</blockquote>
{{< hint info >}}

<p style='text-align: justify;'>

</p>
{{< /hint >}}

<div style='text-align: justify;'>

</div>

</blockquote>

### Código

<blockquote>
{{< details title="Código completo de la implementación de los modos de fusión" open=false >}}

```javascript
let colorPicker1, colorPicker2;
let sliderMode1, sliderMode2;
let selectMode1, selectMode2;
let shaderMode1, shaderMode2;
let mode1 = 1;
let mode2 = 2;
let brightness1 = 1.0;
let brightness2 = 1.0;

function preload() {
  shaderMode1 = loadShader(
    "/showcase/sketches/coloring/shader.vert",
    "/showcase/sketches/coloring/shader.frag"
  );
  shaderMode2 = loadShader(
    "/showcase/sketches/coloring/shader.vert",
    "/showcase/sketches/coloring/shader.frag"
  );
}

function setup() {
  createCanvas(600, 400);

  colorPicker1 = createColorPicker("#F09A9A");
  colorPicker1.position(width / 2 - 140, height - 60);
  colorPicker2 = createColorPicker("#E2D98D");
  colorPicker2.position(width / 2 + 80, height - 60);

  selectMode1 = createSelect();
  selectMode1.position(15, height / 2 - 70);
  selectMode1.option("BLEND");
  selectMode1.option("DARKEST");
  selectMode1.option("LIGHTEST");
  selectMode1.option("ADDITION");
  selectMode1.option("PLUS DARKER");
  selectMode1.option("SUBSTRACT");
  selectMode1.option("MULTIPLY");
  selectMode1.option("SCREEN");
  selectMode1.option("OVERLAY");
  selectMode1.selected("LIGHTEST");
  selectMode1.changed(mySelectEvent);

  selectMode2 = createSelect();
  selectMode2.position(15, height / 2 + 50);
  selectMode2.option("BLEND");
  selectMode2.option("DARKEST");
  selectMode2.option("LIGHTEST");
  selectMode2.option("ADDITION");
  selectMode2.option("PLUS DARKER");
  selectMode2.option("SUBSTRACT");
  selectMode2.option("MULTIPLY");
  selectMode2.option("SCREEN");
  selectMode2.option("OVERLAY");
  selectMode2.selected("DARKEST");
  selectMode2.changed(mySelectEvent);

  sliderMode1 = createSlider(0, 255, 50);
  sliderMode1.position(width - 110, height / 2 - 70);
  sliderMode1.style("width", "80px");
  sliderMode2 = createSlider(0, 255, 200);
  sliderMode2.position(width - 110, height / 2 + 50);
  sliderMode2.style("width", "80px");

  colorMode1 = createGraphics(100, 120, WEBGL);
  colorMode1.shader(shaderMode1);
  colorMode2 = createGraphics(100, 120, WEBGL);
  colorMode2.shader(shaderMode2);
}

function draw() {
  background(220);
  c1 = colorPicker1.color();
  c2 = colorPicker2.color();

  shaderMode1.setUniform("uMaterial1", c1._array);
  shaderMode1.setUniform("uMaterial2", c2._array);
  shaderMode1.setUniform("blendMode", mode1);
  if (mode1 == 1 || mode1 == 2 || mode1 == 3) {
    brightness_1 = sliderMode1.value() / 255;
    sliderMode1.show();
  } else {
    brightness_1 = 1.0;
    sliderMode1.hide();
  }
  shaderMode1.setUniform("brightness", brightness_1);
  colorMode1.rect(0, 0, 100, 100);

  shaderMode2.setUniform("uMaterial1", c1._array);
  shaderMode2.setUniform("uMaterial2", c2._array);
  shaderMode2.setUniform("blendMode", mode2);
  if (mode2 == 1 || mode2 == 2 || mode2 == 3) {
    brightness2 = sliderMode2.value() / 255;
    sliderMode2.show();
  } else {
    brightness2 = 1.0;
    sliderMode2.hide();
  }
  shaderMode2.setUniform("brightness", brightness2);
  colorMode2.rect(0, 0, 100, 100);

  imageMode(CENTER);
  rectMode(CENTER);
  image(colorMode1, width / 2, height / 2 - 65);
  fill(colorPicker1.color());
  rect(width / 2 - 110, height / 2, 100, 250);
  noFill();
  rect(width / 2, height / 2 - 65, 100, 120);
  fill(colorPicker2.color());
  rect(width / 2 + 110, height / 2, 100, 250);

  colorMode2.rect(0, 0, 100, 100);
  image(colorMode2, width / 2, height / 2 + 65);
  noFill();
  rect(width / 2, height / 2 + 65, 100, 120);
}

function mySelectEvent() {
  if (selectMode1.value() == "BLEND") mode1 = 1;
  if (selectMode1.value() == "DARKEST") mode1 = 2;
  if (selectMode1.value() == "LIGHTEST") mode1 = 3;
  if (selectMode1.value() == "ADDITION") mode1 = 4;
  if (selectMode1.value() == "PLUS DARKER") mode1 = 5;
  if (selectMode1.value() == "SUBSTRACT") mode1 = 6;
  if (selectMode1.value() == "MULTIPLY") mode1 = 7;
  if (selectMode1.value() == "SCREEN") mode1 = 8;
  if (selectMode1.value() == "OVERLAY") mode1 = 9;
  if (selectMode2.value() == "BLEND") mode2 = 1;
  if (selectMode2.value() == "DARKEST") mode2 = 2;
  if (selectMode2.value() == "LIGHTEST") mode2 = 3;
  if (selectMode2.value() == "ADDITION") mode2 = 4;
  if (selectMode2.value() == "PLUS DARKER") mode2 = 5;
  if (selectMode2.value() == "SUBSTRACT") mode2 = 6;
  if (selectMode2.value() == "MULTIPLY") mode2 = 7;
  if (selectMode2.value() == "SCREEN") mode2 = 8;
  if (selectMode2.value() == "OVERLAY") mode2 = 9;
}
```

{{< /details >}}
</br>

{{< details title="vertex shader (genérico)" open=false >}}

```javascript
attribute vec3 aPosition;

void main() {
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

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform int blendMode;

void main() {
  vec4 material;
  if (blendMode == 1){
    // BLEND
    material = brightness * uMaterial1 + uMaterial2;
  } else if (blendMode == 2) {
    // DARKEST
    material = min(brightness * uMaterial1, uMaterial2);
  } else if (blendMode == 3){
    // LIGHTEST
    material = max(brightness * uMaterial1, uMaterial2);
  } else if (blendMode == 4) {
    // ADDITION
    material = uMaterial1 + uMaterial2;
  } else if (blendMode == 5) {
    // PLUS DARKER
    material = uMaterial1 + uMaterial2 - vec4(1.0);
  } else if (blendMode == 6){
    // SUBSTRACT
    material = uMaterial1 - uMaterial2;
  } else if (blendMode == 7){
    // MULTIPLY
    material = uMaterial1 * uMaterial2;
  } else if (blendMode == 8){
    // SCREEN
    material = vec4(1.0)-(vec4(1.0)-uMaterial1)*(vec4(1.0)-uMaterial2);
  } else if (blendMode == 9) {
    material = vec4(1.0);
    if (uMaterial1.r < 0.5) { material.r = 2.0 * uMaterial1.r * uMaterial1.r;
    } else { material.r = 1.0-2.0*(1.0-uMaterial1.r)*(1.0-uMaterial2.r);}
    if (uMaterial1.g < 0.5) { material.g = 2.0 * uMaterial1.g * uMaterial1.g;
    } else { material.g = 1.0-2.0*(1.0-uMaterial1.g)*(1.0-uMaterial2.g);}
    if (uMaterial1.b < 0.5) { material.b = 2.0 * uMaterial1.b * uMaterial1.b;
    } else { material.b = 1.0-2.0*(1.0-uMaterial1.b)*(1.0-uMaterial2.b);}
  } else {
    material = vec4(1.0);
  }
  gl_FragColor = vec4(material.rgb, 1.0);
}
```

{{< /details >}}

<br>

<div style='text-align: justify;'>

A continuación se muestra de forma más detallada las partes claves del código anterior.

```javascript
umb = random(rmin, rmax);
```

</div>

</blockquote>

## Conclusión

<blockquote>

<div style='text-align: justify;'>
</div>

### Trabajo Futuro

<div style='text-align: justify;'>
<p align = "center"><img src = "/showcase/img/blend-modes-add.png" alt="" width="400px"><br>Fig.3 - More blending modes with images</p>
</div>

</blockquote>

## Referencias

1. C. Ace. Blending Modes Explained. Tomado de https://www.videomaker.com/article/c03/18076-blending-modes-explained/
2. Wikipedia contributors. "Blend modes". Tomado de https://en.wikipedia.org/wiki/Blend_modes
3. Photoshop Tools & Techniques. "Blending Modes Explained – The Complete Guide to Photoshop Blend Modes". Tomado de https://photoshoptrainingchannel.com/blending-modes-explained/#overlay

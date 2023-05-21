---
weight: 2
---

# Coloring y modos de fusión

## Introducción

<blockquote>
<div style="text-align: justify">
Los modos de fusión se utilizan para controlar cómo se mezclan dos colores entre sí. En la edición de imágenes digitales, estos modos se utilizan para componer imágenes o generar efectos que permiten oscurecer, aclarar o resaltar ciertos colores de una imagen.<br>
Un color en glsl se define como una variable vec4 de valores rgba float normalizados, es decir, cada uno está en el rango de [0.0, 1.0]. Con la ayuda de shaders, podemos modificar esta variable con base en ciertos parámetros.<br>
A continuación se realizará la implementación de algunos de los modos de fusión de colores con el uso de shaders.
</div>
</blockquote>

### Antecedentes y trabajo previo

<blockquote>

<div style="text-align: justify">
Los modos de fusión se originaron en la fotografía de cuarto oscuro y posteriormente se desarrollaron y mejoraron por programas de imagen digital como Adobe Photoshop. Los modos de fusión, que permiten combinar dos o más imágenes en una sola, fueron bien recibidos y se incorporaron rápidamente en otros programas de edición de imágenes [1]. Cuando se usan estos modos de fusión usualmente hay dos capas, una inferior que es la capa base, y una superior que es la capa de fusión. Cada uno de estos modos utiliza una operación matemática específica a los datos de color de cada píxel de la capa base y de fusión, lo cual resulta en una imagen compuesta.

</div>

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

<br>

<p align = "center"><img src = "/showcase/img/example_img_hist.png" alt="" width="450px"><br>Fig.1 - </p>

<br>

<blockquote>
<p style="text-align: justify">

</p>

{{<p5-iframe sketch="/showcase/sketches/dithering/thresholding.js" width="625" height="525">}}

</blockquote>
{{< hint info >}}

<p style='text-align: justify;'>

</p>
{{< /hint >}}

<div style='text-align: justify;'>

<br>

<p align = "center"><img src = "/showcase/img/img_dit_aleat.png" alt="" width="500px"><br>Fig.3 - </p>

<br>

</div>

<blockquote>
<p style="text-align: justify">

</p>
{{<p5-iframe sketch="/showcase/sketches/dithering/random_dithering.js" width="625" height="425">}}
</blockquote>

</blockquote>

### Código

<blockquote>

{{< details title="Código completo la implementación del algoritmo de thresholding" open=false >}}

```javascript

```

{{< /details >}}
</br>
{{< details title="actualización de la imagen" open=true >}}
Con el fin de evitar

```javascript

```

{{< /details >}}

<div style='text-align: justify;'>

Para el algoritmo

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
<p align = "center"><img src = "/showcase/img/ditheringmontage.png" alt="" width="400px"><br>Fig.3 -</p>
</div>

</blockquote>

## Referencias

1. C. Ace. Blending Modes Explained. Tomado de https://www.videomaker.com/article/c03/18076-blending-modes-explained/
2. Wikipedia contributors. "Blend modes". Tomado de https://en.wikipedia.org/wiki/Blend_modes
3. Photoshop Tools & Techniques. "Blending Modes Explained – The Complete Guide to Photoshop Blend Modes". Tomado de https://photoshoptrainingchannel.com/blending-modes-explained/#overlay

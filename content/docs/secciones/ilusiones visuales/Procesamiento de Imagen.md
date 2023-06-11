---
weight: 2
---

# Procesamiento de Imágenes y máscaras

## Introducción

<div style="text-align: justify">

Cuando hablamos de procesamiento de imágenes, nos referimos a un conjunto de técnicas aplicadas a imágenes con el propósito de mejorar la calidad o facilitar la búsqueda de información. En [webgl](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) se utiliza la texturización en el procesamiento de imágenes. En este caso estamos interesados en explorar el uso de máscaras para modificar las imágenes con el fin de obtener resultados como una mayor nitidez en la imágen o detectar los bordes de los objetos que se encuentran dentro de esta.

</div>

### Antecedentes y trabajo previo

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

Para crear diferentes efectos en las imágenes, utilizaremos máscaras. Una máscara, kernel o matriz de convolución es una matriz la cual se opera con la información de los pixeles de la imagen con el fin de lograr diferentes efectos de enfoque, desenfoque, nitidez, detección de bordes, entre otros.

</div>

<p style="text-align: justify">

</p>

<br>

<p align = "center"><img src = "/showcase/img/example_img_hist.png" alt="" width="450px"><br>Fig.1 - </p>

<br>

<p style="text-align: justify">
<br>

<p align = "center"><img src = "/showcase/img/example_img_u.png" alt="" width="500px"><br>Fig.2 - </p>

<br>

<p style="text-align: justify">

</p>

<p align = "center"><img src = "/showcase/img/example2_img_hist_u.png" alt="" width="500px"><br>Fig.3 - </p>

<br>

<p style="text-align: justify">

</p>

<blockquote>
<p style="text-align: justify">

</p>

</blockquote>
{{< hint info >}}

<p style='text-align: justify;'>

</p>
{{< /hint >}}

<div style='text-align: justify;'>

<br>

<p align = "center"><img src = "/showcase/img/img_dit_aleat.png" alt="" width="500px"><br>Fig.3 - </p>

<br>

<p align = "center"><img src = "/showcase/img/img_dit_aleat2.png" alt="" width="400px"><br>Fig.3 -</p>

<br>

<p align = "center"><img src = "/showcase/img/img_dit_aleat3.png" alt="" width="500px"><br>Fig.3 - </p>

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

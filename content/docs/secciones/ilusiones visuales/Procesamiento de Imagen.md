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

{{<p5-iframe sketch="/showcase/sketches/image_processing/img_process.js" width="625" height="455" background="black">}}

</blockquote>

</div>

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

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

<p style="text-align: justify">A continuación, tenemos la implementación del algoritmo de thresholding. Se pueden cargar imágenes a color, las cuales van a ser transformadas a escalas de grises para posteriormente aplicar el algoritmo. Además, muestra el histograma con los valores de los pixeles y la cantidad que hay de cada uno. Se puede ajustar el valor de threshold en un rango de 0 a 250 con saltos de 25.</p>
{{< p5-iframe sketch="/showcase/sketches/dithering/thresholding.js" width="625" height="525">}}

{{< details title="Código fuente - implementación del algoritmo de thresholding" open=false >}}

```javascript

```

{{< /details >}}

## Referencias

1. Enevoldsen, Keith. "Kinegrams". From https://thinkzone.wlonk.com/Kinegram/Kinegram.htm
2. Bach, Michael. "Kinegram (“Scanimation”)" From https://michaelbach.de/ot/mot-scanimation/index.html
3. Sarcone, Gianni A. "Kinegrams, Art in Motion." From Sarcone’s Studio -- A Sarcone & Waeber Web Resource. http://giannisarcone.com/Kinegrams.html
4. Wikipedia contributors. "Barrier-grid animation and stereography". From https://en.wikipedia.org/wiki/Barrier-grid_animation_and_stereography

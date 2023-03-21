---
weight: 1
---

# Dithering y cuantización del color

<p style="text-align: justify">La cuantización del color reduce el número de colores utilizados en una imagen.</p>
<br>

## Thresholding

### Thresholding global e histogramas

<p style="text-align: justify"> Este método consiste en comparar cada valor de píxel con un umbral fijo y dependiendo de esto se le asigna un valor de pixel de 0 o 255, dando como resultado una imagen binaria, compuesta únicamente de pixeles blancos y negros. Aunque es uno de los algoritmos más sencillos, este suele provocar una pérdida de detalle y contorno significativa.</p>
<p style="text-align: justify"> La efectividad de este método se puede evidenciar mejor en imágenes donde la diferencia entre los pixeles de los objetos y del fondo es alta, es decir, imágenes donde los objetos se distinguen fácilmente del fondo. Veamos cómo con la ayuda de un histograma de pixeles podemos aproximar el valor óptimo de umbral para procesar una imagen. Se tiene el siguiente ejemplo:</p>
<p align = "center"><img src = "/showcase/img/example_img_hist.png" alt="" width="450px"><br>Fig.1 - imagen ejemplo con su respectivo histograma de pixeles</p>
<p style="text-align: justify"> Haciendo un análisis general del histograma, podemos notar que hay un pico en pixeles con un valor alrededor de 80, y podemos deducir que estos corresponde al fondo de la imagen, ya que es el color que predomina en la imagen. Con esta simple observación, podemos conjeturar que el valor óptimo de umbral está alrededor 100, pues es allí donde se marca la diferencia de valores en los pixeles. Veamos cómo se ve la imagen con diferentes valores de umbral, en particular en el rango de 100 a 150.
<p align = "center"><img src = "/showcase/img/example_img_u.png" alt="" width="500px"><br>Fig.1 - imagen ejemplo con su respectivo histograma de pixeles</p>

## Referencias

1. Enevoldsen, Keith. "Kinegrams". From https://thinkzone.wlonk.com/Kinegram/Kinegram.htm
2. Bach, Michael. "Kinegram (“Scanimation”)" From https://michaelbach.de/ot/mot-scanimation/index.html
3. Sarcone, Gianni A. "Kinegrams, Art in Motion." From Sarcone’s Studio -- A Sarcone & Waeber Web Resource. http://giannisarcone.com/Kinegrams.html
4. Wikipedia contributors. "Barrier-grid animation and stereography". From https://en.wikipedia.org/wiki/Barrier-grid_animation_and_stereography

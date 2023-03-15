---
weight: 1
---

# Pixelamos un video
## 1.Antecedentes
<blockquote>
<p style = 'text-align: justify;'>
La técnica de pixelar imágenes ha sido utilizada desde hace décadas en diversos campos, como la fotografía, el cine, los videojuegos y el arte digital. Consiste en reducir la resolución de una imagen al agrupar los píxeles en bloques más grandes, dando como resultado una imagen con un aspecto más "borroso".
<br>
En los últimos años, ha surgido un enfoque denominado "Spatial coherence" (coherencia espacial), que se enfoca en preservar la información visual de la imagen original, mientras se reduce la resolución. En lugar de simplemente promediar los colores de cada bloque de píxeles, como se hace en la técnica de "color averaging", la técnica de "spatial coherence" utiliza un solo color arbitrario para cada bloque, con el objetivo de mantener la coherencia visual en toda la imagen.
<br>
Esta técnica ha ganado popularidad en el ámbito del arte digital y la creación de gráficos por ordenador, ya que permite crear imágenes con un aspecto único y creativo, mientras se reduce la cantidad de información necesaria para representar la imagen. En esta página se tratará de comparar estas dos técnicas para una imagen o video
</p>
</blockquote>
<br>

## 2. Método

Para el desarrollo del ejercicio de hace uso de esta teoría ya descrita anteriormente de utiliza p5.js y se manejar imágenes y videos , para la técnica ColorAveraging se hace una media de los colores de cada bloque de píxeles determinado por un scrollbar y rápidamente se puede sacar el promedio de los nuevos bloques de pixeles para el siguiente fotograma del video. Para la técnica SpatialCoherence se utiliza un solo color arbitrario para cada bloque, con el objetivo de mantener la coherencia visual en toda la imagen.

## 3.Ejercicio
{{< hint info>}}
Implement a pixelator video application and perform a benchmark of the results (color avg vs spatial coherence). How would you assess the visual quality of the results?
{{< /hint >}}

## 4. Resultados
<blockquote>
<p style = 'text-align: justify;'>

### ColorAveraging

En primer lugar se tiene el video que se puede observar en la siguiente imagen,en el cual se puede variar la cantidad  de  bloques de pixeles con un scrollbar, y se puede observar que al aumentar el tamaño de los bloques de pixeles(disminuir la cantidad de bloques), la imagen se vuelve más borrosa, y al disminuir el tamaño de los bloques de pixeles(aumentar la cantidad de bloques), la imagen se vuelve más nítida.
este programa no consume tantos recursos por lo que corre bien con un video de alta calidad.

</blockquote>
</p>

{{<p5-iframe sketch="/showcase/sketches/spatial_coherence/Pixelator.js" width="640" height="360" >}}

### SpatialCoherence
<blockquote>
<p style = 'text-align: justify;'>
En segundo lugar para esta parte del ejercicio no se ha logrado el programa con un video ya que es muy pesado y se queda sin recursos fácilmente,por lo que se ha hecho con una imagen, en la cual se puede observar que al aumentar el tamaño de los bloques de pixeles(disminuir la cantidad de bloques), la imagen se vuelve más borrosa, y al disminuir el tamaño de los bloques de pixeles(aumentar la cantidad de bloques), la imagen se vuelve más nítida.
Para comparar los métodos se puede observar ambios programas con una imágen
</blockquote>
</p>

color averaging

{{<p5-iframe sketch="/showcase/sketches/spatial_coherence/pix_image.js" width="640" height="360" >}}

spatial coherence

{{< p5-iframe sketch="/showcase/sketches/spatial_coherence/spatial_coherence.js"
width="640" height="360" >}}

## 5. Fragmentos de código

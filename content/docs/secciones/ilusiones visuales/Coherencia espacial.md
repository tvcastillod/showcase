---
weight: 2
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
<blockquote>
<p style = 'text-align: justify;'>
Para el desarrollo del ejercicio de hace uso de esta teoría ya descrita anteriormente de utiliza p5.js y se manejar imágenes y videos , para la técnica ColorAveraging se hace una media de los colores de cada bloque de píxeles determinado por un scrollbar y rápidamente se puede sacar el promedio de los nuevos bloques de pixeles para el siguiente fotograma del video. Para la técnica SpatialCoherence se utiliza un solo color arbitrario para cada bloque, con el objetivo de mantener la coherencia visual en toda la imagen.
Como parte del ejercicio también se hizo uso de ChatGPT para ponerlo a prueba en qué tanto código podía generar, y se obtuvo que si bien no servían del todo los códigos generados si fue de ayuda para el desarrollo del resultado final del ejercicio. Se mostrarán fragmentos de código generador por la AI y cuáles de usaron y cuales no en la sección de fragmentos de código.


</blockquote>
</p>

## 3.Ejercicio
{{< hint info>}}
Implement a pixelator video application and perform a benchmark of the results (color avg vs spatial coherence). How would you assess the visual quality of the results?
{{< /hint >}}

## 4. Resultados

### Imágenes
<blockquote>
<p style = 'text-align: justify;'>
En primer lugar se tiene el video que se puede observar en la siguiente imagen,en el cual se puede variar la cantidad  de  bloques de pixeles con un scrollbar, y se puede observar que al aumentar el tamaño de los bloques de pixeles(disminuir la cantidad de bloques), la imagen se vuelve más borrosa, y al disminuir el tamaño de los bloques de pixeles(aumentar la cantidad de bloques), la imagen se vuelve más nítida.
este programa no consume tantos recursos por lo que corre bien con un video de alta calidad.
</p>
</blockquote>


color averaging

{{<p5-iframe sketch="/showcase/sketches/spatial_coherence/pix_image.js" width="640" height="360" >}}

spatial coherence

{{< p5-iframe sketch="/showcase/sketches/spatial_coherence/SC_image.js"
width="640" height="360" >}}


### Videos

color averaging

{{<p5-iframe sketch="/showcase/sketches/spatial_coherence/pix_video.js" width="640" height="360" >}}

spatial coherence

{{< p5-iframe sketch="/showcase/sketches/spatial_coherence/SC_video.js" width="640" height="360" >}}
### SpatialCoherence
<blockquote>
<p style = 'text-align: justify;'>
En segundo lugar para esta parte del ejercicio no se ha logrado el programa con un video ya que es muy pesado y se queda sin recursos fácilmente,por lo que se ha hecho con una imagen, en la cual se puede observar que al aumentar el tamaño de los bloques de pixeles(disminuir la cantidad de bloques), la imagen se vuelve más borrosa, y al disminuir el tamaño de los bloques de pixeles(aumentar la cantidad de bloques), la imagen se vuelve más nítida.
Para comparar los métodos se puede observar ambios programas con una imágen
</blockquote>
</p>

## 5. Fragmentos de código

Aquí un ejemplo de fragmento de código generado por ChatGPT que no se utilizó en el ejercicio:

{{< details title="Función obtener color más frecuente " open=false >}}
``` javascript

{{</details>}}
<p align="justify">
Como se puede notar la función tiene una comploejidad muy alta y casi no se podía ejectar nisiquiera con una imágen, adicional a esto el ejercicio de spatial coherence juega es con un color aleatorio del cuadro que representa y no con el más común por lo que ya con los cambios requeridos implementados quedó así:
</p>

{{< details title="Función spathialCoherence " open=false >}}
``` javascript

function pixelateSpatialCoherence(originalImg) {
  // crear una nueva imagen pixelada
  let pixelatedImg = createImage(originalImg.width, originalImg.height);
  
  // cargar la imagen original en la nueva imagen pixelada
  
  pixelatedImg.copy(originalImg, 0, 0, originalImg.width, originalImg.height, 0, 0, originalImg.width, originalImg.height);

  // loop para recorrer cada bloque en la imagen pixelada
  for (let x = 0; x < pixelatedImg.width; x += blockSize) {
    for (let y = 0; y < pixelatedImg.height; y += blockSize) {
      // obtener un color aleatorio dentro del bloque
      let randX = floor(random(x, x + blockSize));
      let randY = floor(random(y, y + blockSize));
      let blockColor = originalImg.get(randX, randY);

      // loop para recorrer cada pixel en el bloque
      for (let i = x; i < x + blockSize; i++) {
        for (let j = y; j < y + blockSize; j++) {
          // asignar el color aleatorio al pixel en la imagen pixelada
          pixelatedImg.set(i, j, blockColor);
        }
      }
    }
  }

```
{{</details>}}

## Conclusiones

<br>
<p align="justify">
1. Para el desarrollo del video se requirió poner un video de baja calidad y pocos fotogramas ya que si se subía el programa no corría, especialmente con spathial coherence ya  que el proceso de manera lineal cuesta mucho computacionalmente.
</p>
<br>
<p align="justify">
2. Como se puede observar en los ejercicios el Pixerl averaging es más rápido que el spatial coherence, pero el spatial coherence es más preciso y se puede observar que la imagen se ve más nítida que la del pixel averaging, por lo que se puede concluir que el spatial coherence es mejor que el pixel averaging. 
</p>
<br>
<p align="justify">
3. Para observar mejor la diferencia entre esos dos métodos se puede intentar palarelizar el proceso de spatial coherence, ya que el proceso es lineal es demasiado costoso computacionalmente, por lo que se puede intentar paralelizar el proceso para que sea más rápido y se pueda observar mejor la diferencia entre los dos métodos.
</p>
<br>
<p align="justify">
4. ChatGPT es una herramienta muy útil para generar código, pero no es tan útil para generar código de manera automática, ya que el código generado no es muy útil y no se puede ejecutar, por lo que se debe hacer un proceso de limpieza y de adaptación del código generado para que sea útil y se pueda ejecutar.
</p>

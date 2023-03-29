---
weight: 3
---

# Antecedentes
## La percepción del color
<blockquote>

<p style='text-align: justify;'>
La percepción del color humana es una de las más complejas de las que se tiene conocimiento. Es un proceso que se lleva a cabo en el cerebro, y que se basa en la estimación de la longitud de onda de la luz que llega a los ojos. 
</p>

<br>

<p style='text-align: justify;'>
La longitud de onda de la luz visible oscila entre 380 y 750 nanómetros (nm). Esta se divide en tres bandas: roja, verde y azul. La luz que se encuentra en el rango de 380 a 450 nm se considera azul, la luz que se encuentra en el rango de 450 a 570 nm se considera verde, y la luz que se encuentra en el rango de 570 a 750 nm se considera roja. 
</p>

<br>

<p style='text-align: justify;'>
En el ojo humano, la luz que llega a la retina se divide en tres tipos de células: conos y bastones. Los conos son responsables de la percepción del color, mientras que los bastones son responsables de la percepción de la luminosidad. Los conos se dividen en tres tipos: conos rojos, verdes y azules. Cada uno de estos conos es sensible a una longitud de onda específica.
</p>

<br>

![](/showcase/img/chart-luz.png)

<br>

<p style='text-align: justify;'>
La información que llega a los conos se combina en el cerebro para generar la percepción del color. La información que llega a los conos rojos se combina con la información que llega a los conos verdes para generar la percepción del color amarillo. La información que llega a los conos verdes se combina con la información que llega a los conos azules para generar la percepción del color cian. Y la información que llega a los conos azules se combina con la información que llega a los conos rojos para generar la percepción del color magenta.
</p>

<br>

![](/showcase/img/human_eye.jpg)

<br>

<h3> Daltonismo </h3>

<p style='text-align: justify;'>
El daltonismo es una condición que afecta a la percepción del color. Se caracteriza por la incapacidad de distinguir entre ciertos colores. En la mayoría de los casos, las personas con daltonismo no pueden distinguir entre el rojo y el verde. Se pueden distinguir los siguientes tipos de daltonismo:
</p>

<br>

<ul>
<li> <b> Protanopia </b>: dificultad para percibir el color rojo. </li>
<li> <b> Deuteranopia </b>: dificultad para percibir el color verde. </li>
<li> <b> Tritanopia </b>: dificultad para percibir el color azul. </li>
<li> <b> Achromatopsia </b>: incapacidad para percibir el color. </li>
</ul>

<br>

Además se tienen las versiones más leves de estos tipos de daltonismo, que son:

<br>

<ul>
<li> <b> Protanomalia </b>: dificultad leve para percibir el color rojo. </li>
<li> <b> Deuteranomalia </b>: dificultad leve para percibir el color verde. </li>
<li> <b> Tritanomalia </b>: dificultad leve para percibir el color azul. </li>
<li> <b> Achromatomalia </b>: dificultad leve para percibir el color. </li>
</ul>

<br>

![](/showcase/img/daltonismo_types.png)


</blockquote>

# Ejercicio realizado

{{< hint info >}}

<p style='text-align: justify;'>
Mediante el mapeo de colores, se puede simular el daltonismo. Para ello, se analizan los colores que se encuentran en la imagen, y se reemplazan por los colores que se encuentran en la paleta de colores del daltonismo.
</p>
{{< /hint >}}

## Método utilizado

<blockquote>

<h3> Mapeo de colores para simular daltonismo </h3>
<p style='text-align: justify;'>
En primer lugar, se sabe que, al igual que como se mencionó anteriormente, el color se puede dividir en tres bandas: roja, verde y azul. Este método es utilizado por los computadores para representar los colores, usando formatos como RGB, por lo cual, se facilita el análisis de los colores de la imagen.
</p>

<br>

<p style='text-align: justify;'>
Además, se han planteado las matrices de transformación de colores, que permiten transformar los colores al multiplicar el vector de colores por estas. Para poder modificar los colores de la imagen y simular el daltonismo, se utilizan matrices de transformación que ya se han plantado para cada tipo de daltonismo. Estas se pueden encontrar en la siguiente página: <a href="https://gist.github.com/Lokno/df7c3bfdc9ad32558bb7"> https://gist.github.com/Lokno/df7c3bfdc9ad32558bb7 </a>

</p>

<br>

<p style='text-align: justify;'>
Finalmente, se recorre la imagen pixel por pixel, y se obtiene el color de cada uno de estos. Luego, se transforma el color a la paleta de colores del daltonismo ejegido, y se reemplaza el color original por el nuevo color.
</p>

<h3> Evaluación de efectividad de filtros de color de Windows </h3>

<p style='text-align: justify;'>
<b>Microsoft Windows</b>, en todas sus versiones, es uno de los sistemas operativos más utilizados en el mundo. En este, se pueden encontrar <b>filtros de color</b> que permiten que las personas con distintos tipos de daltonismo puedan ver mejor las <b>diferencias entre los colores que les causan confusión</b>. Para evaluar la efectividad de estos filtros, se utilizaron imágenes de referencia, a estas se les aplicó el filtro de color de Windows 11 y luego se les realizó la simulación de daltonismo con el método planteado anteriormente a todos los pares de imágenes para poder ver las diferencias entre la percepción de los colores sin el filtro y con el filtro.
</p>

<p style='text-align: justify;'>
Además, se usaron herramientas de <b> Inteligencia Artificial </b> para apoyar distintas tareas relacionadas con la realización de este ejercicio. Estas fueron:
</p>

<ol>
<li> <b> <a href="https://chat.openai.com/chat"> ChatGPT</a></b>: para tener una base de la función principal de transformación de los píxeles y para consultas sobre los conceptos tratados. </li>
<li> <b> <a href="https://github.com/features/copilot"> Github Copilot</a></b>: para automatización de tareas repetitivas como ajuste de párrafos, títulos, imágenes y fuente de los textos.  </li>
<li> <b> <a href="https://stablediffusionweb.com/#demo"> Stable Diffusion</a></b>: para la generación de imágenes que cumplan ciertas características útiles para el experimento. </li>

</ol>


</blockquote>

## Resultados

### Mapeo de colores para simular daltonismo

Se implementó el ejercicio en el lenguaje de programación JavaScript, utilizando la librería p5.js. Se puede ver el resultado a continuación:

<br>

{{< p5-iframe sketch="/showcase/sketches/daltonism/sketch.js" width="850" height="650" >}}

<br>

{{< hint info >}}

<p style='text-align: justify;'>
En este, se tiene una imagen inicial de referencia con la que se pueden ver fácilmente las diferencias entre los tipos de daltonismo. También se cuenta con un desplegable que permite seleccionar el tipo de daltonismo que se desea simular y un botón que permite cargar una imagen distinta.
</p>

{{< /hint >}}

<br>

Las matrices utilizadas se pueden observar en el siguiente código:

{{< details title="Matrices de transformación de cada tipo de daltonismo" open=false >}}
```javascript
var colorMats = {
  'Normal': [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ],
  'Protanopia': [
    [0.567,0.433,0.000],
    [0.558,0.442,0.000],
    [0.000,0.242,0.758]
  ],
  'Protanomaly': [
    [0.817,0.183,0.000],
    [0.333,0.667,0.000],
    [0.000,0.125,0.875]
  ],
  'Deuteranopia': [
    [0.625,0.375,0.000],
    [0.700,0.300,0.000],
    [0.000,0.300,0.700]
  ],
  'Deuteranomaly': [
    [0.800,0.200,0.000],
    [0.258,0.742,0.000],
    [0.000,0.142,0.858]
  ],
  'Tritanopia': [
    [0.950,0.050,0.000],
    [0.000,0.433,0.567],
    [0.000,0.475,0.525]
  ],
  'Tritanomaly': [
    [0.967,0.033,0.000],
    [0.000,0.733,0.267],
    [0.000,0.183,0.817]
  ],
  'Achromatopsia': [
    [0.299,0.587,0.114],
    [0.299,0.587,0.114],
    [0.299,0.587,0.114]
  ],
  'Achromatomaly': [
    [0.618,0.320,0.062],
    [0.163,0.775,0.062],
    [0.163,0.320,0.516]
  ]
}

```
{{< /details >}}

<br>

El código para la transformación de los colores se puede observar a continuación:

{{< details title="Transformación de los colores" open=false >}}
```javascript

function draw() {
  ...
  matrix = colorMats[val];
  newImg = createImage(img.width, img.height);
  newImg.loadPixels();
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let newR = matrix[0][0]*r + matrix[0][1]*g + matrix[0][2]*b;
      let newG = matrix[1][0]*r + matrix[1][1]*g + matrix[1][2]*b;
      let newB = matrix[2][0]*r + matrix[2][1]*g + matrix[2][2]*b;
      newImg.pixels[index] = newR;
      newImg.pixels[index + 1] = newG;
      newImg.pixels[index + 2] = newB;
      newImg.pixels[index + 3] = img.pixels[index + 3];
    }
  };
}
```
{{< /details >}}

<br>

Con esto, se pudo simular el daltonismo en distintas imágenes, como se puede observar a continuación:

<br>

{{< details title="Comparativa de imágenes" open=false >}}
<br>

Paisaje original:

<br>

![](/showcase/img/protanopia-1.jpg)




<br>

Paisaje con daltonismo de tipo Protanopia:

<br>

![](/showcase/img/protanopia-2.jpg)

<br>

Paisaje con daltonismo de tipo Deuteranopia:

<br>

![](/showcase/img/deutoranopia-1.png)

<br>

Paisaje con daltonismo de tipo Tritanopia:

<br>

![](/showcase/img/tritanopia-1.png)

<br>

Paisaje con daltonismo de tipo Achromatopsia:

<br>

![](/showcase/img/achromatopsia-1.png)

<br>


<p align="justify">
Si vemos un caso más extremo, podemos observar que esto puede generar dificultades para la identificación de distintos elementos en la imagen, como se puede observar en el siguiente ejemplo:
</p>

<br>

imagen original:

<br>

![](/showcase/img/deutoranopia-1.jpg)

<br>

imagen con daltonismo de tipo Deuteranopia:

<br>

![](/showcase/img/deuteranopia-2.png)

<br>

{{< /details >}}

### Filtros de color de Windows aplicados a las imágenes

Estos fueron los resultados de pasar las imágenes confusas por los filtros de color de Windows y luego por el simulador de daltonismo:

<br>

{{< details title="Filtros de color de Windows" open=false >}}
<br>

Deuteranopia:

<br>

Imagen original:

<br>

![](/showcase/img/deut_win.png)

<br>

Imagen con daltonismo de tipo Deuteranopia:

<br>

![](/showcase/img/deut_win_2.jpg)

<br>

Imagen con daltonismo de tipo Deuteranopia y filtro de color de Windows:

<br>

![](/showcase/img/deut_win_3.jpg)

<br>

Tritanopia:

<br>

Imagen original:

<br>

![](/showcase/img/trit_win.jpg)

<br>

Imagen con daltonismo de tipo Tritanopia:

<br>

![](/showcase/img/trit_win_2.jpg)

<br>

Imagen con daltonismo de tipo Tritanopia y filtro de color de Windows:

<br>

![](/showcase/img/trit_win_3.jpg)

<br>

Protanopia:

<br>

Imagen original:

<br>

![](/showcase/img/prot_win.jpg)

<br>

Imagen con daltonismo de tipo Protanopia:

<br>

![](/showcase/img/prot_win_2.jpg)

<br>

Imagen con daltonismo de tipo Protanopia y filtro de color de Windows:

<br>

![](/showcase/img/prot_win_3.jpg)

<br>

<p align="justify">
Como se puede observar, los filtros de color de Windows en cierta medida ayudan a mejorar la visibilidad de las imágenes confusas, pero no son una solución definitiva para el problema, ya que no logran eliminar por completo la confusión en algunos casos.

{{< /details >}}


## Conclusiones y trabajo futuro

<blockquote>

<p align="justify">
Mediante este simple ejercicio de simulación se pudieron evidenciar las dificultades que pueden tener las personas con distintos tipos de daltonismo en su día a día. Esto se debe a que, al no poder distinguir ciertos colores, pueden tener dificultades para identificar objetos, personas, etc. Esto puede generar problemas en la vida cotidiana, como por ejemplo, en la conducción de vehículos, en la lectura de señales de tránsito, en la lectura de libros, etc. Por lo que este tipo de ejercicios nos ayudan a comprender mejor la problemática que enfrentan las personas con daltonismo y a generar soluciones que puedan ayudar a mejorar su calidad de vida.
</p>
<br>

<p align="justify">
Además, aunque esta herramienta permite la identificación del problema, no es una solución definitiva, ya que, el siquiente paso sería generar una herramienta que permita la transformación de las imágenes de manera automática, para que las personas con daltonismo puedan visualizarlas sin dificultades.
</p>

<br>

<p align="justify">
También se pudo evidenciar que, aunque los filtros de color de Windows ayudan a mejorar la visibilidad de las imágenes confusas, ampliando el contraste entre colores que pueden resultar conflictivos, no son una solución definitiva para el problema. Se requiere de herramientas más sofisticadas o más directas, como por ejemplo, las gafas de colores que se utilizan para la corrección de daltonismo, además de una mayor conciencia de los diseñadores y desarrolladores de interfaces de usuario para que tomen en cuenta a las personas con daltonismo a la hora de diseñar sus interfaces.
</p>

<br>

<p align="justify">
Finalmente, la Inteligencia Artificial puede ser una herramienta muy útil a la hora de realizar tareas repetitivas en la redacción de documentos, ajuste de los elementos de la página, generación de código para resolver problemas de programación básicos, generación de imágenes que cumplan con los requisitos que se requieran en el experimento y mucho más. Por lo que representa una gran ayuda en la realización de trabajos como este.
</p>
</blockquote>

## Referencias

1. https://es.wikipedia.org/wiki/Daltonismo
2. https://visualcomputing.github.io/docs/visual_illusions/coloring/
3. https://gist.github.com/Lokno/df7c3bfdc9ad32558bb7
4. https://www.es.colorlitelens.com/informacion-correccion-del-daltonismo.html#scientificbackground
5. https://chat.openai.com/chat
6. https://github.com/features/copilot
7. https://stablediffusionweb.com/#demo
   










---
weight: 4
---
# Antecedentes

## Percepción de la profundidad

<blockquote>
<p style='text-align: justify;'>
La percepción de profundidad es la habilidad de nuestro sistema visual para percibir la distancia relativa entre los objetos en un espacio tridimensional. Esta habilidad es importante para la percepción espacial y la navegación en el mundo real.
</p>
<br>

![](/showcase/img/vision-estereoscopica.jpeg)


<br>
<h3> Pistas monoculares </h3>
<p style='text-align: justify;'>
Las pistas monoculares son claves visuales que le permiten a nuestro sistema visual percibir la profundidad usando información de un solo ojo (a diferencia de las pistas binoculares, que facilitan la percepción de profundidad). Estas pistas incluyen el tamaño relativo de los objetos, la superposición de objetos, la textura, el gradiente de la perspectiva, entre otros. La combinación de estas pistas permite al sistema visual percibir la profundidad incluso cuando solo se tiene información de un solo ojo. En el contexto de la computación visual, las pistas monoculares se utilizan para crear ilusiones de profundidad en imágenes representadas en un espacio de dos dimensiones.
</p>
<br>

![](/showcase/img/depht-perception.png)


</blockquote>




# Ejercicio realizado

{{< hint info >}}
Utilizar la pistas monoculares para representar una escena tridimensional en un espacio de dos dimensiones.
{{< /hint >}}

## Método utilizado

<blockquote>
<p style='text-align: justify;'>
Para la realización de este ejercicio se representó una escena simple, que consta de una carretera, una acera y una serie de árboles ubicados a distintas distancias, la cual se puede desplazar tanto horizontal como verticalmente. Además, se pusieron líneas de referencia para poder visualizar la profundidad de la escena.
</p>

<br>

Con estos elementos se utilizaron distintas pistas monoculares, las cuales fueron:

<ol>
<li>
<p style='text-align: justify;'>
 <b>Tamaño relativo de los objetos</b>: Se estableció un tamaño relativo entre los objetos, de tal manera que el objeto más cercano se viera más grande y el más lejano más pequeño. Esto se logró con las líneas de referencia, las cuales se colocaron a diferentes distancias de la cámara, y con los árboles, los cuales se colocaron a diferentes distancias de la carretera.
</p>

</li>

<br>
<li>
<p style='text-align: justify;'>
 <b>Superposición de objetos</b>: Se colocaron los árboles de tal manera que se superpongan entre sí, de tal manera que el árbol más cercano se vea más grande que el más lejano.
</p>

</li>
<br>
<li>
<p style='text-align: justify;'>
 <b>Gradiente de la perspectiva</b>: Las líneas de la carretera, ya que son paralelas y se alejan de la cámara, tienden a converger en un punto en el horizonte.
</p>

</li>
<br>
<li>
<p style='text-align: justify;'>
 <b>Movimiento Paralaje</b>: Al moverse la cámara, los árboles se mueven a diferentes velocidades, de tal manera que los árboles más cercanos se mueven más rápido que los más lejanos.
</p>

</li>
<br>
</ol>
<p>

<p style='text-align: justify;'>
Además, se usaron herramientas de <b> Inteligencia Artificial </b> para apoyar distintas tareas relacionadas con la realización de este ejercicio. Estas fueron:
</p>

<ol>

<li> <b> <a href="https://chat.openai.com/chat"> ChatGPT</a></b>: para tener una base de la función principal de transformación de los píxeles y para consultas sobre los conceptos tratados. </li>

<li> <b> <a href="https://github.com/features/copilot"> Github Copilot</a></b>: para automatización de tareas repetitivas como ajuste de párrafos, títulos, imágenes y fuente de los textos.  </li>
<br>
</ol>

</blockquote>


## Resultados

Se implementó el ejercicio en el lenguaje de programación JavaScript, utilizando la librería p5.js. El resultado se puede ver a continuación:

<br>

{{< p5-iframe sketch="/showcase/sketches/monocular_cues/sketch.js" width="680" height="490" >}}

<br>

Para destacar, en el código se plantearon dos variables que permiten modificar el punto de vista de la escena:

```javascript
    let finalLine;
    let XDeviation;
```

<br>

<p style='text-align: justify;'>
Estas corresponden, respectivamente, al punto donde se dibuja el horizonte y la distancia horizontal entre la cámara y la carretera; y pueden ser modificadas en tiempo de ejecución por medio de sliders.
</p>

<br>

<p style='text-align: justify;'>
Además, las distintas funciones que dibujan los objetos de la escena, como la carretera, la acera y los árboles, realizan sus cálculos de posición y tamaño en función de estas variables, de tal manera que se pueda modificar el punto de vista de la escena: 
</p>

<br>

{{< details title="Función que dibuja cada árbol" open=false >}}

```javascript
    function drawTree(img, posX, posY, sizeX, sizeY) {
        let newImg = img.get();
        newImg.resize(sizeX, sizeY);
        image(newImg, posX, posY);
    }   
```
{{< /details >}}

<br>

{{< details title="Función que dibuja las líneas de referencia" open=false >}}

```javascript
function drawBackgroundLines(finalPos) {
  stroke("#326133");
  let posY = finalPos;
  let difference = height - finalPos;
  for (let i = 0; i <= 30; i++) {
    posY += ((difference / 30) * i) / 15;
    line(0, posY, width, posY);
  }
  return posY;
}
```
{{< /details >}}

<br>

{{< details title="Función que colorea el cielo" open=false >}}
```javascript
function drawSky(horizon) {
  noStroke();
  fill("#87ceeb");
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, horizon);
  vertex(0, horizon);
  endShape();
}
```
{{< /details >}}

<br>

{{< details title="Función que dibuja la carretera, la acera y los árboles" open=false >}}

```javascript
function drawVanishingRoad(posY) {
  stroke("black");
  fill("#5f5f5f");

  //Vía
  beginShape();
  vertex(width * (1 / 10) + XDeviation * 10, height);
  vertex(width / 2 - width / 150, posY);
  vertex(width / 2 + width / 150, posY);
  vertex(width * (9 / 10) + XDeviation * 10, height);
  endShape();

  //Andénes
  fill("#c4c4c4");
  beginShape();
  vertex(width * (1 / 10) + XDeviation * 10, height);
  vertex(width / 2 - width / 150, posY);
  vertex(0 + XDeviation * 10, height);
  endShape();

  beginShape();
  vertex(width * (9 / 10) + XDeviation * 10, height);
  vertex(width / 2 + width / 150, posY);
  vertex(width + XDeviation * 10, height);
  endShape();

  fill("white");
  //líneas del centro
  beginShape();
  vertex(width / 2 - 2 * (width * (1 / 40)) + XDeviation * 10, height);
  vertex(width / 2 - width / 1000, posY);
  vertex(width / 2 - width * (1 / 70) + XDeviation * 10, height);
  endShape();

  beginShape();
  vertex(width / 2 + 2 * (width * (1 / 40)) + XDeviation * 10, height);
  vertex(width / 2 + width / 1000, posY);
  vertex(width / 2 + width * (1 / 70) + XDeviation * 10, height);
  endShape();

  //árboles
  if (treemode) {
    drawTree(img, width / 2.7 + XDeviation * 1.85, height - posY, 50, 50);
    drawTree(
      img,
      width / 2.7 + XDeviation * 1.85 + width * (4.15 / 24),
      height - posY,
      50,
      50
    );
    drawTree(img, width / 4 + XDeviation * 3.9, height - posY / 1, 100, 100);
    drawTree(
      img,
      width / 4 + XDeviation * 3.9 + width * (4.15 / 12),
      height - posY / 1,
      100,
      100
    );
    drawTree(img, XDeviation * 7.8, height - posY / 1, 200, 200);
    drawTree(
      img,
      XDeviation * 7.8 + width * (4.15 / 6),
      height - posY / 1,
      200,
      200
    );
  }
}
```
{{< /details >}}

<br>

## Conclusiones y trabajo futuro

<blockquote>

<p align="justify">
El ejercicio permitió comprender la forma en que el cerebro humano interpreta la información visual cuando no se tiene disponible todo el mecanismo de procesamiento binocular, y cómo esta información es procesada para generar una percepción de profundidad. Además, se pudo apreciar la importancia de las distintas pistas monoculares expuestas y la cercanía de la percepción visual con la realidad física.
</p>

<br>

<p align="justify">
Además, también se hace evidente las facilidades y ventajas de la computación visual para implementar y experimentar con diferentes escenarios de este tipo y así poder comprender mejor estos fenómenos y pensar en sus posibles aplicaciones en los distintos campos de la computación, como lo pueden ser la robótica, la inteligencia artificial o la realidad virtual.
</p>

<br>

<p align="justify">
Finalmente, la Inteligencia Artificial puede ser una herramienta muy útil a la hora de realizar tareas repetitivas en la redacción de documentos, ajuste de los elementos de la página, generación de código para resolver problemas de programación básicos y mucho más. Por lo que representa una gran ayuda en la realización de trabajos como este.
</p>
</blockquote>

## Referencias

1. https://visualcomputing.github.io/docs/visual_illusions/depth_perception/
2. https://es.wikipedia.org/wiki/Percepci%C3%B3n_de_profundidad
3. https://chat.openai.com/chat
4. https://github.com/features/copilot

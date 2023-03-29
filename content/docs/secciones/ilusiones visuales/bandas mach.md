---
weight: 5
---

# Bandas Mach
## 1.Antecedentes
<blockquote>
<p style = 'text-align: justify;'>
La técnica de Mach Band es un efecto óptico que se produce por la manera en que nuestro cerebro percibe diferentes tonalidades de color y luminosidad en los bordes de una .  Fue descrita por primera vez por el fisiólogo Ernst Mach en 1865 y ha sido estudiada desde entonces por diversos investigadores en el campo de la percepción visual. El efecto consiste en la aparición de una banda oscura o clara a lo largo del borde entre dos áreas de diferentes niveles de luminosidad o color, lo que produce una apariencia de mayor contraste en la zona del borde.
</p>
<br>

<img src="/showcase/img/bandamach.png" alt="Imagen" style="max-width: 70%;">

<br>
<p style = 'text-align: justify;'>
Esta técnica tiene implicaciones importantes en diversas áreas, como la psicología y la neurociencia, ya que permite estudiar cómo funciona la percepción visual en el cerebro humano y cómo ésta influye en nuestra percepción del mundo. Además, se ha utilizado en la industria gráfica y de la imagen para mejorar la calidad de las imágenes, reducir el efecto de posterización y mejorar la percepción del contraste.
</p>

<p style = 'text-align: justify;'>
En cuanto a la observación, podemos notar la presencia de este efecto en nuestra percepción visual cotidiana, en imágenes impresas, en televisores y en monitores de computadora, entre otros medios. La comprensión de esta técnica nos permite entender mejor cómo percibimos la realidad visualmente y cómo se pueden manipular las imágenes para mejorar su calidad y apariencia.
</p>
</blockquote>

## 2. Método
<blockquote>
<p style = 'text-align: justify;'>
Para la realización de este ejercicio se utilizó el lenguaje de programación javascript , el cual permite la creación de gráficos y animaciones interactivas en 2D y 3D. Para la creación de la ilusión se utilizó la librería p5.js, con un decorador WEBGL que permite la creación de gráficos en 3D y se usó la técnica de Perlin noise para la generación de terrenos. <br>
El ruido Perlin es una función matemática que utiliza la interpolación entre varios gradientes de vectores para generar una función de ruido. Esta función se utiliza para generar texturas, efectos de movimiento, terrenos, etc. 
</p>
</blockquote>

## 3.Ejercicio

{{< hint info>}}
Exercise
Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding trainl [ tutorial](https://www.youtube.com/watch?v=IKB1hWWedMk&embeds_euri=https%3A%2F%2Fvisualcomputing.github.io%2F&feature=emb_logo) .
{{< /hint >}}

## 4. Resultados
<blockquote>
<p style = 'text-align: justify;'>
El programa crea una malla de puntos que se ajustan a los valores generados por la función de ruido Perlin. Además permite al usuario controlarla apariencia del terreno incluyendo  el tamaño de los cuadrados de la malla, la velocidad de cambio del ruido Perlin y la capacidad de dibujar bandas de color para mejorar la percepción del relieve. También hay opciones para activar y desactivar el dibujo de líneas de contorno.
El cuadro "Band" permite mostrar o no las delimitaciones de los cuadros entonces si está seleccionado se dibujan los triángulos con diferentes colores en cada vértice y si no lo está se dibujan tiras con un solo tono de color para cada fila de puntos en el terreno.
El cuadro "stroke" permite mostrar o no las líneas de contorno del terreno.
Los slider son el primero para controlar la escala del terreno al cambiarlo se cambia el tamaño de los cuadros que conforman el terreno, a mayor tamaño menor será el detalle. Y el segundo slider controla la velocidad a la que el terreno cambia, la velocidad del ruido Perlin se mueve en el eje Y.
</blockquote>

{{<p5-iframe sketch="/showcase/sketches/Mach_band/Mach.js" width="620" height="630" >}}


## 5. Fragmentos de código
<blockquote>
<p style = 'text-align: justify;'>
Se hizo uso de dos funciones por separado para la habilitación o no de los checkbox del ejercicio, la primera función es la siguiente:
</p>
</blockquote>

{{< details title="Función bands " open=false >}}
``` javascript
function verify_band(){
    let s = scl.value();
  if (band.checked()) {
    fill(200, 200, 200, 50);
    for (let y = 0; y < rows - 1; y++) {
      beginShape(TRIANGLES);
      for (let x = 0; x < cols - 2; x++) {
        fill((color[x][y] + color[x][y + 1] + color[x + 1][y]) / 3);
        vertex(x * s      , y * s      , terrain[x][y]);
        vertex(x * s      , (y + 1) * s, terrain[x][y + 1]);
        vertex((x + 1) * s, y * s      , terrain[x + 1][y]);
        fill((color[x + 1][y + 1] + color[x + 2][y] + color[x + 2][y + 1]) / 3);
        vertex((x + 1) * s, (y + 1) * s, terrain[x + 1][y + 1]);
        vertex((x + 2) * s, y * s      , terrain[x + 2][y]);
        vertex((x + 2) * s, (y + 1) * s, terrain[x + 2][y + 1]);
      }
      endShape();
    }
  }
  else {
    for (let y = 0; y < rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        fill(color[x][y]);
        vertex(x * s, y * s, terrain[x][y]);
        fill(color[x][y+1]);
        vertex(x * s, (y + 1) * s, terrain[x][y + 1]);
      }
      endShape();
    }
  }
}

```
{{</details>}}

<blockquote>
<p style = 'text-align: justify;'>
La segunda función es la siguiente:
</p>
</blockquote>

{{< details title="Función stroke" open=false >}}
``` javascript
function verify_stroke(){
    if (!strk.checked()) {
    noStroke();
  } else {
    stroke(0, 255, 0);
  }
}
    
    ```
    {{</details>}}

## 6. Conclusiones
<blockquote>
<p style = 'text-align: justify;'>
1.En este ejercicio se pudo observar como se puede generar un terreno con la técnica de ruido Perlin, además se pudo observar como se puede manipular la apariencia del terreno con la ayuda de los checkbox y los slider.
</p>

<p style = 'text-align: justify;'>
2.El ruido de Perlin permite crear patrones naturales que simulan la superficie de la tierra lo que lo hace una técnica muy útil en el diseño de paisajes y entornos virtuales. además unido a la técnica de Mach band que crea los efectos gradientes de color da mejor sensación de profundidad y textura para el terreno
</p>

<p style = 'text-align: justify;'>
3.Con el ejercicio realizado también se demuestra una gran versatilidad que tiene la biblioteca de p5.js ya que permite la creación de gráficos en 2D y 3D, en la web. Además el hecho de estar basada en javascript permite que sea accesible para una amplia gama de desarrolladores.
</p>
</blockquote>

## 7. Bibliografía

<blockquote>

1. [https://p5js.org/reference/](https://p5js.org/reference/)
<br>

2. [VisualComputing](https://visualcomputing.github.io/docs/visual_illusions/mach_bands/)
<br>
3. [Video](https://www.youtube.com/watch?v=IKB1hWWedMk&embeds_euri=https%3A%2F%2Fvisualcomputing.github.io%2F&feature=emb_logo)

</blockquote>
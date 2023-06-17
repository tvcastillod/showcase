---
weight: 5
---

# Introducción
En este ejercicio se ha realizado un ejemplo de postprocesado de una imagen. Aplicando distintos tipos de shaders a una misma imagen para ver los resultados que se obtienen y, además, examinar la relación entre dichos shaders y el orden en el que se aplican.

# Antecedentes

<blockquote>

## Postprocesado


<p style='text-align: justify;'>
Los postefectos (o postprocesado) se refieren a las técnicas utilizadas después de la renderización de una imagen o un cuadro en una escena en tiempo real. Estas técnicas se aplican para mejorar la apariencia visual, ajustar los colores, simular efectos visuales o lograr estilos específicos.
</p>

<p style='text-align: justify;'>
Los postefectos se aplican generalmente a una imagen ya renderizada, en lugar de afectar directamente los objetos o materiales en la escena. Se utilizan para simular efectos de cámara, como desenfoque de movimiento, profundidad de campo, efecto de viñeta, aberración cromática o distorsión de lente. También se pueden aplicar para agregar efectos visuales, como efectos de partículas, destellos, efectos de luz o sombras, o incluso para simular estilos artísticos, como efectos de pintura o viñetas.
</p>

## Shaders
<p style='text-align: justify;'>
Los shaders hacen referencia a programas que se ejecutan en la GPU. Estos programas se encargan de realizar los cálculos necesarios para generar los gráficos que se muestran en pantalla de una manera más rápida y eficiente. Los shaders se escriben en un lenguaje de programación llamado GLSL (OpenGL Shading Language).
</p>

## Cuantificación de colores
<p style='text-align: justify;'>
La cuantización de colores es el proceso de reducir el número de colores distintos en una imagen. Esto se realiza para reducir el tamaño de la imagen y, por lo tanto, permitir que se almacene más imágenes en un disco o memoria. También se puede utilizar para reducir el número de colores en una imagen para que coincida con un dispositivo de visualización, como una impresora o un monitor, o para reducir el número de colores en una imagen para que coincida con el número de colores disponibles en un dispositivo de salida, como una impresora o un monitor.
</p>

<p style='text-align: justify;'>
Por lo general, estos son utilizados en la televisión el cine para reducir el tamaño de la imagen y, por lo tanto, permitir que se almacenen más imágenes en un disco o memoria, dándole más prioridad a la calidad de las áreas más importantes de la imagen y dejando las áreas menos importantes con una menor calidad. Esta provoca la aparición de artefactos en la imagen, como <b> bandas de color </b>, que son visibles en las áreas de la imagen con menos colores.
</p>

<br>

<img src="/showcase/img/catband1.png" height="50%" width="50%">
<img src="/showcase/img/catband2.png" height="50%" width="50%">

</blockquote>


# Ejercicio Realizado

<blockquote>

{{< hint info >}}

<p style='text-align: justify;'>
Implemente algunos efectos de postprocesado que encuentre interesantes.
</p>

{{< /hint >}}

## Método utilizado

<p style='text-align: justify;'>
Para la realización de este ejercicio se implementaron 3 shaders distintos, los cuales se aplicaron a una misma imagen. Los shaders implementados fueron los siguientes:
</p>

### 1. Cuantización de colores
<p style='text-align: justify;'>
Este shader se encarga de reducir el número de colores de la imagen. Para esto, en el fragment shader, se obtiene el color de cada pixel y se elige desde el lado del usuario un valor de cuantización. Este valor se utiliza para calcular el nuevo color de cada pixel, el cual se obtiene con la operación <b>floor</b> de la multiplicación del color original por el valor de cuantización y luego dividiendo el resultado por el valor de cuantización.
</p>

### 2. Efecto de deformación
<p style='text-align: justify;'>
Este se encarga de, a partir de una función para generar una curvatura, deformar la imagen de acuerdo con esta, utilizando una cierta área de la imagen elegida para aplicar el efecto del shader.
</p>

### 3. Efecto de brillantez
<p style='text-align: justify;'>
Este consiste en tomar el color de cada pixel y, a partir de este, calcular un nuevo color que se obtiene de la suma del color original y un valor de brillantez calculado a partir de la posición del pixel en la imagen con respecto a la posición del mouse.
</p>

<p style='text-align: justify;'>
También se analizará la relación entre el orden en el que se aplican los shaders, ya que los píxeles generados por un shader son los que se utilizan como entrada para el siguiente shader, por lo que el orden en el que se aplican los shaders puede afectar el resultado final.
</p>

<p style='text-align: justify;'>
Como herramientas de apoyo para la realización de este ejercicio se adaptó el código fuente de un shader de distorsión de imagen, el cual se puede encontrar en el siguiente enlace: <a href="https://www.shadertoy.com/view/wsfBz8">https://www.shadertoy.com/view/wsfBz8</a>
</p>

<p style='text-align: justify;'>
También se utilizó la inteligencia artificial Github Copilot, la cual se encargó de sugerir código para la implementación de los shaders y la automatización de código repetitivo.
</p>

</blockquote>


# Resultados

<blockquote>

<p style='text-align: justify;'>
Para este ejercicio se aplican a una imagen, de manera simultánea, dos filtros. El filtro de cuantización de colores siempre se está aplicando, mientras que los filtros de deformación y brillantez no se aplican simultáneamente, sino que se elige uno de los dos para aplicar a la imagen. Para el filtro de cuantización se cuenta con un slider en la parte superior izquierda de la pantalla para elegir el valor de cuantización, mientras que para los filtros de deformación y brillantez se cuenta con un slider en la parte superior derecha de la pantalla para elegir el radio del área de la imagen en la que se aplicará el efecto del filtro y un botón para elegir el filtro que se aplicará a la imagen. En caso de seleccionar el filtro de deformación, se cuenta con un slider en la parte inferior de la pantalla para elegir el valor de la curvatura.
</p>

Estos son los dos posibles órdenes en los que se aplican los filtros:


## Cuantización de colores seguido de efecto de brillantez o distorsión

<p style='text-align: justify;'>
En este caso, el filtro de cuantización de colores se aplica primero, seguido del filtro de brillantez o distorsión, dependiendo de cuál de los dos se elija. En este caso, el filtro de cuantización de colores se aplica a la imagen completa, mientras que el filtro de brillantez o distorsión se aplica a una cierta área de la imagen, la cual se depende de la posición del mouse:
</p>
<br>
{{< p5-iframe sketch="/showcase/sketches/postEffects/sketch.js" width="725" height="525" >}}

<br>

<p style='text-align: justify;'>
En este caso, como el filtro de cuantización de colores se aplica primero, el filtro de brillantez o distorsión se aplica a la imagen resultante de aplicar el filtro de cuantización de colores. Esto da como resultado que, en el caso del filtro de brillantez, no se evidencien bandas de color en el degradado de dicho filtro a medida que se aleja un pixel de la posición del mouse, ya que, aunque se redujo la cantidad de colores en el primer filtro, en el segundo se vuelven a aumentar al realizar el cálculo del efecto degradado.
</p>

<br>

En este caso, la función `draw()` del sketch se ve de la siguiente manera:

<br>

{{< details title="Aplicación del orden de los shaders" >}}
```javascript
function draw() {
  if (img) {
    // 1. Apply quantization
    quant_pg.background(125);
    quant.setUniform("texture", img);
    quant.setUniform("uDivisor", quantization.value());
    quant_pg.emitResolution(quant);
    pg = quant_pg;
    pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
    // 2. Apply brightness or distortion
    if (currentShader === "woo") {
      scaleSlider.show(); 
      woo_pg.background(125);
      woo.setUniform("texture", pg);
      woo_pg.emitPointerPosition(woo, mouseX, mouseY, "iMouse");
      woo.setUniform("iChannel0", pg);
      woo_pg.emitResolution(woo, "iResolution");
      woo.setUniform("radio", distanceThresholdSlider.value());
      woo.setUniform("scale", scaleSlider.value());
      pg = woo_pg;
      pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
    } else {
      scaleSlider.hide(); 
      bright_pg.emitPointerPosition(bright, mouseX, mouseY, "iMouse");
      bright.setUniform("texture", pg);
      bright.setUniform("distanceThreshold", distanceThresholdSlider.value());
      pg = bright_pg;
      pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
    }

    image(pg, 0, 0);
  }
}

```
{{< /details >}}

<br>

Donde se evidencia el orden en que se aplican los shaders.

## Efecto de brillantez o distorsión seguido de cuantización de colores

<p style='text-align: justify;'>
En este caso, el filtro de brillantez o distorsión se aplica primero, seguido del filtro de cuantización de colores:
</p>

<br>

{{< p5-iframe sketch="/showcase/sketches/postEffects/sketch2.js" width="725" height="525" >}}

<br>

<p style='text-align: justify;'>
Se puede evidenciar que, como el filtro de brillantez se aplica primero, hay bandas de color en el degradado de dicho filtro a medida que se aleja un pixel de la posición del mouse, ya que primero se calcula el efecto degradado y luego se reduce la cantidad de colores en la imagen, lo que da como resultado que el degradado se vea afectado por la cuantización de colores. 
</p>

<br>

<p style='text-align: justify;'>
Además, esto se puede evidenciar aún más entre más se reduzca la cantidad de colores en la imagen, ya que, las áreas en las que anteriormente se veía un color más cercano a negro al reducir la cantidad de colores, se aumentó el brillo de sus píxeles antes de aplicar este filtro, haciendo que no se pierda totalmente la información del contenido de esta área, teniendo también un efecto parecido al de una linterna en la imagen:
</p>

<br>

<img src="/showcase/img/brightquant.png" >

<br>

Contrario a lo que pasa con el orden inicial:

<br>

<img src="/showcase/img/quantbright.png" >

<br>

El código de la función `draw()` para este orden fue:

<br>

{{< details title="Aplicación del orden de los shaders" >}}
```javascript
function draw() {
  if (img) {
    if (currentShader === "woo") {
      // 1. Apply brightness or deformation
      scaleSlider.show();
      woo_pg.background(125);
      woo.setUniform("texture", img);
      woo_pg.emitPointerPosition(woo, mouseX, mouseY, "iMouse");
      woo.setUniform("iChannel0", img);
      woo_pg.emitResolution(woo, "iResolution");
      woo.setUniform("radio", distanceThresholdSlider.value());
      woo.setUniform("scale", scaleSlider.value());
      pg = woo_pg;
      pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
    } else {
      scaleSlider.hide(); 
      bright_pg.emitPointerPosition(bright, mouseX, mouseY, "iMouse");
      bright.setUniform("texture", img);
      bright.setUniform("distanceThreshold", distanceThresholdSlider.value());
      pg = bright_pg;
      pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
    }
    // 2. Apply quantization
    quant_pg.background(125);
    quant.setUniform("texture", pg);
    quant.setUniform("uDivisor", quantization.value());
    quant_pg.emitResolution(quant);
    pg = quant_pg;
    pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);

    image(pg, 0, 0);
  }
}
  
  ```
  {{< /details >}}

<p style='text-align: justify;'>
Finalmente, también se identifica que, ya que este tiene que ver con la posición de los píxeles y no de su color, el orden resulta irrelevante en el caso del filtro de distorsión.
</p>

## Código fuente de los shaders

En primer lugar, se encuentra el código fuente del shader de cuantización de colores, para este se explicó su funcionamiento en una sección anterior:

<br>

{{< details title="Código fuente del shader de cuantización de colores" >}}
```glsl
precision mediump float;

uniform sampler2D texture;
uniform float uDivisor;

varying vec2 texcoords2;

void main() {
  vec4 color = texture2D(texture, texcoords2);
  color.rgb = floor(color.rgb * uDivisor) / uDivisor; //change color depth
  gl_FragColor = color;
}
```
{{< /details >}}

<br>

En segundo lugar, se encuentra el código fuente del shader de brillantez, el cual aumenta los valores de los píxeles de la imagen en un radio determinado alrededor de la posición del mouse, y disminuye los valores de los píxeles de la imagen en un radio mayor alrededor de la posición del mouse:

<br>

{{< details title="Código fuente del shader de brillantez" >}}
```glsl
precision mediump float;

uniform sampler2D texture;
uniform vec2 iMouse;
uniform float distanceThreshold;

varying vec2 texcoords2;

void main() {
    float pct = distance(gl_FragCoord.xy, iMouse);
    pct = 1.0 - pct / distanceThreshold;
    pct = clamp(pct, 0.0, 1.0);
    vec4 color = texture2D(texture, texcoords2);
    gl_FragColor = color + vec4(pct, pct, pct, 0.0);
}
```
{{< /details >}}

<br>

En tercer lugar, se encuentra el código fuente del shader de distorsión, el cual distorsiona la imagen en un radio determinado alrededor de la posición del mouse dado un factor de curvatura:

<br>

{{< details title="Código fuente del shader de distorsión" >}}
```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;

uniform float radio;

uniform float scale;

//function to calculate the curvature of the distortion
vec2 curvatureGenerator(vec2 toPow, float dis) {
    float x = dis / radio;
    return toPow * (1.0 - x) * exp(-2.0 * x * x);
}

void main() {
    vec2 uv = vec2(gl_FragCoord.x / iResolution.x, 1.0 - (gl_FragCoord.y / iResolution.y));//1 - y / height (porque la y esta invertida)

    vec4 fragColor = texture2D(iChannel0, uv);

    vec2 center = iMouse.xy;

    float dis = distance(gl_FragCoord.xy, center);

    vec2 disV = gl_FragCoord.xy - center;

    if (dis < radio) {

        //apply the curvature
        vec2 trueUV = (gl_FragCoord.xy - (curvatureGenerator(disV, dis) * scale)) / iResolution.xy;

        //invert the y axis
        trueUV.y = 1.0 - trueUV.y; 

        fragColor = texture2D(iChannel0, trueUV);
    }

    gl_FragColor = fragColor;
}
```
{{< /details >}}

<br>

Donde la función `curvatureGenerator()` es la que calcula la curvatura de la distorsión.

<br>

Este shader fue adaptado de [este](https://www.shadertoy.com/view/wsfBz8) shader de Shadertoy.

</blockquote>



# Conclusiones y trabajo futuro

<blockquote>

<p style='text-align: justify;'>
Mediante este ejercicio se logró entender la utilidad de la aplicación de múltiples shaders a una sola imagen para lograr efectos más complejos. También se descubrió la utilidad de los objetos `PGraphics` para poder aplicar múltiples shaders a una sola imagen y la eficiencia de estos métodos en comparación con el tratamiento de imágenes por software. También se entendió que, cuando se trabaja con distintos shaders, el orden en el que se aplican es importante, ya que el resultado final puede variar dependiendo de este, demostrando que estos, además de tener cierto valor independiente, pueden hacer emerger un comportamiento más complejo cuando se combinan, lo cual abre más posibilidades de creación de efectos visuales.
</p>

<p style='text-align: justify;'>
Como trabajo futuro, se tiene un universo de posibilidades, ya que existe una gran variedad de posibles efectos y shaders que se pueden aplicar para obtener resultados más complejos. Además, esta herramienta podría ayudar a la creación de proyectos más grandes como editor de imágenes o de video, o incluso de videojuegos, para los cuales se pueden aplicar distintos efectos visuales de manera interactiva.
</p>

<p style='text-align: justify;'>
Finalmente, la Inteligencia Artificial es una herramienta muy útil para la creación de efectos visuales, ya que puede agilizar el proceso de desarrollo y entender el lenguaje natural para aplicar en los shaders distintos ajustes o refactorizaciones que se requieran para lograr el efecto deseado.
</p>
</blockquote>

# Referencias

1. https://github.com/features/copilot
2. https://visualcomputing.github.io/docs/shaders/post_effects/
3. https://www.shadertoy.com/view/wsfBz8
4. https://www.neilmendoza.com/ofxpostprocessing/


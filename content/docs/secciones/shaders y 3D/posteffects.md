---
weight: 5
---

# Introducción
En este ejercicio se ha realizado un ejemplo de postprocesado de una imagen. Aplicando distintos tipos de shaders a una misma imagen para ver los resultados que se obtienen y, además, examinar la relación entre dichos shaders y el orden en el que se aplican.

# Antecedentes
## Postprocesado

<blockquote>

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


# Ejercicio Realizado

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



{{< p5-iframe sketch="/showcase/sketches/postEffects/sketch.js" width="850" height="650" >}}
# Resultados
# Conclusiones y trabajo futuro

</blockquote>
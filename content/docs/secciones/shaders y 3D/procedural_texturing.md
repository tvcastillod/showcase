---
weight: 6
---

# Procedural Texturing
## Introducción 
<blockquote>
<p style = 'text-align: justify;'>
La textura por procedimientos es una técnica de generación de texturas que utiliza algoritmos para crear texturas de forma automática. Esta técnica se puede emplear tanto para generar texturas realistas como no realistas, y permite simular superficies de materiales naturales o artificiales tanto en entornos 2D como 3D.
<br>
Al utilizar algoritmos, se pueden especificar parámetros y detalles para variar la textura generada, lo que brinda un alto grado de control y flexibilidad en el proceso creativo. Existen diferentes tipos de texturas por procedimientos, como el ruido fractal, el mapeo de colores y el mapeo de vectores, entre otros, cada uno con sus propias características y aplicaciones.
<br>
La textura por procedimientos encuentra aplicaciones en diversos campos, como los videojuegos, las animaciones, el diseño de entornos virtuales y las simulaciones. Su capacidad para generar texturas dinámicas y personalizadas en tiempo real resulta especialmente útil en estos contextos, ya que se adapta a las necesidades específicas de cada proyecto y permite lograr resultados visuales impresionantes.
</p>
</blockquote>
<br>

 
## Antecedentes
<blockquote>
<p style = 'text-align: justify;'>
Sus antecedentes se sitúan en el campo de los gráficos por computadora y generación de imágenes sintéticas.Se ha desarrollado por varias décadas  lo que ha generado diferentes técnicas y algoritmos
<br>
Uno de los antecedentes más importantes es el ruido fractal, introducido por primera vez por Ken Perlin en 1983. Perlin creó un algoritmo llamado "ruido de Perlin" que permitía generar patrones y texturas similares a los que se encuentran en la naturaleza, como las texturas de terrenos montañosos.
<br>
Otro antecedente relevante es el mapeo de colores (o color mapping), que se utiliza para asignar colores a una textura en función de ciertas reglas o criterios. Este enfoque ha sido utilizado en diversas aplicaciones, como la generación de texturas para simulaciones científicas o la creación de efectos visuales en películas.(Esto ya ha sido trabajado en la la sección de ilusiones visuales).
<br>
Además, se han desarrollado otros algoritmos y técnicas para generar texturas por procedimientos, como el mapeo de vectores, el uso de funciones matemáticas como el valor absoluto o el seno y el coseno, entre otros. Estos avances han permitido simular una amplia variedad de materiales y superficies, y han encontrado aplicaciones en campos como la animación, los videojuegos y la realidad virtual.
</p>
</blockquote>
<br>

## Ejercicio 
{{< hint info >}}

<p style='text-align: justify;'>
Adaptar otros patrones del libro de shader y mapear las texturas en diferentes figuras 3D.
</p>

{{< /hint >}}
## Resultados
### Ejercicio 1

<blockquote>
<p style = 'text-align: justify;'>
Para el primer ejercicio, se crean figuras tridimensionales que se pueden variar para aplicarles texturas. Se han creado dos cajas donde se puede seleccionar la textura y la figura que se desea visualizar. Las figuras disponibles son el Elipsoide, Cilindro, Cono y Cubo. Además, se puede utilizar el mouse para hacer clic y arrastrar, lo que permite rotar la figura.
<br>
En cuanto a las texturas, en primer lugar se utiliza una textura tipo Truchet, que es una técnica que consiste en dividir una superficie en pequeñas baldosas. Esta técnica se aborda con más detalle en el ejercicio 2.
<br>
Otra técnica utilizada, llamada "color", consiste en generar círculos de color en degradado con divisiones rectangulares desde azul hasta rosa. También se puede utilizar el mouse para aumentar o disminuir la cantidad de rectángulos visibles. 
<br>
Por último, se implementa una sencilla técnica de generación de un efecto de ladrillo. Con el mouse, se puede ajustar la cantidad de ladrillos, aumentándola o disminuyéndola.
En el ejercicio se presenta un cuadro interactivo que muestra el resultado de estas técnicas de texturizado procedimental.
</p>
</blockquote>


{{< p5-iframe sketch="/showcase/sketches/procedural_texturing/sketch.js" width="650" height="650" >}}


### Ejercicio 2
<blockquote>
<p style = 'text-align: justify;'>
En el ejercicio 2, se utiliza la forma de textura Truchet y se han añadido 2 controles deslizantes (sliders) para variar dos de los parámetros que dan forma a la figura. Con el primer control deslizante se puede desplazar el triángulo dentro del rectángulo, lo que crea formas extrañas. Con el segundo control deslizante se modifica la forma en que la figura rota, generando otros patrones y permitiendo experimentar con diferentes configuraciones. 
<br>
Además, se ha agregado un botón de "aleatorio" que toma un tiempo en milisegundos para rotar y variar las figuras. Moviendo el mouse, se puede modificar el patrón generado en cada iteración.

</p>
</blockquote>
<br>
{{< p5-iframe sketch="/showcase/sketches/procedural_texturing/sketch2.js" width="650" height="650" >}}


## Conclusiones y trabajo futuro

<blockquote>
<p style = 'text-align: justify;'>
A lo largo de esta experimentación  se aprendieron muchas cosas interesantes de la Texturación por procedimiento. Es una técnica poderosa, muy flexible y eficiente para crear superficies realistas o abstractas ajustando parámetros y personalizando los ejercicios para obtener resultados personalizados .
<br>
Se explotaron diferentes técnicas como el ruido fractal, el mapeo de colores y el uso de patrones Truchet.Cada técnica  ofrece una amplia gama de posibilidades para desarrollar la creatividad en campos de videojuegos, la animación y la simulación y cada técnica tiene sus características propias y efectos visuales diferentes 
<br>
Finalmente se tiene la interacción con el usuario gracias al uso de shaders que permite pasar datos de javascript a .frag para dinamizar y generar una experiencia más participativa mediante el uso de algoritmos que a diferencia del trabajo anterior, en ilusiones visuales, se usa la GPU para agilizar los cálculos y generar figuras dinámicas 

## Referencias
1. https://visualcomputing.github.io/docs/shaders/procedural_texturing/
2. https://thebookofshaders.com/09/
3. https://www.shadertoy.com
 4. https://www.youtube.com/watch?v=TaluaAD9MKA

---
weight: 2
---

# Fenómeno de Masking (enmascaramiento) y Kinegramas

## Introducción

<p style="text-align: justify">El masking visual es un fenómeno de percepción visual que se produce cuando la visibilidad de una imagen (objetivo) se ve reducida por la presencia de otra imagen (máscara). A continuación se estudiarpa y realizará la implementación de un kinegrama como acercamiento al fenómeno visual de 'masking'.</p>

### Antecedentes y trabajo previo

<p style="text-align: justify">La palabra kinegrama proviene de "kine", que significa "en movimiento", y "-gram", que significa "dibujo". Consiste en un efecto de animación creado por el movimiento de una superposición transparente a rayas a través de una imagen entrelazada. Cuando la rejilla lineal superpuesta se desplaza por la imagen entrelazada, la imagen inferior parece animarse. Esta técnica se originó en la década de 1890 y la publicación más antigua conocida es un "Motograph Moving Picture Book" de Bliss, Sands & Co, la cual contiene patrones, que dan efecto moiré cuando la transparencia de la banda se mueve a través de la creación de una ilusión de movimiento como el movimiento ondulante del vapor o el giro de las ruedas de un engranaje, como se puede observar en la figura 1.

<p align = "center"><img src = "/showcase/img/kinegram_example.gif" alt="" width="300"><br>Fig.1 - ejemplo de kinegrama</p>

<p style="text-align: justify">El efecto de Moiré es un patrón de interfecrencia visual que resulta de una distorsión geométrica causada por la superposición de dos patrones similares, dando como resultado un efecto visual oscilante.</p>

<p align = "center"><img src = "/showcase/img/moire_patron.webp" alt="" width="550"><br>Fig.2 - patrón de Moiré resultante de la superposición de dos rejillas con diferentes inclinaciones</p>

<div style="text-align: justify">

A continuación se listan algunos trabajos previos realizados sobre este tema:

- [Kinegram (“Scanimation”)](https://michaelbach.de/ot/mot-scanimation/index.html) es un ejemplo de la implementación de un kinegrama, el programa muestra una única animación y permite modificar parámetros como el ancho de las líneas, el espaciado de las líneas, además de los colores de tanto de la imágen de la animación como de la rejilla.
- [Kinegram app](https://kinegram.app/) es una aplicación online que nos permite subir nuestras propias imágenes para generar de forma automática el kinegrama, permitiendo modificar atributos como el color de las líneas y la velocidad de la animación.

</div>

## Ejercicio

{{< hint info >}}
Implementar un kinegrama y algunos de los patrones de Moirés los cuales se acercan al fenómeno visuak del masking.
{{< /hint >}}

### Solución

<p style="text-align: justify">Debido a que el kinegrama implementa el concepto de patrones de Moiré, solo realizaremos la implementación de este, enfocándonos en entender cómo se crean y cómo funcionan estos patrones.</p>

#### ¿Cómo se hace un Kinegrama?

Un kinegrama se compone de dos partes:

#### Una patrón de rayas superpuesta

<div style="text-align: justify"> Primero definimos un patrón de rayas con una orientación, un grosor y un espaciado entre líneas predeterminado, por ejemplo: 
<p align = "center"><img src = "/showcase/img/grid_lines.png" alt="" width="300"><br>Fig.3 - patrón de rayas verticales, de grosor 4px y espaciado de 2px</p>
Veamos que la rejilla y el movimiento que tiene son claves para la animación final. Esta está hecha de forma que al dezplazarse, en este caso horizontalmente, los espacios nos permitan ver una parte del patrón y ocultar otra. Veremos a continuación que la imágen que está por debajo consiste en intercalar los diferentes fotogramas que conforman la animación, por lo que el número de fotogramas y el grosor de las líneas de la rejilla está relacionado. Un análisis más detallado de esto se dará más adelante.
</div>

#### Una imagen subyacente con un patrón de rayas

<p style="text-align: justify">Para generar esta imagen lo primero que necesitamos son imágenes de una secuencia de animación, por ejemplo:</p>

<p align = "center"><img src="/showcase/img/animal_3_sequence.png" alt= “” width="400"><br>Fig.4 - secuencias de imágenes que forman una animación</p>

<p style="text-align: justify">Para cada una de las imágenes(fotogramas) de la secuencia debemos realizar el siguiente procedimiento: dividimos la imagen en tiras de tamaño el espacio definido para el patrón de rayas, en este caso de 2px</p>

<p align = "center"><img src="/showcase/img/anim1_paso1.png" alt= “” width="300"><br>Fig.5 - imagen 1 de la secuencia divida en tiras de 2px</p>

<p style="text-align: justify">De esta división, únicamente necesitamos una porción de la imagen, en este caso como la secuencia se compone de 3 fotogramas, debemos tomar tiras cada 3 divisiones comenzando desde 1, por ejemplo, si numeramos cada tira desde 1 hasta el número total de tiras, solo tomamos las tiras 1,4,7,10,13,... y así sucesivamente </p>

<p align = "center"><img src="/showcase/img/anim1_paso2-5.png" alt= “” width="85%"><br>Fig.6 - imagen 1 dividida</p>

<p style="text-align: justify">Para la segunda imagen tomaríamos las tiras 2,5,8,11,14,... y para el tercer fotograma las tiras 3,6,9,12,15,... lo cual nos da como resultado las imágnes de la figura 5. En general para el fotograma número k se toman las tiras j tales que j(mod n)=k, con n el número total de fotogramas. Finalmente, superponemos todos las imágenes con el patrón de líneas creado, obteniendo como resultado la figura 8. </p>

<p align = "center"><img src="/showcase/img/animal_strip_sequence.png" alt= “” width="90%"><br>Fig.7 - fotogramas con el patrón de líneas</p>

<p align = "center"><img src="/showcase/img/animal_strip_final.png" alt= “” width="300"><br>Fig.8 - imagen final con el patrón del kinegrama</p>

<div style="text-align: justify">Ya teniendo la imagen final, veamos porqué se hace se esa manera y cómo funciona. Teniendo en cuenta la observación inicial sobre la rejilla, sabemos que esta nos permite ver una parte de la imagen y oculta otra, por lo cual podemos deducir que para generar la ilusión de movimiento debemos mostrar una imagen a la vez. Es decir, la idea es que primero se vea parte del primer fotograma, luego cuando se mueva la rejilla un poco, se muestre el segundo fotograma y así sucesivamente. Con esto se justifica el hecho de tener que dividir cada imagen en tiras del grosor del espacio entre las líneas de la rejilla para posteriormente intercalarlas.

Ahora, respecto al grosor de las líneas que se escogió inicialmente y su relación con el número de fotogramas, veamos que como la idea es mostrar un fotograma a la vez, si queremos que solo se vea la imagen de fotograma 1, debemos ocultar los fragmentos de los otros dos fotogramas. Como en el ejemplo cada uno se dividió en tiras de 2px de grosor, tiene sentido que el grosor de la línea sea de 4px para poder ocultarlos y que se vea únicamente un fotograma al tiempo, como se muestra en la figura 9.

<p align = "center"><img src="/showcase/img/fotogramaylineas.png" alt= “” width="80%"><br>Fig.9 - imagen del kinegrama con la rejilla desplazada horizontalmente</p>

Como observasión final, antes de ver la implementación del programa, es importante mencionar que otro factor que influye en la correcta visualización del kinegrama, es la velocidad con la que se desplaza la rejilla. Sin embargo, como este parámetro no se puede modificar en el programa realizado, se deja como algo para mejorar y discutir más adelante.</div>

<blockquote>

<div style="text-align: justify">
El siguiente programa genera un kinegrama dados los fotogramas de una animación y los parámetros de grosor de las líneas del patrón superpuesto y el espaciado entre estas. Se debe cargar y añadir cada fotograma en el orden correspondiente a la animación, para visualizar la animación final, marcar las opciones de correr animación y mostrar patrón de rayas.
</br>

Para ver en movimiento el patrón anterior, guarde la imagen y súbala como un fotograma a la aplicación, ajuste el grosor de la línea en 4 y espacio entre línea a 2.</div>

{{<p5-iframe sketch="/showcase/sketches/kinegram/kinegram_with_files.js" width="625" height="425" >}}

</blockquote>

{{< hint info >}}

<p style='text-align: justify;'>
Observe que en el ejemplo dado, para parámetros un grosor de línea de 10px, aunque no es tan clara, la animación también logra verse correctamente.
</p>
{{< /hint >}}
<blockquote>
<p style="text-align: justify">A continuación se muestran dos ejemplos adicionales de kinegramas generados desde cero, de una rueda girando y unos círculos en movimiento. El proceso en este caso es el mismo, solo que las imagenes en vez de ser cargadas por el usuario fueron generadas automáticamente, dibujando cada imagen y modificandola ligeramente para generar los diferentes fotogramas que conforman la animación completa.</p>

{{<p5-iframe sketch="/showcase/sketches/kinegram/kinegram_autogenerated_.js" width="625" height="355">}}

</blockquote>

### Código

{{< details title="Código completo del kinegrama generado con imágenes" open=false >}}

```javascript
let inputElement, userImage;
let canvas1, canvas2;
let vel = 0,
  dir = 1;
let button, slider;
let strokeW = 4,
  space = 1;

function setup() {
  createCanvas(600, 400);
  canvas1 = createGraphics(width / 2 - 20, height / 2 - 20);
  canvas2 = createGraphics(width / 2 - 20, height / 2 - 20);
  inputElement = createFileInput(handleFile);
  inputElement.position(width / 2 + 10, height / 2 - 60);
  button = createButton("añadir fotograma");
  button.position(width / 2 + 10, height / 2 - 30);
  button.mousePressed(saveFrame);
  checkbox = createCheckbox("correr animación", false);
  checkbox.position(10, 340);
  checkbox2 = createCheckbox("mostrar patrón de líneas", false);
  checkbox2.position(10, 360);
  slider = createSlider(2, 6, 1, 1);
  slider.position(140, 280);
  slider.style("width", "120px");
  slider2 = createSlider(2, 10, 1, 1);
  slider2.position(140, 250);
  slider2.style("width", "120px");
}

let n = 0;
let frames = [];
// almacena la imagen actual en un arreglo con todos los fotogramas
function saveFrame() {
  frames[n] = currentImg;
  n += 1;
}

let currentImg;
var posX = 10,
  posY = 10;
function draw() {
  background(200);
  displayText();
  canvas1.background("white");
  canvas2.background("white");
  image(canvas1, 10, 10);
  image(canvas2, width / 2 + 10, height / 2 + 10);
  // ajusta la imagen cargada al tamaño del canvas
  if (userImage != null) {
    if (
      userImage.width - userImage.height < 50 ||
      userImage.width <= userImage.height
    ) {
      imgW = (canvas1.height * userImage.width) / userImage.height;
      imgH = canvas1.height;
    } else {
      imgW = canvas1.width;
      imgH = (canvas1.width * userImage.height) / userImage.width;
    }
    image(userImage, canvas1.width / 2 + 10 - imgW / 2, posY, imgW, imgH);
  }

  currentImg = get(posX, posY, canvas1.width, canvas1.height);
  space = slider.value();
  strokeW = slider2.value();

  // genera la imagen subyacente con las imágenes ya añadidas
  if (frames.length > 0) {
    k = 0;
    for (let y = 0; y < canvas1.width; y += space) {
      let strip = frames[k % frames.length].get(y, 0, space, canvas1.height);
      image(strip, width / 2 + 10 + y, height / 2 + 10);
      k += 1;
    }
  }
  if (checkbox2.checked())
    drawLines(width / 2 + vel, height / 2, strokeW, strokeW + space);
  if (checkbox.checked()) vel += 0.3 * dir;
  if (vel > 50 || vel < 0) dir *= -1;
}
// dibuja el patrón de líneas superpuesto
function drawLines(beginX, beginY, strokeW, space) {
  for (let i = beginX; i < beginX + 300; i += space) {
    line(i, beginY, i, beginY + 220);
  }
  strokeWeight(strokeW);
  strokeCap(SQUARE);
}
// función para manejar la carga de las imágenes
function handleFile(file) {
  if (file.type === "image") {
    userImage = createImg(file.data, "");
    userImage.hide();
  } else userImage = null;
}

function displayText() {
  textSize(13);
  text(slider.value(), 270, 295);
  text(slider2.value(), 270, 265);
  text("espacio entre líneas", 10, 295);
  text("grosor de línea", 10, 265);
  text(str(n), width / 2 + 120, height / 2 - 20);
}
```

{{< /details >}}

<div style='text-align: justify;'>

A continuación se muestra de forma más detallada las partes claves del código anterior.

{{< details title="patrón de líneas superpuestas" open=true >}}
Se usó `line()` para generar las líneas y un `for` para repetir las líneas y generar la rejilla completa. Los parámetros de `strokeW` y `space` corresponden al espacio y grosor de las líneas de la rejilla, estos son modificados por el usuario por medio de un slider definido en el `setup()`.

```javascript
function drawLines(beginX, beginY, strokeW, space) {
  for (let i = beginY; i < beginY + 200; i += space) {
    line(beginX, i, beginX + 250, i);
  }
  strokeWeight(strokeW);
  strokeCap(SQUARE);
}
```

{{< /details >}}
</br>
{{< details title="imagen subyacente" open=true >}}
Las imágenes que carga el usuario se almacenan en un arreglo `frames`. Cuando hay por lo menos una imágen se realiza el proceso de división de los fotogramas con ayuda de `get` para tomar solo una sección de cada imagen. Las imágenes se van intercalando usando `frames[k % frames.length]` que con ayuda de `k` se itera el arreglo.

```javascript
if (frames.length > 0) {
  k = 0;
  for (let y = 0; y < canvas1.width; y += space) {
    let strip = frames[k % frames.length].get(y, 0, space, canvas1.height);
    image(strip, width / 2 + 10 + y, height / 2 + 10);
    k += 1;
  }
}
```

{{< /details >}}

</div>

{{< details title="Código completo del ejemplo de kinegramas generados desde cero" open=false >}}

```javascript
let canvas1, canvas2;
let vel = 0,
  dir = 1;
var currentOption = 1;

function setup() {
  createCanvas(600, 330);
  canvas1 = createGraphics(150, 150);
  canvas2 = createGraphics(150, 150);
  checkbox = createCheckbox("Correr animación", false);
  checkbox.position(10, 280);
  checkbox2 = createCheckbox("Mostrar patrón de líneas", false);
  checkbox2.position(10, 300);
  sel = createSelect();
  sel.position(170, 10);
  sel.option("Rueda");
  sel.option("Circulos");
  sel.changed(mySelectEvent);
}

function draw() {
  background(220);
  canvas1.background("yellow");
  textSize(13);
  text("Fotogramas", 15, 185);
  if (currentOption == 1) {
    drawWheel(canvas1, 0);
    image(canvas1, 0, 0);
  } else {
    if (currentOption == 2) {
      drawCircles(canvas1, 0);
      image(canvas1, 0, 0);
    }
  }
  t = 0;
  var [nFrames, tStep, strokeW, space, plus] = [4, 1, 6, 2, 0];
  if (currentOption == 2)
    [nFrames, tStep, strokeW, space, plus] = [4, 20, 6, 2, 0];
  frames = [];
  for (let y = 0; y < nFrames; y += 1) {
    if (currentOption == 1) drawWheel(canvas1, t);
    else if (currentOption == 2) drawCircles(canvas1, t);
    frames[y] = canvas1.get(0, 0, canvas1.width, canvas1.height);
    t += tStep;
    image(frames[y], 15 + y * 60, 200, 50, 50);
  }

  k = 0;
  for (let y = 0; y < canvas1.height; y += space) {
    let strip = frames[k % nFrames].get(0, y, canvas1.width, space);
    image(
      strip,
      (width * 3) / 4 - canvas1.width / 2,
      height / 2 - canvas1.height / 2 + y
    );
    k += 1;
  }

  if (checkbox2.checked())
    drawLines(320, 90 + vel, strokeW, strokeW + space + plus);
  if (checkbox.checked()) vel += 0.8 * dir;
  if (vel > 30 || vel < 0) {
    dir *= -1;
  }
}

function mySelectEvent() {
  let item = sel.value();
  if (item == "Rueda") {
    currentOption = 1;
  } else {
    if (item == "Circulos") currentOption = 2;
  }
}
// patrón de líneas superpuestas
function drawLines(beginX, beginY, strokeW, space) {
  for (let i = beginY; i < beginY + 200; i += space) {
    line(beginX, i, beginX + 250, i);
  }
  strokeWeight(strokeW);
  strokeCap(SQUARE);
}
// dibujo de la rueda
function drawWheel(canvas, t) {
  posX = rad = canvas.width;
  posY = canvas.height;
  canvas.noStroke();
  canvas.fill("red");
  canvas.ellipse(posX / 2, posY / 2, rad);
  canvas.fill("blue");
  canvas.arc(posX / 2, posY / 2, rad, rad, 0 + t, QUARTER_PI / 2 + t);
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 8 + t,
    (QUARTER_PI / 2) * 9 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 12 + t,
    (QUARTER_PI / 2) * 13 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 20 + t,
    (QUARTER_PI / 2) * 21 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 6 + t,
    (QUARTER_PI / 2) * 7 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 14 + t,
    (QUARTER_PI / 2) * 15 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 10 + t,
    (QUARTER_PI / 2) * 11 + t
  );
  canvas.arc(
    posX / 2,
    posY / 2,
    rad,
    rad,
    (QUARTER_PI / 2) * 18 + t,
    (QUARTER_PI / 2) * 19 + t
  );
  canvas.fill("white");
  canvas.ellipse(posX / 2, posY / 2, 20);
}
// dibujo de los círculos
function drawCircles(canvas, t) {
  posX = rad = canvas.width;
  posY = canvas.height;
  canvas.noStroke();
  canvas.fill("red");
  canvas.circle(posX / 2, posY / 2, rad);
  canvas.strokeWeight(12);
  canvas.noFill();
  canvas.stroke("blue");
  canvas.circle(posX / 2, posY / 2, rad - 50 + t);
  canvas.circle(posX / 2, posY / 2, rad - 100 + t);
  canvas.circle(posX / 2, posY / 2, rad - 150 + t);
}
```

{{< /details >}}

<div style='text-align: justify;'>

A continuación se muestra de forma más detallada las partes claves del código anterior.

{{< details title="funciones para dibujar la rueda y los círculos" open=true >}}
Las imágenes de cada ejemplo son dibujadas con ayuda de una función, `drawWheel` para la rueda y `drawCircles` para los círculos. Estas tiene como parámetros `canvas` que es el canvas sobre el cual se dibuja la imagen y `t` que se usa para modificar ligeramente cada dibujo, con el fin de generar los diferentes fotogramas que forman la animación final. Para el caso de los círculos se utiliza `canvas.circle(posX / 2, posY / 2, rad - 50 + t)` y el parámetro que se debe alterar es la del radio de los círculos. Para el caso de la rueda se utiliza `canvas.arc(posX / 2, posY / 2, rad, rad, 0 + t, QUARTER_PI / 2 + t)` y los parámetros a modificar con los ángulos inicial y final del arco.

```javascript
function drawCircles(canvas, t) {
  posX = rad = canvas.width;
  posY = canvas.height;
  ...
  canvas.circle(posX / 2, posY / 2, rad - 50 + t);
  canvas.circle(posX / 2, posY / 2, rad - 100 + t);
  canvas.circle(posX / 2, posY / 2, rad - 150 + t);
}

function drawWheel(canvas, t) {
  posX = rad = canvas.width;
  posY = canvas.height;
  canvas.noStroke();
  canvas.fill("red");
  canvas.ellipse(posX / 2, posY / 2, rad);
  canvas.fill("blue");
  canvas.arc(posX / 2, posY / 2, rad, rad, 0 + t, QUARTER_PI / 2 + t);
  ...
}
```

{{< /details >}}
</br>
{{< details title="generación de fotogramas" open=true >}}

Para generar los fotogramas se utiliza un `for` que modifica los parámetros que generan cada dibujo y se almacenan en un arreglo `frames` el cual se utiliza posteriormente para generar la imagen subyacente final del kinegrama.

```javascript
function draw() {
  ...
  frames = [];
  for (let y = 0; y < nFrames; y += 1) {
    if (currentOption == 1) drawWheel(canvas1, t);
    else if (currentOption == 2) drawCircles(canvas1, t);
    frames[y] = canvas1.get(0, 0, canvas1.width, canvas1.height);
    t += tStep;
    image(frames[y], 15 + y * 60, 200, 50, 50);
  }
  ...
}
```

{{< /details >}}

Un detalle importante a mencionar, es el rendimiento del programa. Debido a que todo el proceso de dibujar el patrón superpuesto y la imagen subyacente se realizan en la función `draw()` y requieren de varias funciones `for`, en ocasiones la visualización de la animación se interumpe, haciendo que no se vea siempre tan fluida. Esto se puede deber principalmente a elementos como los checkbox, los sliders y el menu dropdown que modifican parámetros de los dibujos o imagenes que se generan en la función principal de dibujar.

</div>

## Conclusión

<div style='text-align: justify;'>
Los kinegramas son una forma interesante de generar animaciones, además de ser un efecto que nos da un acercamiento al fenómeno visual de masking y los patrones de Moiré. Este se compone de dos partes importantes: un patrón de líneas superpuesto y una imágen subyacente con un patrón similar. Los valores del espacio y el grosor de las líneas de la rejilla son determinantes para garantizar una buena animación, además de la velocidad con la que se desplaza la rejilla. Estos factores puede hacer que la animación se vea nítida y fluida, o que por el contrario falle y no se logre visualizar correctamente el movimiento, por lo que sería interesante trabajar más adelante en una forma de establecer una relación más exacta entre estos parámetros para lograr una animación perfecta.</div>

### Trabajo Futuro

<div style='text-align: justify;'>
Un detalle interesante sobre los kinegramas es la forma del patrón superpuesto, pues este no necesariamente tiene que estar conformado por líneas verticales u horizontales, sino que también se pueden implementar otro tipo de patrones para generar animaciones aún más interesantes como las que se muestran a continuación.
<p align="center" float="left">
  <img src="/showcase/img/kine_horse.gif" width="200" />
  <img src="/showcase/img/kine_circular.gif" width="200" /> 
  <br>
  Fig.10 - Ejemplo de kinegramas con un patrón de líneas diferente
</p>
Con esto en mente, algo que se puede mejorar y trabajar más adelante es dar la posibilidad de escoger entre diferentes tipo de rejillas para generar la imágen del kinegrama. Para esto es conveniente volver a estudiar el cómo se realiza un kinegrama y ver si para otro tipo de rejillas el procedimiento es análogo o debe realizarce algún ajuste adicional.
</div>

## Referencias

1. Enevoldsen, Keith. "Kinegrams". Tomado de https://thinkzone.wlonk.com/Kinegram/Kinegram.htm
2. Bach, Michael. "Kinegram (“Scanimation”)". Tomado de https://michaelbach.de/ot/mot-scanimation/index.html
3. Sarcone, Gianni A. "Kinegrams, Art in Motion". Tomado de Sarcone’s Studio -- A Sarcone & Waeber Web Resource. http://giannisarcone.com/Kinegrams.html
4. Wikipedia contributors. "Barrier-grid animation and stereography". Tomado de https://en.wikipedia.org/wiki/Barrier-grid_animation_and_stereography
5. Sacone, G. "Kinegrams: A New Way To Animate Still Images". Tomado de https://www.behance.net/gallery/29805617/Kinegrams-A-New-Way-To-Animate-Still-Images
6. Naturaprint. "¿Qué es el efecto Moiré o Muaré? y como evitarlo". Tomado de https://imprentaonline-naturaprint.com/efecto-moire-muare

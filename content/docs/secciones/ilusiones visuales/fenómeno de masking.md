---
weight: 1
---

# Fenómeno de Masking (enmascaramiento) y Kinegramas

<p style="text-align: justify">El masking visual es un fenómeno de percepción visual que se produce cuando la visibilidad de una imagen (objetivo) se ve reducida por la presencia de otra imagen (máscara). A continuación se realizará la implementación de un kinegrama como acercamiento al fenómeno visual de 'masking'.</p>

## Kinegrama

<p style="text-align: justify">La palabra kinegrama proviene de "kine", que significa "en movimiento", y "-gram", que significa "dibujo". Consiste en un efecto de animación creado por el movimiento de una superposición transparente a rayas a través de una imagen entrelazada. Cuando la rejilla lineal superpuesta se desplaza por la imagen entrelazada, la imagen inferior parece animarse. Esta técnica se originó en la década de 1890 y la publicación más antigua conocida es un "Motograph Moving Picture Book" de Bliss, Sands & Co, la cual contiene patrones, que dan efecto moiré cuando la transparencia de la banda se mueve a través de la creación de una ilusión de movimiento como el movimiento ondulante del vapor o el giro de las ruedas de un coche.</p>

### ¿Cómo se crea un Kinegrama?

Un kinegrama se compone de dos partes:

### Una patrón de rayas superpuesta

<p style="text-align: justify"> Primero definimos un patrón de rayas con un grosor y un espaciado entre líneas predeterminado, por ejemplo: </p>
<p align = "center"><img src = "/showcase/img/grid_lines.png" alt="" width="300"><br>Fig.1 - patrón de rayas horizontales de grosor 4px y espaciado de 2px</p>

### Una imagen subyacente con un patrón de rayas

<p style="text-align: justify">Para generar esta imagen lo primero que necesitamos son imágenes de una secuencia de animación, por ejemplo:</p>

<p align = "center"><img src="/showcase/img/animal_3_sequence.png" alt= “” width="400"><br>Fig.2 - secuencias de imágenes que forman una animación</p>

<p style="text-align: justify">Para cada una de las imágenes(fotogramas) de la secuencia debemos realizar el siguiente procedimiento: dividimos la imagen en tiras de tamaño el espacio definido para el patrón de rayas, en este caso de 2px</p>

<p align = "center"><img src="/showcase/img/anim1_paso1.png" alt= “” width="300"><br>Fig.3 - imagen 1 de la secuencia divida en tiras de 2px</p>

<p style="text-align: justify">De esta división, únicamente necesitamos una porción de la imagen, en este caso como la secuencia se compone de 3 fotogramas, debemos tomar tiras cada 3 divisiones comenzando desde 1, por ejemplo, si numeramos cada tira desde 1 hasta el número total de tiras, solo tomamos las tiras 1,4,7,10,13,... y así sucesivamente </p>

<p align = "center"><img src="/showcase/img/anim1_paso2-5.png" alt= “” width="85%"><br>Fig.4 - imagen 1 dividida</p>

<p style="text-align: justify">Para la segunda imagen tomaríamos las tiras 2,5,8,11,14,... y para el tercer fotograma las tiras 3,6,9,12,15,... lo cual nos da como resultado las imágnes de la figura 5. En general para el fotograma número k se toman las tiras j tales que j(mod n)=k, con n el número total de fotogramas. Finalmente, superponemos todos las imágenes con el patrón de líneas creado, obteniendo como resultado la figura 6. </p>

<p align = "center"><img src="/showcase/img/animal_strip_sequence.png" alt= “” width="90%"><br>Fig.5 - fotogramas con el patrón de líneas</p>

<p align = "center"><img src="/showcase/img/animal_strip_final.png" alt= “” width="300"><br>Fig.6 - imagen final con el patrón del kinegrama</p>

<p style="text-align: justify">El siguiente programa genera un kinegrama dados los fotogramas de una animación y los parámetros de grosor de las líneas del patrón superpuesto y el espaciado entre estas. Se debe cargar y añadir cada fotograma en el orden correspondiente a la animación, para visualizar la animación final, marcar las opciones de correr animación y mostrar patrón de rayas.</p>
<p style="text-align: justify">Para ver en movimiento el patrón anterior, guarde la imagen y subala como un fotograma a la aplicación, ajuste el grosor de la línea en 4 y espacio entre línea a 2.</p>
{{< hint info >}}

<p style='text-align: justify;'>
Algo interesante de analizar es el grosor de las líneas del patrón superpuesto, pues el espacio y el grosor son determinantes para garantizar una buena animación, ya que esta puede hacer que la animación se vea nítida y fluida, o que por el contrario falle y no se logre visualizar correctamente el movimiento. Observe que en el ejemplo para parámetros (6, 3) de grosor y espaciado de las líneas, la animación también logra verse correctamente.
</p>
{{< /hint >}}
<br>
{{< p5-iframe sketch="/showcase/sketches/kinegram_moire/kinegram_with_files.js" width="625" height="425" >}}

{{< details title="Código fuente - kinegrama generado con imágenes" open=false >}}

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

<p style="text-align: justify">A continuación se muestran dos ejemplos adicionales de kinegramas generados desde cero, de una rueda girando y unos círculos en movimiento. El proceso en este caso es el mismo, solo que las imagenes en vez de ser cargadas por el usuario fueron generadas automáticamente, dibujando cada imagen y modificandola ligeramente para generar los diferentes fotogramas que conforman la animación completa.</p>
<br>
{{< p5-iframe sketch="/showcase/sketches/kinegram_moire/kinegram_autogenerated_.js" width="625" height="355">}}
<br>

{{< details title="Código fuente - ejemplo de kinegramas generados desde cero" open=false >}}

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
{{< hint info >}}

<p style='text-align: justify;'>
Otro detalle interesante es la forma del patrón superpuesto, pues este no necesariamente tiene que ser conformado por líneas verticales u horizontales, también se pueden implementar otro tipo de patrones para generar animaciones aún más interesantes como las que se muestran a continuación.
<p align="center" float="left">
  <img src="/showcase/img/kine_horse.gif" width="200" />
  <img src="/showcase/img/kine_circular.gif" width="200" /> 
  <br>
  Fig.7 - Ejemplo de kinegramas con un patrón de líneas diferente
</p>
{{< /hint >}}

## Referencias

1. Enevoldsen, Keith. "Kinegrams". From https://thinkzone.wlonk.com/Kinegram/Kinegram.htm
2. Bach, Michael. "Kinegram (“Scanimation”)" From https://michaelbach.de/ot/mot-scanimation/index.html
3. Sarcone, Gianni A. "Kinegrams, Art in Motion." From Sarcone’s Studio -- A Sarcone & Waeber Web Resource. http://giannisarcone.com/Kinegrams.html
4. Wikipedia contributors. "Barrier-grid animation and stereography". From https://en.wikipedia.org/wiki/Barrier-grid_animation_and_stereography

---
weight: 1
---

# Introducción

<p align="justify">
En este ejercicio se exploran diferentes herramientas y lógicas disponibles para la creación de escenarios 3D en p5.js. Se buscó darle un enfoque de simulación de un videojuego, aplicando los conceptos de transformaciones espaciales, árboles de transformación, HUD, movimiento de cámara, iluminación, entre otros. De esta manera, se pueden analizar las distintas alternativas disponibles para la creación de estos escenarios y también sus fortalezas y debilidades.
</p>

# Antecedentes

<blockquote>

## Transformaciones Espaciales

<p align="justify">
Las transformaciones espaciales son operaciones que se realizan sobre un objeto para cambiar su posición, orientación o escala. Estas operaciones se pueden realizar de forma individual o en conjunto. Las transformaciones espaciales se pueden aplicar a objetos 2D y 3D.
</p>

<br>

<img src="/showcase/img/space_transformations.png">

_Tomado de [visualcomputing.github.io](https://visualcomputing.github.io/docs/space_transformations/)_

<br>

<p align="justify">
Algunas de las transformaciones espaciales más comunes son:
</p>

### Traslación

<p align="justify">
La traslación es una transformación que se utiliza para cambiar la posición de un objeto. 
</p>

### Rotación

<p align="justify">
La rotación es una transformación que se utiliza para cambiar la orientación de un objeto.
</p>

### Escala

<p align="justify">
La escala es una transformación que se utiliza para cambiar el tamaño de un objeto. 
</p>

<br>

<p align="justify">
Estas se pueden realizar sobre cualquiera de los ejes de coordenadas. Por ejemplo, se puede realizar una traslación sobre el eje X para mover un objeto horizontalmente, una traslación sobre el eje Y para mover un objeto verticalmente y una traslación sobre el eje Z para mover un objeto en profundidad.
</p>

<br>

![](/showcase/img/planet_orbiting.gif)

_Tomado de [Pinterest](https://www.pinterest.com/pin/338403359481227126/)_

## Árboles de Transformación

<p align="justify">
Los árboles de transformación son un concepto utilizado para organizar las transformaciones espaciales con respecto a distintos puntos de referencia. Esto permite que las transformaciones se puedan realizar de forma individual o en conjunto, dependiendo de la forma en que se organicen las transformaciones en el árbol. Esto logra una mayor facilidad al dibujar o animar objetos que se encuentren relacionados entre sí.
</p>

<p align="justify">
En el caso de p5.js, se puede utilizar la función <code>push()</code> para crear un nuevo punto de referencia y la función <code>pop()</code> para volver al punto de referencia anterior. De esta manera, se pueden realizar transformaciones sobre un punto de referencia y luego volver al punto de referencia anterior para realizar otras transformaciones.
</p>

<br>

![](/showcase/img/grid_translation.svg)

_Tomado de [Processing](https://processing.org/tutorials/transform2d)_

## Cámara

<p align="justify">
La cámara es un concepto utilizado para simular la visión de un observador. Esto permite que se pueda simular el movimiento de un observador en un escenario 3D. En p5.js, se puede utilizar la función <code>camera()</code> y definir sus movimientos y rotaciones con las funciones <code>move()</code> y <code>pan()</code>.
</p>

<br>

![](/showcase/img/camera_perspective.png)

_Tomado de [Wikipedia](https://en.wikipedia.org/wiki/Viewing_frustum)_

## Iluminación

<p align="justify">
La iluminación es un concepto utilizado para simular la luz en un escenario 3D. En p5.js, se puede utilizar la función <code>ambientLight()</code> para definir la luz ambiental y la función <code>pointLight()</code> para definir la luz de un punto.
</p>

<br>

![](/showcase/img/light_types.jpg)

_Tomado de [OpenFrameworks](https://openframeworks.cc/documentation/gl/ofLight/)_

## HUD

<p align="justify">
El HUD (Head-Up Display) es un concepto utilizado para mostrar información en 2D en un escenario 3D al usuario. Donde se puede mostrar información como instrucciones, la vida del personaje, el puntaje, el nivel, entre otros.
</p>

<br>

![](/showcase/img/hud_car.jpg)

_Tomado de [movilidadelectrica.com](https://movilidadelectrica.com/diez-cosas-de-los-head-up-display-hud/)_

</blockquote>

# Ejercicio Realizado

<blockquote>

{{< hint info >}}

<p style='text-align: justify;'>
Realice un modelo 3D libre en p5.js.
</p>

{{< /hint >}}

## Método utilizado y resultados obtenidos

{{< hint warning >}}

Para poder describir de mejor manera el trabajo realizado e ir mostrando la relación con los resultados, estas dos secciones se describirán de forma conjunta.

{{< /hint >}}

<br>

<p align="justify">
Para la realización de este ejercicio se implementó un modelo 3D de un escenario simple de estilo de videojuego. Se creó una arquitectura simple del interior de una cabaña, con distintos elementos decorativos y texturas. También se manejó la iluminación del escenario, la cámara y el HUD. Además, se le brindó al usuario la interactividad básica de un videojuego, permitiéndole moverse por el escenario y rotar la cámara, además de agacharse y saltar; también se implementaron algunos objetos que reaccionan a la interacción del usuario y el HUD también reacciona a la interacción del usuario.
</p>

<br>

Para su correcto funcionamiento, se recomienda dar click en el costado izquierdo del canvas y esperar unos segundos a que carguen todas las texturas y modelos.

<br>

{{< p5-iframe sketch="/showcase/sketches/3d_model/sketch.js" width="1220" height="825" >}}

<br>

### Modelamiento de la arquitectura del escenario

<p align="justify">
Para modelar las paredes, el techo y el suelo del escenario, se implementó una clase llamada <code> Wall</code> que se encarga de crear un cubo con las dimensiones y la textura que se le indiquen, además de los ángulos de rotación con respecto a los ejes de coordenadas X y Y. Además contiene una función que se encarga de dibujar el cubo en el escenario. Su constructor y llamados se muestras a continuación:

{{< details title="Clase Wall" open=false >}}

```javascript
class Wall {
  constructor(
    pos,
    width,
    height,
    Ydirection,
    Xdirection = 0,
    img = null,
    [r, g, b] = [200, 200, 200]
  ) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.Ydirection = Ydirection;
    this.Xdirection = Xdirection;
    [this.r, this.g, this.b] = [r, g, b];
    this.img = img;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.Ydirection);
    rotateX(this.Xdirection);

    if (this.img) {
      texture(this.img);
    } else {
      fill(this.r, this.g, this.b, 255);
    }
    box(this.width, this.height, 20);
    //clear();
    pop();
  }
}
```

{{< /details >}}

<br>

{{< details title="Setup() y Draw()" open=false >}}

```javascript
function setup() {
  ...
  createHouseStructure();
  ...
}
...

function createHouseStructure() {
  // create walls
  walls.push(new Wall(createVector(0, 0, 0), 3200, 600, 0, 0, wallImg));
  walls.push(new Wall(createVector(0, 0, 1200), 3200, 600, 0, 0, wallImg));
  walls.push(
    new Wall(createVector(1600, 0, 600), 1200, 1300, PI / 2, 0, wallImg)
  );
  walls.push(
    new Wall(createVector(-1600, 0, 600), 1200, 1300, PI / 2, 0, wallImg)
  );

  // create roof
  walls.push(
    new Wall(createVector(0, -500, 850), 3200, 800, 0, PI / 3, roofImg)
  );
  walls.push(
    new Wall(createVector(0, -500, 350), 3200, 800, 0, -(PI / 3), roofImg)
  );

  // create floor
  walls.push(
    new Wall(createVector(0, 300, 600), 3200, 1200, 0, PI / 2, floorImg)
  );
}
...

function draw() {
  ...
  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }
  ...

}
```

{{< /details >}}

<br>

Se puede observar cómo se le pasan los ángulos de inclinación en radianes a los objetos que dibujarán el techo.

<br>

### Modelamiento de los objetos decorativos

<p align="justify">
Para los objetos decorativos, como las lámparas, las ventanas, la cama, el escritorio y algunos otros, se tomaron modelos libres de la plataforma https://www.cgtrader.com/ y se les aplicaron distintas texturas para ajustar su apariencia al estilo deseado. Para poder cargar estos modelos, se utilizó el método <code>loadModel()</code> de p5.js. Para poder cargar las texturas, se utilizó el método <code>loadImage()</code> de p5.js. Para poder dibujar los modelos, se utilizó la función <code>model()</code> de p5.js. A continuación se muestra un ejemplo de la implementación de estos métodos y funciones:



{{< details title="Carga de modelos y texturas" open=false >}}

```javascript

function preload() {
  // load images
  floorImg = loadImage("/showcase/sketches/3d_model/floor.jpg");
  roofImg = loadImage("/showcase/sketches/3d_model/roof.jpg");
  wallImg = loadImage("/showcase/sketches/3d_model/wall.jpg");
  nasalizationFont = loadFont(
    "/showcase/sketches/3d_model/nasalization-rg.otf"
  );
  bendImage = loadImage("/showcase/sketches/3d_model/bend.png");
  standImage = loadImage("/showcase/sketches/3d_model/stand.png");
  lampModel = loadModel("/showcase/sketches/3d_model/lamp.obj", true);
  glassBaseTexture = loadImage("/showcase/sketches/3d_model/glass_base.jpg");
  basicDooorModel = loadModel(
    "/showcase/sketches/3d_model/basic_door.obj",
    true
  );
  doorTexture = loadImage("/showcase/sketches/3d_model/door_texture.jpg");
  deskModel = loadModel("/showcase/sketches/3d_model/desk.obj", true);
  blackBedModel = loadModel("/showcase/sketches/3d_model/black_bed.obj", true);
  woolTexture = loadImage("/showcase/sketches/3d_model/wool.jpg");
  windowModel = loadModel("/showcase/sketches/3d_model/window.obj", true);
  monitorModel = loadModel("/showcase/sketches/3d_model/monitor.obj", true);
  starsTexture = loadImage("/showcase/sketches/3d_model/stars.jpg");

}

...

function drawModels() {
  push();
  //translate to light position to put the lamp
  translate(1510, -400, 600);
  //rotate the lamp
  rotateY(-PI / 2);
  noStroke();
  texture(glassBaseTexture);
  model(lampModel);
  pop();

  push();
  //translate to light position to put the lamp
  translate(-1510, -400, 600);
  //rotate the lamp
  rotateY(PI / 2);
  noStroke();
  texture(glassBaseTexture);
  model(lampModel);
  pop();

  //draw the door
  push();
  translate(0, 85, 10);
  rotateY(PI / 2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2.5);
  model(basicDooorModel);
  pop();

  //draw the desk
  push();
  translate(1320, 180, 420);
  rotateY(PI / 2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(4);
  model(deskModel);

  //draw the monitor
  push();
  translate(0, 45, -40);
  rotateY(-PI / 2);
  //rotateX(PI/4);
  noStroke();
  fill("black");
  scale(0.3);
  model(monitorModel);
  pop();

  pop();

  //draw the bed
  push();
  translate(-1200, 140, 800);
  rotateX(PI);
  noStroke();
  texture(woolTexture);
  scale(4);
  model(blackBedModel);
  pop();

  //draw the windows
  push();
  translate(600, 0, 25);
  rotateY(-PI / 2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2);
  model(windowModel);
  pop();

  push();
  translate(-600, 0, 25);
  rotateY(-PI / 2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2);
  model(windowModel);
  pop();

  push();
  translate(-600, 0, 1175);
  rotateY(PI / 2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2);
  model(windowModel);
  pop();

  push();
  translate(600, 0, 1175);
  rotateY(PI / 2);
  rotateX(PI);
  noStroke();
  texture(doorTexture);
  scale(2);
  model(windowModel);
  pop();
}
```

{{< /details >}}

<br>

<p align="justify">
Se puede evidenciar que, al dibujar el escritorio, se utilizó el concepto de <b> árbol de transformaciones </b> para poder posicionar el monitor en la posición deseada con respecto al punto de referencia del escritorio. Algunos otros lugares donde se aplicó este concepto se verán más adelante.
</p>

<br>

<p align="justify">
También, en este apartado, se puede observar que el<b> mayor motivo por el cuál el sketch se demora unos segundos cargando</b> es el gran espacio de memoria que consumen algunos objetos en la escena, por ejemplo, la cama, que debido a su geometría suavizada, requiere más polígonos para ser lograda, y por lo tanto, más memoria para ser almacenada. Por lo que, al estar corriendo este sketch en un navegador, la cantidad de memoria que se le puede asignar es limitada, y por lo tanto, no se pudieron implementar objetos más complejos en esta escena.
</p>

### Implementación de la cámara

<p align="justify">
Para la implementación de la cámara, se le dió prioridad a la interacción de esta con el usuario. En primer lugar, se intentó implementarla con la librería <b> EasyCam </b>, sin embargo, aunque contiene algunas funcionalidades interesantes para dar distintos efectos al movimiento,esta no provee un método nativo para poder desplazarse líbremente en el eje Z del escenario, sino que cuenta con un mecanismo se zoom, que se limita a mirar más lejos estando posicionada desde el mismo punto de vista, y para el desplazamiento solo se cuenta con las funciones <code>panX()</code> y <code>panY()</code>, que aunque son útiles para desplazarse, no se obtiene el efecto deseado. Por lo tanto, se optó por implementar la cámara de manera manual, utilizando la función <code>camera()</code> de p5.js.
</p>

<br>

Para poder controlar la cámara, se implementaron controles con los cuáles se mueve la posición y dirección de la cámara de las siguientes formas:

#### Movimiento por el escenario

<p align="justify">
Para este, se le permitió al usuario ir hacia las direcciónes <b> arriba, abajo, izquierda y derecha </b> con las teclas <code>W</code>, <code>S</code>, <code>A</code> y <code>D</code> respectivamente. Para esto, se utilizó la función <code>camera.move()</code> de p5.js, que permite mover la cámara en la dirección deseada, y se le asignó una velocidad de movimiento de 10 unidades por cada frame. Además, para rotar la vista de la cámara, se utilizó la función <code>camera.pan()</code>, que permite rotar la cámara en el eje X, y se le asignó una velocidad de rotación de 0.1 radianes por cada frame y se asignó esta funcionalidad a los botones de flecha izquierda y derecha del teclado.
</p>

<br>

#### Movimiento en el eje Y

<p align="justify">
Aunque no se implementó una manera de poder mirar hacia arriba y hacia abajo, se utilizaron las teclas correspondientes a la flecha arriba y abajo del teclado para poder mover la cámara en el eje Y, simulando el movimiento de agacharse y volverse a levantar, cambiando entre estos dos estados posibles. Además, para implementar una simulación de un salto, se utilizó la tecla <code>SPACE</code>, que permite mover la cámara en el eje Y, subiendo hasta una altura máxima y luego volviendo al inicio, para esto se debió controlar el estado de salto y de dirección. Para esto hay que tener en cuenta que el eje Y disminuye hacia arriba y aumenta hacia abajo.
</p>

<br>

Estas funcionalidades se implementaron de la siguiente manera:

<br>

{{< details "Movimiento de la cámara" >}}

```javascript
function movementControl() {
  // move person with awsd
  if (keyIsDown(65)) {
    camera.move(-10, 0, 0);
  }
  if (keyIsDown(68)) {
    camera.move(10, 0, 0);
  }
  if (keyIsDown(87)) {
    camera.move(0, 0, -10);
  }
  if (keyIsDown(83)) {
    camera.move(0, 0, 10);
  }

  // rotate person with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    camera.pan(0.1);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    camera.pan(-0.1);
  }

  // decrease y position if jumping and not at less than -100
  if (jumping && camera.eyeY > -100 && jumpDirection == 1) {
    camera.move(0, -10, 0);
  } else if (jumping && camera.eyeY < initialY && jumpDirection == -1) {
    camera.move(0, 10, 0);
  }

  // change jump direction if at max or min height
  if (camera.eyeY <= -100) {
    jumpDirection = -1;
  }

  // change jump to false if at initial height
  if (camera.eyeY == 0) {
    jumping = false;
    jumpDirection = 1;
  }
}

function keyReleased() {
  ...
  //crouch camera with down arrow
  if (keyCode === DOWN_ARROW) {
    if (!bend) {
      camera.move(0, 100, 0);
      bend = true;
    }
  }

  // stand with up arrow
  if (keyCode === UP_ARROW) {
    if (bend) {
      camera.move(0, -100, 0);
      bend = false;
    }
  }

  // jump with spacebar
  if (keyCode === 32) {
    if (!bend && !jumping) {
      jumping = true;
    }
  }

  return false; // prevent any default behavior
}
```

{{< /details >}}

<br>

### Implementación de la iluminación

<p align="justify">
Para la implementación de la iluminación, se utilizó la función <code>poinLight()</code> de p5.js, que permite crear una luz puntual en el escenario. Se implementaron varias luces, dos luces blancas en cada pared correspondiendo a la posición de los modelos de lámparas en el techo y una luz azul en dirección a un objeto de la escena que será descrito más adelante.
</p>

<br>

![](/showcase/img/panoramic_house.png)

<br>

La luz azul, al ser implementada para ese objeto en particular, no tiene mucha intensidad.

<br>

La implementación de la iluminación se realizó de la siguiente manera:

<br>

{{< details "Iluminación" >}}

```javascript

function draw(){
  ...
  //pointLight in side walls position
  pointLight(255, 255, 255, 1300, -400, 600);
  pointLight(255, 255, 255, -1300, -400, 600);
  ...
}

function drawOrbitingEspheres(){
    ...
    pointLight(0, 0, 40, 0, 300, 1000);
    pointLight(0, 0, 40, 0, -300, 1000);
    ...
}

```

{{< /details >}}

<br>

### Implementación del HUD

<p align="justify">
Para el apartado del HUD, se plantearon dos puntos de información. El primero corresponde a la esquina superior derecha, donde se muestran dos menús posibles seleccionables por el usuario: las instrucciones y controles de movimiento, y la información sobre la posición de la cámara y el framerate de la escena.
</p>

<br>

<img src="/showcase/img/menu13d.png" height="50%">
<img src="/showcase/img/menu23d.png" width="77%">

<br>

<p align="justify">
El segundo punto de información corresponde a la esquina inferior derecha, donde se muestra un ícono correspondiente a la posición en el eje Y del usuario, es decir, si está agachado o de pie.
</p>

<br>

<img src="/showcase/img/menu33d.png" width="20%">
<img src="/showcase/img/menu43d.png" width="20%" >

<br>

La implementación del HUD se realizó de la siguiente manera:

<br>

{{< details "HUD" >}}

```javascript
function drawHud() {
  // tomado de: https://editor.p5js.org/rjgilmour/sketches/DKDWmmvrm
  let pan = atan2(camera.eyeZ - camera.centerZ, camera.eyeX - camera.centerX);
  let tilt = atan2(
    camera.eyeY - camera.centerY,
    dist(camera.centerX, camera.centerZ, camera.eyeX, camera.eyeZ)
  );

  translate(camera.eyeX, camera.eyeY, camera.eyeZ);
  rotateY(-pan);
  rotateZ(tilt + PI);
  translate(200, 0, 0);
  rotateY(-PI / 2);
  rotateZ(PI);
  fill(0);
  push();
  translate(-170, -100, 0);
  fill(255);
  if (controlsHud) {
    // triangles indicating direction keys awsd
    triangle(5, 5, 10, 10, 10, 0);
    text("A", 0, 6);
    triangle(10, 0, 15, -5, 20, 0);
    text("W", 12.5, -6);
    triangle(10, 10, 15, 15, 20, 10);
    text("S", 13.5, 20);
    triangle(20, 10, 25, 5, 20, 0);
    text("D", 26, 6);
    text("Spacebar to jump", 0, 30);

    // text indicating arrow keys
    text("Use arrow keys to rotate or crouch/stand", 40, 0);
  } else {
    // text framerate
    if (lastUpdate > 30) {
      fps = frameRate().toFixed(2);
      lastUpdate = 0;
    }
    text("Framerate: " + fps, 40, 0);

    // text camera position

    text("Camera position: ", 0, -10);
    text("x: " + camera.eyeX.toFixed(2), 0, 0);
    text("y: " + camera.eyeY.toFixed(2), 0, 10);
    text("z: " + camera.eyeZ.toFixed(2), 0, 20);
  }

  let watchOption = controlsHud ? "scene statistics" : "controls";

  // message to change hud mode
  text("Press 'h' to see " + watchOption, 40, 10);

  if (bend) {
    image(bendImage, 325, 200, 10, 10);
  } else {
    image(standImage, 325, 200, 10, 10);
  }

  pop();
}

```

{{< /details >}}

<br>

<p align="justify">
Como se puede observar, se utilizó una traslación personalizada para poder poner el contenido siempre fijo en las mismas posiciones, para esto se deben realizar ciertos cálculos sobre la posición de la cámara. Para esto, se implementó el código obtenido de https://editor.p5js.org/rjgilmour/sketches/DKDWmmvrm, correspondiente a la primera parte de la función <code>drawHud()</code>. Esta se usó ya que no se pudo usar el método por defecto que contiene la librería EasyCam, debido a que no se utilizó en este sketch.
</p>

<br>

### Implementación de objeto misterioso

<p align="justify">
Para experimentar y sacar más provecho a los árboles de transformación, se dibujo en la escena una esfera que es orbitada por algunas esferas más pequeñas y, estas a su vez, por otras más pequeñas, evidenciando el poder y la facilidad de uso de los árboles de transformación para poder realizar este tipo de movimientos complejos realizando el mismo movimiento desde puntos de referencia diferentes.
</p>

<br>

<p align="justify">
Además, para dar una mayor interactividad a este objeto, se utilizó la función <code>dist()</code> para calcular la distancia entre la cámara y la esfera, y así poder cambiar la forma de la esfera cuando el usuario se acerca a esta, al reducirle el número de segmentos y así poder darle un aspecto más misterioso.
</p>

<br>

<img src="/showcase/img/mysteryObject3d1.png">
<img src="/showcase/img/mysteryObject3d2.png">

<br>

La implementación del objeto misterioso se realizó de la siguiente manera:

<br>

{{< details "Objeto misterioso" >}}

```javascript
function drawOrbitingEspheres(){
 
  sphereSegments = dist(camera.eyeX, camera.eyeY, camera.eyeZ, 0, 0, 1000) < 700 ? 3 : 32;
  pointLight(0, 0, 40, 0, 300, 1000);
  pointLight(0, 0, 40, 0, -300, 1000);
  
  //draw the orbiting espheres
  push();
  noStroke();
  translate(0, 0, 1000);
  pointLight(0, 0, 150, 0, 0, 0);
  texture(starsTexture);
  
  rotateY(millis() / 1000);
  sphere(100, 16, sphereSegments);

  //spheres rotating around the other
  push();
  translate(0, 0, 150);
  rotateX(millis() / 1000);
  sphere(20, 16, sphereSegments);
  drawOrbitingOrbitingSpheres();
  pop();
  ...
}

...

function drawOrbitingOrbitingSpheres(){
  push();
  translate(0, 0, -30);
  rotateX(millis() / 1000);
  sphere(5, 16, sphereSegments);
  pop();

  push();
  translate(0, 0, 30);
  rotateX(millis() / 1000);
  sphere(5, 16, sphereSegments);
  pop();
  ...
}

```

{{< /details >}}

<br>

Donde <code>sphereSegments</code> es la variable que controla el número de segmentos de la esfera con base en la posición de la cámara.


</blockquote>

# Conclusiones y trabajo futuro

<bloquote>

<p align="justify">
Con este ejercicio se cubrieron gran parte de los temas vistos sobre gráficos 3D, logrando un buen nivel de profundidad en cada uno de ellos y, además, se pudo experimentar con algunos otros temas que son relevantes a la hora de realizar escenarios en 3D, como lo son las texturas y los modelos 3D en archivos externos .obj.
</p>

<br>

<p align="justify">
Además, se pudo evidenciar la importancia de los árboles de transformación para poder realizar movimientos complejos de una manera sencilla, y se pudo experimentar con la interacción de la cámara con el escenario, lo cual es muy importante para poder darle una mayor interactividad a los escenarios.
</p>

<br>

<p align="justify">
Si bien P5.js es una herramienta poderosa y versátil, se pudieron evidenciar algunas limitaciones de esta, como la falta de soporte para importar modelos con sus propias texturas, lo cual es una limitación importante a la hora de realizar escenarios complejos, ya que se debe recurrir a implementar la textura de manera manual, lo cual puede ser un proceso tedioso y que puede generar resultados no deseados, además de que esto no permite aplicar más de una textura a un mismo objeto de manera sencilla. También este apartado se vio afectado por el hecho de ser corrido en el navegador, ya que se limita la memoria, por lo que no se pueden cargar modelos muy complejos. Sin embargo, el rendimiento no se vio afectado de manera significativa, ya que se pudo correr el sketch sin problemas con varios modelos y texturas cargadas.
</p>

<br>

<p align="justify">
Finalmente, se logró comprender y comparar algunas herramientas y técnicas para distintos de los apartados implementados en este ejercicio y tomar decisiones con respecto a eso.
</p>

<br>

<p align="justify">
Como trabajo futuro hay todo un mundo de posibilidades, en primer lugar, los modelos en 3D tienen muchísimas más aplicaciones que en los videojuegos, y en segundo lugar, aún enfocándose en los videojuegos, existen muchas más posibilidades que las que se pudieron evidenciar en este ejercicio, desde herramientas más sofisticadas para la creación de los modelos, texturas y escenarios, hasta la implementación de físicas más complejas, como la gravedad, colisiones, etc. Todo esto supone una gran industria que sigue en crecimiento y que no dejará de crecer en un futuro cercano.
</p>

<br>

<p align="justify">
También se pueden combinar estos temas de modelado 3D con los temas vistos sobre shaders, lo cual puede ser una poderosa herramienta y brindar muchos mejores resultados de mayor calidad. En distintos videojuegos actuales se puede evidenciar el uso de shaders para darle un aspecto más realista a los objetos, como lo son los reflejos, las sombras, etc.
</p>
</bloquote>

# Referencias

1. https://visualcomputing.github.io/docs/space_transformations/
2. https://p5js.org/es/reference
3. https://editor.p5js.org/rjgilmour/sketches/DKDWmmvrm
4. https://github.com/features/copilot




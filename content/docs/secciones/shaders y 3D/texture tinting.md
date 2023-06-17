---
weight: 2
---
# Introducción

<p align="justify">
En este ejercicio se utilizaron shaders para aplicar un efecto de tintado a una textura. Esto para poder entender las texturas en el campo de los shaders y poder observar sus ventajas con respecto a la programación tradicional por software.
</p>

# Antecedentes

## Shaders
<blockquote>

<p align="justify">
Un shader es un programa que se ejecuta en la GPU, en lugar de la CPU. Esto permite que la GPU pueda realizar operaciones de forma paralela, lo que la hace mucho más eficiente que la CPU para realizar operaciones gráficas.
</p>

## Texturas

<p align="justify">
Una textura es una imagen que se aplica a una superficie. Las texturas se utilizan para darle a los objetos una apariencia más realista. Por ejemplo, una textura de madera se puede aplicar a un objeto para que parezca que está hecho de madera. Las texturas se pueden aplicar a superficies de objetos 3D o a objetos 2D.
</p>

## Texture Tinting

<p align="justify">
El tintado de texturas es un efecto que se puede aplicar a una textura para cambiar su color. Esto se puede lograr multiplicando cada componente de color de la textura por un color de tintado. Por ejemplo, si se multiplica cada componente de color de una textura por el color rojo, la textura se verá roja. Si se multiplica cada componente de color de una textura por el color verde, la textura se verá verde. Si se multiplica cada componente de color de una textura por el color azul, la textura se verá azul. 
</p>

<p align="justify">
El tintado de texturas se puede utilizar para cambiar el color de un objeto en tiempo de ejecución. Por ejemplo, se usa en la programación de videojuegos para cambiar las texturas de los objetos en tiempo de ejecución. Esto permite que los objetos cambien de color en respuesta a eventos en el juego sin tener que cargar una nueva textura o almacenar varias copias de la misma textura en diferentes colores.
</p>

<br>


<img src="/showcase/img/minetex1.jpg" height="40%" width="40%">
<img src="/showcase/img/minetex2.png" height="40%" width="40%">

<br>

<p align="justify">
En la imagen de la izquierda se puede observar la textura original de un bloque de Minecraft. En la imagen de la derecha se puede observar la misma textura después de aplicarle un efecto de tintado con el color azul, esto para simular que el bloque está bajo el agua sin tener que cargar una nueva textura.
</p>

</blockquote>

# Ejercicio Realizado

<blockquote>

{{< hint info >}}

<p style='text-align: justify;'>
Implemente texture tinting mezclando datos interpolados de color y de texel.
</p>

{{< /hint >}}

## Método utilizado

<p align="justify">
Para realizar este ejercicio se utilizó la interpolación de datos de color y de texel. Esto permite mezclar los colores de la textura con los colores de tintado. Todo esto realizado mediante el uso de shaders, texturas y el lenguaje de programación GLSL (OpenGL Shading Language) utilizado por P5.js.
</p>

<p align="justify">
También se implementó un efecto degradado para el tintado de la textura, haciendo que el color de tintado se vaya desvaneciendo a medida que se acerca a la posición x del mouse, esto para estudiar su rendimiento cuando el tintado se aplica de forma dinámica en tiempo de ejecución.
</p>

<p align="justify">
También se utilizó la inteligencia artificial de ChatGPT para reforzar los conocimientos teóricos de los shaders y las texturas.
</p>

<br>

</blockquote>

# Resultados


<blockquote>

## Ejecución del programa

A continuación se puede evidenciar el programa en p5 en ejecución:

<br>

{{< p5-iframe sketch="/showcase/sketches/texture_tinting/sketch.js" width="725" height="525" >}}

<br>

<p align="justify">
En la parte superior izquierda se puede observar un objeto para seleccionar el color de tinte y en la parte superior derecha se puede observar un slider para variar la cantidad de tinte a aplicar a la textura. Además, se puede seleccionar la imagen que se desee para aplicar el efecto de tintado.
</p> 

<br>

También se puede observar que, si se mueve el mouse libremente por la pantalla, el rendimiento del programa no se ve afectado.

## Código del programa

### Programa principal

<p align="justify">
A continuación se puede observar el código del programa principal, en el cual se destaca la creación del shader y el manejo que se le da a sus variables uniformes, obtenidas por los objetos de entrada del programa.
</p>

<br>

{{< details title="sketch.js" open=false >}}

```javascript
let myShader;
let myTexture;
let colorPicker;
let amountSlider;
let fileInput; // added file input variable

function preload() {
    myShader = readShader('/showcase/sketches/texture_tinting/shader.frag', { varyings: Tree.texcoords2 });
    myTexture = loadImage('/showcase/sketches/texture_tinting/wood.jpg');
}

function setup() {
    createCanvas(700, 500, WEBGL);
    colorMode(RGB, 1);
    textureMode(NORMAL);
    shader(myShader);
    colorPicker = createColorPicker(color(1, 0, 0));
    colorPicker.position(10, 10);
    amountSlider = createSlider(0, 1, 0.2, 0.01);
    amountSlider.position(width-100, 10);
    amountSlider.style("width", "80px"); 
    noStroke();

    // create file input element
    fileInput = createFileInput(handleFile);
    fileInput.position(10, height - 40);
}

function draw() {
    background(125);

    // Set the tint color and amount
    let tint = colorPicker.color().levels;
    let tintAmount = amountSlider.value();

    // Set the shader uniforms
    
    myShader.setUniform('uSampler', myTexture);
    myShader.setUniform('uMouseX', mouseX / width);
    myShader.setUniform('R', tint[0]/255);
    myShader.setUniform('G', tint[1]/255);
    myShader.setUniform('B', tint[2]/255);
    myShader.setUniform('uTintAmount', tintAmount);

    // Apply the shader to the entire screen
    quad(-1, 1, 1, 1, 1, -1, -1, -1);

    // Draw the texture to the screen
    image(myTexture, myTexture.width / 2, 0);
}

function handleFile(file) {
    if (file.type === 'image') {
        myTexture = loadImage(file.data, () => {
            console.log('Image uploaded successfully');
        }, () => {
            console.log('Error uploading image');
        });
    } else {
        console.log('Invalid file type');
    }
}
```

{{< /details >}}

<br>

### Shader

<p align="justify">
A continuación se puede observar el código del shader, donde primero se obtiene el color de tintura se recibe en la variable uniforme <code> uTintAmount </code>. Luego se obtiene el color de la textura por medio de la función <code> texture2D </code> y se usa la función <code> mix </code> para mezclar los colores de la textura y de tintado. También se puede observar una estructura condicional para aplicar el efecto degradado al tintado con respecto a la posición x del mouse, la cual se recibe en la variable uniforme <code> uMouseX </code>.
</p>

<br>

{{< details title="shader.frag" open=false >}}

```glsl
precision mediump float;

uniform sampler2D uSampler;
uniform float R;
uniform float G;
uniform float B;

uniform float uTintAmount;

varying vec2 texcoords2;

uniform float uMouseX;

void main() {
    vec4 uTint = vec4(R, G, B, 1.0);
    // Sample the texture at the current UV coordinates
    vec4 texel = texture2D(uSampler, texcoords2);

    // Compare the x-coordinate of the current pixel with the mouse's x-coordinate
    if (texcoords2.x > uMouseX) {
        // Get the distance between the current pixel and the mouse's x-coordinate
        float distance = abs(texcoords2.x - uMouseX);
        // Mix the texture color with the tint color
        vec4 tintedTexel = mix(texel, uTint, uTintAmount * distance);

        // Set the output color to the tinted texture color
        gl_FragColor = tintedTexel;
    } else {
        // Set the output color to the original texture color
        gl_FragColor = texel;
    }
}
```

{{< /details >}}

<br>

</blockquote>

# Conclusiones y trabajo futuro

<blockquote>

<p align="justify">
Mediante este simple ejercicio, se pudo evidenciar que el uso de shaders puede ser muy útil para aplicar efectos a las texturas de forma dinámica en tiempo de ejecución. Más específicamente, el texture tinting, al ser un efecto muy común y sencillo, puede ser fácilmente aplicado de la manera que se desee y conseguir una gran variedad de resultados.
</p>

<br>

<p align="justify">
Esto puede ayudar en el desarrollo de videojuegos o de otro tipo de aplicaciones que requieran de efectos visuales en tiempo real, ya que se puede aplicar el efecto de tintado a una textura de forma dinámica, sin necesidad de tener varias texturas con diferentes colores.
</p>

<br>

<p align="justify">
También se destaca el rendimiento que se puede conseguir al usar shaders, ya que, al ser ejecutados en la GPU, se puede conseguir un mejor rendimiento que al usar el CPU para realizar los cálculos necesarios para aplicar el efecto de tintado.
</p>

<br>

<p align="justify">
Como trabajo futuro, como ya se comentó anteriormente, estas herramientas ayudarán a aplicar efectos más complejos y dinámicos a las texturas, permitiendo mejores y más completas opciones de interactividad entre el usuario y la aplicación que utilice estos efectos.
</p>

<p align="justify">
También, al igual que en otros ejercicios, se destaca el apoyo teórico de la inteligencia artificial para obtener estos resultados.
</p>

<br>

</blockquote>

# Referencias

1. https://visualcomputing.github.io/docs/shaders/texturing/
2. https://www.youtube.com/watch?v=7AQIdwd5PEU
3. https://chat.openai.com/
4. https://vfxdoc.readthedocs.io/en/latest/textures/sampling/

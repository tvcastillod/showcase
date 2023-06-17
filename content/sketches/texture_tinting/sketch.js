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
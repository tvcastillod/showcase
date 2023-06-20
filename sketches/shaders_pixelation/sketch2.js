let img;
let video;
let pixelSize = 10;
let useVideo = false;
let checkbox;
let slider;
let font;

function preload() {
    img = loadImage("/showcase/sketches/shaders_pixelation/peinture.jpg", () => {
        img.resize(width, height);
    });
      font = loadFont("/showcase/sketches/shaders_pixelation/Roboto-Regular.ttf");

    video = createVideo(["/showcase/sketches/shaders_pixelation/wagon.webm"]);
    video.hide();
    video.loop();
}

function setup() {
    createCanvas(img.width, img.height);
    textFont(font);
    textSize(15);
    noStroke();
    noSmooth(); // disable smoothing for pixelated effect
    checkbox = createCheckbox('Use video', false);
    checkbox.position(10, 10);
    slider = createSlider(1, 50, 10);
    slider.position(10, 30);
    slider.style('width', '80px');
    //quitarle el sonido al video
    video.volume(0);
}

function draw() {
    background(255);
    pixelSize = slider.value();
    useVideo = checkbox.checked();
    if (useVideo) {
        //mostrar el video
        image(video, 0, 0, width, height);
        img =
        video.get();
        Pixelar(img);
        
    } else {
        img= img.get();
        image(img, 0, 0, width, height);
        img.loadPixels();
        Pixelar(img);
    }
    fill(0);
    //show framerate
    text("FPS: " + floor(frameRate()), width-50, 15);

}

function Pixelar(img){
    for (let x = 0; x < img.width; x += pixelSize) {
        for (let y = 0; y < img.height; y += pixelSize) {
            let c = getAverageColor(img, x, y, pixelSize);
            fill(c);
            rect(x, y, pixelSize, pixelSize);
        }
    }
}

function getAverageColor(img, x, y, size) {
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = x; i < x + size; i++) {
        for (let j = y; j < y + size; j++) {
            if (i < img.width && j < img.height) {
                let c = img.get(i, j);
                r += red(c);
                g += green(c);
                b += blue(c);
                count++;
            }
        }
    }
    r /= count;
    g /= count;
    b /= count;
    return color(r, g, b);
}

function toggleUseVideo() {
    useVideo = !useVideo;
    if (useVideo) {
        video.loop();
    } else {
        video.pause();
    }
}
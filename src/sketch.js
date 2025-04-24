// todo: x,y contain center point. Will eventually need to be changed to central node of a splatter or list of splatter nodes 
let x;
let y;

// todo: this will need to be resized to fit the screen. What happens to the existing splatters? 
let colorGrid;
let WIDTH;
let HEIGHT;
let PIXEL_DENSITY;
let PIXELS_PER_ROW;

let t = 0;
// -------------------------------------------------------------------------------------
// CLASS FUNCTIONS 
// todo: this will be moved to a separate file 

// -------------------------------------------------------------------------------------
// GRID FUNCTIONS 


// -------------------------------------------------------------------------------------
// P5.JS SKETCH FUNCTIONS 

function setup() {
    // setting up the canvas to the size of the window
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('myDrawing');

    // setting up the pixels array
    PIXEL_DENSITY = pixelDensity();
    loadPixels();
    PIXELS_PER_ROW = 4 * width * PIXEL_DENSITY;

    // setting up our color grid 
    for (let i = 0; i < WIDTH; i++) {
        colorGrid.push([]);
        for (let j = 0; j < HEIGHT; j++) {
            colorGrid[i][j] = random(0,2);
        }
    }
}

function mousePressed() {
    // Store the mouse position when the mouse is pressed
    x = mouseX;
    y = mouseY;


}

function draw() {
    fill(255, 0, 0);
    if (t % 10 == 0) {
        // todo: this will create a new splatter at x,y
        for (let i = 0; i < pixels.length; i+=4) {
            let r = i % PIXELS_PER_ROW;
            let c = Math.floor(i / PIXELS_PER_ROW); 

            pixels[i] = colorGrid[r][c] * 120;
            pixels[i+1] = colorGrid[r][c] * 120;
            pixels[i+2] = colorGrid[r][c] * 120;
            pixels[i+3] = 255;

            colorGrid[r][c] = random(0,2);
        }
    }
    // ellipse(mouseX, mouseY, 50, 50);
    t += 1;
}
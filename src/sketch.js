// todo: x,y contain center point. Will eventually need to be changed to central node of a splatter or list of splatter nodes 
let x;
let y;
let TICK_RATE = 10;

// todo: this will need to be resized to fit the screen. What happens to the existing splatters? 
let colorGrid;
let WIDTH;
let HEIGHT;
let PIXEL_DENSITY;
let PIXELS_PER_ROW;
let COLOR;

let t = 0;



// -------------------------------------------------------------------------------------
// GRID FUNCTIONS 
// note: this might be a temporary solution and should only be used on the creation of the splatter
function updateGrid() {
    // todo: consider making this a function of splatter and optimzing by only updating a square plot around center 
    // todo: might be a generative art thing but can preload splatter patterns with slight noise to create a more organic look
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            let index = (i*WIDTH + j) * 4;
            let val = Math.floor(colorGrid[i][j]);  
            pixels[index + 0] = val * 120; // R
            pixels[index + 1] = val * 120;   // G
            pixels[index + 2] = val * 120;   // B
            pixels[index + 3] = 255; // A
            colorGrid[i][j] = random(0,2);
        }
    }
    updatePixels();
}

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

    COLOR = color('red');

    // setting up our color grid
    // todo: this might not be needed and can just work straight with the pixels array
    colorGrid = []
    for (let i = 0; i < HEIGHT; i++) {
        colorGrid[i] = new Array(WIDTH).fill(random(0,2));
    }
    console.log(colorGrid); 
}

function mousePressed() {
    // Store the mouse position when the mouse is pressed
    x = mouseX;
    y = mouseY;

    // todo: this should create a new splatter at x,y
    // let splatter = new Splatter(x, y, COLOR);
}

function draw() {
    fill(255, 0, 0);

    if (t % TICK_RATE == 0) {
        // todo: this will create a new splatter at x,y
        updateGrid();
    }
    // ellipse(mouseX, mouseY, 50, 50);
    t += 1;
}
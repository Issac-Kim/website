// todo: x,y contain center point. Will eventually need to be changed to central node of a splatter or list of splatter nodes 
let x;
let y;
let TICK_RATE = 10;

// todo: this will need to be resized to fit the screen. What happens to the existing splatters? 
let colorGrid;
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;    
let PIXEL_DENSITY;
let PIXELS_PER_ROW;
let SPLATTER_SIZE = 200;
let DROPLET_COUNT = 10;
let COLOR;

let splatters = {};
let splatterCount = 0;

let t = 0;



// -------------------------------------------------------------------------------------
// GRID FUNCTIONS 
// note: this might be a temporary solution and should only be used on the creation of the splatter
function updateGrid() {

    // todo: consider making this a function of splatter and optimzing by only updating a square plot around center 
    // ^ does not need to be a function of splatter, since this will only be run once per splatter
    // todo: might be a generative art thing but can preload splatter patterns with slight noise to create a more organic look
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            let index = (i*WIDTH + j) * 4;
            let id = colorGrid[i][j];  
            let c = splatters[id].getColor().levels;

            pixels[index + 0] = c[0]; // R
            pixels[index + 1] = c[1];   // G
            pixels[index + 2] = c[2];   // B
            pixels[index + 3] = c[3]; // A
           
        }
    }
    updatePixels();
}

// -------------------------------------------------------------------------------------
// P5.JS SKETCH FUNCTIONS 

function setup() {
    // global variables initialization
    COLOR = color('red')


    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('myDrawing');
    background(255);

    // setting up the pixels array
    PIXEL_DENSITY = pixelDensity();
    loadPixels();
    PIXELS_PER_ROW = 4 * width * PIXEL_DENSITY;


    // setting up our color grid
    // todo: this might not be needed and can just work straight with the pixels array
    colorGrid = []
    for (let i = 0; i < HEIGHT; i++) {
        colorGrid[i] = new Array(WIDTH).fill(0);
    }
}

function mousePressed() {
    // Store the mouse position when the mouse is pressed
    x = mouseX;
    y = mouseY;

    // todo: this should create a new splatter at x,y
    let splatter = new Splatter(x, y, SPLATTER_SIZE, COLOR, DROPLET_COUNT, Object.keys(splatters).length);
    splatter.display();
    splatters[Object.keys(splatters).length] = splatter;
    splatter.colorPixelGrid(colorGrid);
    splatterCount += 1;
    updateGrid();
}

function draw() {


    if (t % TICK_RATE == 0) {
        // todo: this will create a new splatter at x,y
        // updateGrid();
        for (const [id, splatter] of Object.entries(splatters)) {
            splatter.drip();
        }

    }
    // ellipse(mouseX, mouseY, 50, 50);
    t += 1;
}
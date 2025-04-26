// -------------------------------------------------------------------------------------
// CLASS FUNCTIONS 
// todo: this will be moved to a separate file 
class Splatter {
    constructor(x, y, size, color, dropletCount, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.droplets = [];
        this.color = color;
        this.dropletCount = dropletCount;
        this.addDroplets(this.dropletCount);
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }

    getColor() {
        return this.color;
    }

    // adds droplets surrounding the splatter at equal angles around the splatter center
    addDroplets(count) {
        angleMode(DEGREES);
        let angle = 0;
        for (let i = 0; i < count; i++) {
            angle += 360 / this.dropletCount;
            let length = this.size + random(0, this.size);
            let dropX = this.x + cos(angle) * length;
            let dropY = this.y + sin(angle) * length;
            let droplet = new Droplet(dropX, dropY, this.x, this.y);
            droplet.display();
            this.droplets.push(droplet);
        }

    }

    // animates the droplets to begin their drip 
    drip() {
        for (const droplet of this.droplets) {
            droplet.drip();
        }
    }

    isInsideTriangle(x1, y1, x2, y2, px, py) {
        let area = 0.5 * (-y2 * x1 + y1 * (x2 - x1) + x2 * (y1 - y2) + y2 * x1);
        let s = 1 / (2 * area) * ();
        let t = 1 / (2 * area) * (-y2 * (x1 - px) + x1 * (y2 - y1) + x2 * (px - y1));
        return s >= 0 && t >= 0 && s + t <= 1;
    }

    // after droplets are initialized, we can color in the grid by creating triangles between adjacent droplets and the splatter center
    // using baycentric coordinates to determine if points within the rectangle bounded by the three points are within the triangle 
    // only these points should be colored to represent the splatter
    // todo: some kind of curve should be determined to create a more natural splatter effect
    colorPixelGrid(grid) {
        for (let i = 0; i < this.dropletCount; i++) {
            let x1 = this.droplets[i].x;
            let y1 = this.droplets[i].y;
            let i_2 = (i + 1) % this.droplets.length;
            let x2 = this.droplets[i_2].x;
            let y2 = this.droplets[i_2].y;
            let lowerX = min(x1, x2, this.x);
            let upperX = max(x1, x2, this.x);
            let lowerY = min(y1, y2, this.y);   
            let upperY = max(y1, y2, this.y);
            for (let j = lowerX; j < upperX; j++) {
                for (let k = lowerY; k < upperY; k++) {
                    if (this.isInsideTriangle(x1, y1, x2, y2, this.x, this.y)) {
                        grid[j][k] = this.id;
                    }
                }
            }
        }
        return grid;
    }




}

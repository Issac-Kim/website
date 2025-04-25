// -------------------------------------------------------------------------------------
// CLASS FUNCTIONS 
// todo: this will be moved to a separate file 
class Splatter {
    constructor(x, y, size, color, dropletCount) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.droplets = []
        this.color = color(random(255), random(255), random(255));
    }

    addDroplets(count) {
        for (let i = 0; i < count; i++) {
            let droplet = new Droplet(this.x, this.y);
            this.droplets.push(droplet);
        }

    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }
}

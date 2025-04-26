class Droplet {
    // cx and cy
    constructor(x, y, cx, cy) {
        this.x = x;
        this.y = y;
        this.x_vel
        this.size = random(5, 20);
        this.color = color(random(255), random(255), random(255));
        // F_net = F_splatter - F_gravity - F_friction
        // for the x and y compontents of the force, only y is affected by gravity and friction should slow down movement on both axes
    }


    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }

    // todo: add properties to affect the movement of the droplet: friction, gravity, etc.
    drip () {
        this.x += random(-1,1); // todo: might want to update the x vel based off the normal vector between the droplet and the splatter center
        this.y += random(0,1); // todo: amount of movement downwards should be affected proprotionally to the effect of natural forces 
        this.display();
    }
}
function Particle(x, y, r, fixed) {
    
    this.r = r;
    this.x = x;
    this.y = y;
    var options = {
        friction: 0,
        restitution: .6,
        isStatic: fixed
    }
    this.body = Bodies.circle(x, y, r, options);
    World.add(world, this.body);

    this.isOffScreen = function () {
        var pos = this.body.position;
        return pos.y > height + 100 ;
    }
    this.removeFromWorld = function() {
        World.remove(world, this.body)
    }
    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push()
        translate(pos.x, pos.y)
        rotate(angle);
        rectMode(CENTER)
        strokeWeight(1)
        stroke(255)
        fill(127)
        ellipse(0, 0, this.r * 2)
        pop();
    }
       
}
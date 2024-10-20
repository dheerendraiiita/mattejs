var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Mouse =  Matter.Mouse,
    MouseConstraint =  Matter.MouseConstraint,
    Composite = Matter.Composite;

var engine;
var world;
var boundaries = []
var particles = [];
var mConstraint;

function setup() {
    var canvas = createCanvas(400, 400);
    engine = Engine.create();
    
    world = engine.world;
    

    var prev = null;
    for (var x = 200; x < 400; x += 20) {
        var fixed = false;
        if(!prev) {
            fixed = true;
        }
        var p = new Particle(x, 100, 10, fixed);
        particles.push(p);
        if(prev) {
            var options = {
                bodyA: p.body,
                bodyB: prev.body,
                length: 25,
                stiffness: .4
            }
            var constraint = Constraint.create(options)
            World.add(world, constraint)
        }
        
        prev = p;
        // var p1 = new Particle(230, 100, 10);
        // var p2 = new Particle(200, 150, 10);
        // particles.push(p1);
        // particles.push(p2);
        // boundaries.push(new Boundary(200, height, width, 20, 0))
        // var options = {
        //     bodyA: p1.body,
        //     bodyB: p2.body,
        //     length: 50,
        //     stiffness: .4
        // }
        // var constraint = Constraint.create(options)
        // World.add(world, constraint)
    }

    boundaries.push(new Boundary(200, height, width, 20, 0))
    var canvasMouse = Mouse.create(canvas.elt)
    console.log(canvasMouse)
    canvasMouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasMouse
    }
    
    mConstraint = MouseConstraint.create(engine, options)
    World.add(world, mConstraint)
    startEngine();
   
}
function mouseDragged() {
    
}
function draw() {
    background(51);
    for(var i = 0 ; i < boundaries.length; i++) {
        boundaries[i].show();
    }

    for(var i = 0 ; i < particles.length; i++) {
        particles[i].show();
    }
    if(mConstraint.body) {
        console.log(mConstraint)
        var pos = mConstraint.body.position;
        var m = mConstraint.mouse.position;
        stroke(0, 250, 0);
        line(pos.x, pos.y, m.x, m.y)
    }
   // line(particles[0].body.position.x, particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y)
}
function startEngine() {
    console.log('starting running')
    var runner = Runner.create();
    Runner.run(runner, engine);
}
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Composite = Matter.Composite;

var engine;
var world;
var circles = [];
var ground;
var boundaries = []

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    
    world = engine.world;
    boundaries.push(new Boundary(150, 150, width * .6, 20, .3))
    boundaries.push(new Boundary(250, 350, width * .6, 20, -.3))

    startEngine();
   
}
function mouseDragged() {
    circles.push(new Circle(mouseX, mouseY, random(2, 10)))
}
function draw() {
    background(51);
    for(var i = 0; i < circles.length; i++) {
        circles[i].show();
        if(circles[i].isOffScreen()) {
            circles[i].removeFromWorld();
            circles.splice(i, 1);
            i--;
        }
    }
    for(var i = 0 ; i < boundaries.length; i++) {
        boundaries[i].show();
    }

    console.log(circles.length, world.bodies.length)
}
function startEngine() {
    console.log('starting running')
    var runner = Runner.create();
    Runner.run(runner, engine);
}
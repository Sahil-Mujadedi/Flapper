let birdSprite;


let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

//Create a Pixi Application
let app = new PIXI.Application({
    width: 500, 
    height: window.innerHeight - 30
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.loader
    .add("img/bird.png")
    .load(setup);

function setup() {
    birdSprite = new PIXI.Sprite(
        PIXI.loader.resources["img/bird.png"].texture
    ); 

    birdSprite.y = 0;
    birdSprite.x = 50;
    birdSprite.vy = 1;

    app.stage.addChild(birdSprite);

    app.ticker.add(delta => gameLoop(delta));
}

let fallingFaster = 1;

function gameLoop(delta){
    //Move the bird by delta
    fallingFaster *= 1.02;
    
    birdSprite.y += delta + fallingFaster;

    //Apply the velocity values to the cat's 
    //position to make it move
    birdSprite.y += birdSprite.vy;
}

app.renderer.backgroundColor = 0x68cfe6;

PIXI.utils.TextureCache["img/bird.png"];

let texture = PIXI.utils.TextureCache["img/bird.png"];
birdSprite = new PIXI.Sprite(texture);

function jump() {
    fallingFaster = 1.01;

    
    birdSprite.vy = -10;

    setTimeout(function(){ 
        birdSprite.vy = 1;
    }, 200);


}

document.body.addEventListener('keyup', jump);
document.body.addEventListener('click', jump);


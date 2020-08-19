// Flapper
// a flappy bird clone by Sahil Mujadedi
// https://github.com/killerkoop

// Collision function. Credit to Mozilla for math. Returns true if 2 sprites are colliding
// (developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
function collision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true;
     }
}

// Remove sprite function so I don't have to type a lot to remove sprite
function removeSprite(sprite) {
    sprite.parent.removeChild(sprite);
}

// Making variables
let birdSprite;
let floorSprites = [
    "img/floor1.png",
    "img/floor2.png",
    "img/floor3.png"
];
let floorSpriteOne;
let floorSpriteTwo;
let floorSpriteThree;

// Sets type to WebGL, if WebGL is not supported, it resorts to canvas
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

// Loads sprites
PIXI.loader
    .add("img/top.png")
    .add("img/gameover.png")
    .add("img/bird.png")
    .add(floorSprites)
    .load(setup);

function setup() {
    // Making variables for sprites
    topSprite = new PIXI.Sprite(PIXI.loader.resources["img/top.png"].texture);
    birdSprite = new PIXI.Sprite(PIXI.loader.resources["img/bird.png"].texture); 
    floorSpriteOne = new PIXI.Sprite(PIXI.loader.resources[floorSprites[0]].texture);
    floorSpriteTwo = new PIXI.Sprite(PIXI.loader.resources[floorSprites[1]].texture);
    floorSpriteThree = new PIXI.Sprite(PIXI.loader.resources[floorSprites[2]].texture);
    gameoverSprite = new PIXI.Sprite(PIXI.loader.resources["img/gameover.png"].texture);

    // Setting sprite positions
    gameoverSprite.x = 150;
    gameoverSprite.y = 50;
    birdSprite.y = 200;
    birdSprite.x = 50;
    birdSprite.vy = 1;
    floorSpriteOne.y = window.innerHeight - 100;
    floorSpriteTwo.y = window.innerHeight - 100;
    floorSpriteThree.y = window.innerHeight - 100;

    // adding sprites to stage
    app.stage.addChild(birdSprite);
    app.stage.addChild(floorSpriteOne);
    app.stage.addChild(topSprite);

    app.ticker.add(delta => gameLoop(delta));
}

let fallingFaster = 1;

// Giving background color of light blue
app.renderer.backgroundColor = 0x68cfe6;

PIXI.utils.TextureCache["img/gameover.png"];

let texture = PIXI.utils.TextureCache["img/bird.png"];
birdSprite = new PIXI.Sprite(texture);

function jump() {
    fallingFaster = 1.01;

    birdSprite.vy = -10;

    setTimeout(function(){ 
        birdSprite.vy = 1;
    }, 300);
}

// Restart function for if player wants to play again
function restart() {
    removeSprite(gameoverSprite);
    fallingFaster = 1;
    birdSprite.y = 200;
    birdSprite.vy = 1;
    document.body.removeEventListener('click', restart);
    document.body.removeEventListener('keydown', restart);
    document.body.addEventListener('click', jump);
    document.body.addEventListener('keyup', jump);
}

// Event listeners for jumping
document.body.addEventListener('keyup', jump);
document.body.addEventListener('click', jump);

function gameLoop(delta) {
    if (collision(birdSprite, floorSpriteOne)) {
        document.body.removeEventListener('click', jump);
        document.body.removeEventListener('keyup', jump);
        fallingFaster = -1;
        birdSprite.vy = 0;
        app.stage.addChild(gameoverSprite);
        document.body.addEventListener('click', restart);
        document.body.addEventListener('keydown', restart);
    }
    if (collision(birdSprite, topSprite)) {
        document.body.removeEventListener('click', jump);
        document.body.removeEventListener('keyup', jump);
        fallingFaster = 20;
        birdSprite.vy = 0;
    }

    fallingFaster *= 1.02;
    
    //Move the bird by delta
    birdSprite.y += delta + fallingFaster;

    birdSprite.y += birdSprite.vy;
}

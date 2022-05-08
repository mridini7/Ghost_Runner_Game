var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300, 300, 10, 10)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background(200);
  if(gameState === "play"){

  
  spawnDoors();
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY = -2
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -2
    }
    if (keyDown("right_arrow")){
      ghost.x = ghost.x +2
    }
    ghost.velocityY = ghost.velocityY + 0.5

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    drawSprites()
  }
  if(gameState === "end"){
    text("Game Over", 300, 300)
  }
}

function spawnDoors(){
  if (frameCount%240===0){
    door = createSprite(Math.round(random(100,500)), -75, 10, 10)
    door.addImage(doorImg)
    climber = createSprite(door.x, door.y+50, 10, 10)
    climber.addImage(climberImg)
    invisibleBlock = createSprite(door.x, door.y+45, climber.width, 4)
    invisibleBlock.velocityY - 1;
    door.velocityY = 1;
    climber.velocityY = 1;
    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleBlock.lifetime = 600;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true

    ghost.depth = door.depth
    ghost.depth += 1
  }
}
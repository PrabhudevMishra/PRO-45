const PLAY = 1;
const END = 0;

var player,playerRunning;
var obstacle1Img,obstacle2Img,obstacle3Img,obstacle4Img,obstacleGroup;
var invisibleGround;
var ground, groundImg;
var coinImage;
var scene;
var coinCount;
var coinsGroup;
var footSteps;
var jumpSound;
var lifeCount;
var gameState = PLAY;

function preload(){
  playerRunning = loadAnimation("./p1.png","./p2.png","./p3.png","./p4.png");
  backImg = loadImage("./bg.png");
  groundImg = loadImage("./ground.png");
  obstacle1Img = loadImage("./o1.png");
  obstacle2Img = loadImage("./o2.png");
  obstacle3Img = loadImage("./o3.png");
  obstacle4Img = loadImage("./o4.png");
  coinImage = loadImage("./coins.png");
  footSteps = loadSound("./FOOTSTEPS.wav");
  jumpSound = loadSound("./JUMP SOUND.ogg");
}


function setup() {
  createCanvas(displayWidth,displayHeight);
 
 //footSteps.play();

  ground = createSprite(width/2, displayHeight/2 + 400, width, 200);
  ground.addImage("background", groundImg);
  ground.x = ground.width / 2;
  ground.velocityX = -6;
  ground.scale = 4;
  
  player = createSprite(200,displayHeight/2 + 200,20,20);
  player.addAnimation("player",playerRunning);
  player.scale = 0.6;
  

  invisibleGround = createSprite(width/2, displayHeight/2 + 260, width, 10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();
  coinsGroup = new Group();

  coinCount = 0;
  lifeCount = 4;
}

function draw() {
  background(backImg); 
  
  if(gameState === PLAY){
  spawnObstacles();
  spawnCoins();

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if(keyDown(UP_ARROW) && player.y >= 739){
    player.velocityY = -12;
    jumpSound.play();
  }
  
  player.velocityY = player.velocityY + 0.5;

  //if(coinsGroup.isTouching(player)){
    for(var i = 0; i < coinsGroup.length; i++){
      if(coinsGroup.get(i).isTouching(player)){
        coinCount ++;
        coinsGroup.get(i).destroy();
      }
    }
 // }

 for(var j = 0; j < obstacleGroup.length; j++){
    if(obstacleGroup.get(j).isTouching(player) && lifeCount > 0){
      lifeCount -= 1;
      console.log(lifeCount);
      obstacleGroup.get(j).destroy();
    }
  }

    if(lifeCount === 0){
      gameState = END;
    }
  }
  else if(gameState === END){
    ground.velocityX = 0;
    player.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);

  }
  player.collide(invisibleGround);
  drawSprites();

  textSize(25);
  stroke("black");
  fill("yellow");
  text("COINS: " + coinCount, width - 200, 50);
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(width,displayHeight/2 + 230,10,40);
    obstacle.velocityX = -8;
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      case 4: obstacle.addImage(obstacle4Img);
              break;
      default: break;
    }
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function spawnCoins() {
  if (frameCount % 80 === 0) {
    var coin = createSprite(random(width/2 + 200, width/2 + 300),displayHeight/2 + 230,10,40);
    coin.y = Math.round(random(displayHeight/2 + 230,displayHeight/2 + 50));
    coin.addImage(coinImage);
    coin.scale = 0.05;
    coin.velocityX = -3;
    
    coin.lifetime = 400;
    
    coinsGroup.add(coin);
  }
  
}




























var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var jungleBG, jungleBGImage;
var monkey_collide;
var survivalTime = 0;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkey_collide = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  jungleBGImage = loadImage("Jungle Background.jpg");

  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(60, 310, 50, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkey_collide);
  monkey.scale = 0.15;

  ground = createSprite(300, 370, 600, 15);
  ground.velocityX = -10;
  ground.setCollider("rectangle", 0, 0, 600, 15);
  ground.debug = false;

  jungleBG = createSprite(0, 205);
  jungleBG.scale = 1.52;
  jungleBG.addImage("jungleBG", jungleBGImage);

  foodGroup = new Group();
  obstacleGroup = new Group();

  monkey.setCollider("rectangle", -150, 0, 300, 500, 40);
}

function draw() {
  background(500);

  if (gameState === PLAY) {

    monkey.debug = false;

    monkey.depth = monkey.depth + 3;
    ground.depth = ground.depth + 3;

    if (ground.x < 300) {
      ground.x = ground.width / 2;
    }

    ground.visible = false;

    if (jungleBG.x < 323) {
      jungleBG.x = jungleBG.width / 2;
    }

    if (keyDown("space") && monkey.y >= 319) {
      monkey.velocityY = -14;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);
    //console.log(monkey.y);

    jungleBG.velocityX = -10;

    for (var i = 0; i < foodGroup.length; i++) {
      if (monkey.isTouching(foodGroup.get(i))) {
        foodGroup.get(i).destroy();
        score = score + 1;
      }
    }

    spawnBananas();
    spawnObstacles();

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }

  obstacleGroup.depth = ground.depth;

  /*if (foodGroup.isTouching(monkey)) {
    score = score + 1;
  }*/

  drawSprites();

  textSize(25);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("survival Time: " + survivalTime, 5, 25);

  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 500, 20);

  if (gameState === END) {
    obstacleGroup.setVelocityXEach(0);
    jungleBG.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    monkey.changeAnimation("collide", monkey_collide);
    foodGroup.destroyEach();
    ground.velocityX = 0;
    frameRate(0);

    textFont("Courier New")
    stroke("chocolate");
    strokeWeight(7);  
    textSize(100);
    fill("lime");
    text("Game Over", 30, 200);

  }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(630, Math.round(random(120, 200)), 10, 40);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -10;
    banana.scale = 0.15;
    banana.lifetime = 180;

    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(630, 325, 30, 30);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -10;
    obstacle.scale = 0.2;
    obstacle.lifetime = 180;
    obstacle.debug = false;

    obstacleGroup.add(obstacle);
  }
}
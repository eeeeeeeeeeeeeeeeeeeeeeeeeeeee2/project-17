var PLAY=1;
var END=0;
var gameState=1;
var sword, swordImage, score, gameOverImage;
var fruitGroup, enemyGroup;
var fruit, enemy, enemyImage;
var fruit1, fruit2, fruit3, fruit4;

function preload(){
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  enemyImage = loadImage ("alien1.png");
  gameOverImage = loadImage ("gameover.png");

}

function setup(){
  createCanvas(600, 600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score= 0;
  
}

function draw(){
  background("cyan");
  text("score:"+ score, 500, 500);
  
  if(gameState === PLAY){
    fruits();
    Enemy();
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    if(enemyGroup.isTouching(sword)){
      enemyGroup.destroyEach();
      gameState = END;
  }
  }
  
  else if (gameState === END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX=0;
    enemyGroup.velocityX=0;
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
  }
  drawSprites();
}


function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1);
    } 
    else if (r==2){
      fruit.addImage(fruit2);
    }
    else if (r==3){
      fruit.addImage(fruit3);
    }
    else if (r==4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX= -7;
    fruit.setLifetime= 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    enemy= createSprite (400,200,20,20);
    enemy.addImage("moving", enemyImage);
    enemy.y=Math.round(random(100,300));
    enemy.velocityX= -8;
    enemy.setLifetime= 50;
    
    enemyGroup.add(enemy);
  }
}

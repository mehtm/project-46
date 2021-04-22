var helper,helperImage
var PLAY=1;
var END=0;
var gamestate=PLAY;
function preload(){
    //groundImage=loadImage("groundImage.png")
    helperImage=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png")
    vaccineImage=loadImage("vaccine.png")
    soapImage=loadImage("soap.png")
    pepperImage=loadImage("pepper.png")
    orangeImage=loadImage("orange.png")
    medicine2Image=loadImage("medicine2.png")
    medicineImage=loadImage("medicine.png")
    cabbageImage=loadImage("cabbage.png")
    breadImage=loadImage("bread.png")
    bananaImage=loadImage("banana.png")
    appleImage=loadImage("apple.png")
    coughingImage=loadImage("coughing.png")
    virusImage=loadImage("virus.png")
    maskImage=loadImage("mask.png")
    cryingImage=loadAnimation("crying.png")

    


}

function setup() {
    createCanvas(1200,400)
 helper=createSprite(50,350,20,20);
 helper.addAnimation("running",helperImage);
 helper.addAnimation("crying",cryingImage);
 helper.scale=0.5;
 ground=createSprite(600,360,1200,20)
 obstaclesGroup=new Group()
 foodGroup=new Group()
 //ground.addImage(groundImage)
 ground.velocityX=-2

}

function draw() {
    background("green")
    if (gamestate===PLAY){

    
    if (keyDown("space")){
     helper.velocityY=-10
    }
    helper.velocityY=helper.velocityY+0.8
    
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
      food()
      createObstacles()
      if(helper.isTouching(obstaclesGroup)){
              gamestate=END;
              
      }
}
else if(gamestate===END){
    
    ground.velocityX=0;
    helper.velocityY=0;
    helper.changeAnimation("crying",cryingImage);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-2)
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-2)


}
helper.collide(ground)
 drawSprites();
}

function food(){
    if (frameCount % 120 === 0) {
        var food = createSprite(600,120,40,10);
        food.y = Math.round(random(80,120));

        var ran= Math.round(random(1,11));
        switch(ran){
            case 1:food.addImage(appleImage)
            food.scale=0.5
            break;
            case 2:food.addImage(bananaImage)
           
            break;
            case 3:food.addImage(vaccineImage);
            
            break;
            case 4:food.addImage(soapImage);
           
            break;
            case 5:food.addImage(medicineImage);
            break;
            case 6:food.addImage(medicine2Image);
            break;
            case 7:food.addImage(cabbageImage);
           
            break;
            case 8:food.addImage(pepperImage);
            
            break;
            case 9:food.addImage(orangeImage);
            
            break;
            case 10:food.addImage(breadImage);
            break;
            case 11:food.addImage(maskImage);
            break;
            default:break;
           


        }
       // food.addImage(cloudImage);
        food.scale = 0.2;
        food.velocityX = -3;
        
         //assign lifetime to the variable
        food.lifetime = 200;
        
        //adjust the depth
        food.depth = helper.depth;
        helper.depth = helper.depth + 1;
        
        //add each cloud to the group
        foodGroup.add(food);
}
}
function createObstacles(){
    if(frameCount % 80 === 0) {
        var obstacle = createSprite(600,330,10,40);
        //obstacle.debug = true;
        obstacle.velocityX = -(6);
        
        //generate random obstacles
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: obstacle.addImage(coughingImage);
                 obstacle.scale=0.2;
                  break;
          case 2: obstacle.addImage(virusImage);
                obstacle.scale=0.2
                  break;
          default: break;
        }
        
        //assign scale and lifetime to the obstacle           
        //obstacle.scale = 0.5;
        obstacle.lifetime = 300;
        //add each obstacle to the group
        obstaclesGroup.add(obstacle);
}
}
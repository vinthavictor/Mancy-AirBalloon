var balloon;
var database;
var position;

var bg, balloonimage;
var balloon;
function preload(){
  bg = loadImage("Hot Air Ballon-01.png")
  balloonimage=loadImage("Hot Air Ballon-02.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,600);
  
  balloon=createSprite(400, 200, 50, 50); 
  balloon.addImage(balloonimage);

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);

}
function readPosition(data){
  position = data.val()
  balloon.x = position.x;
  balloon.y =position.y;
}

function draw() {

  background(bg);  
 
if(position!==undefined){


  if(keyDown(LEFT_ARROW)){
    updateHeight(-5,0);
   
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(5,0);
    
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    
  }

}
drawSprites();
}
function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': position.x +x,
    'y':position.y + y
  })
}



function showError(){
  console.log("Error in writing to the database");
}
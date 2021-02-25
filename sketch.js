var airballoon;
var database;
var position;

function preload(){
    database = firebase.database();
    backgroundImg = loadImage("Ballon-01.png");
    hotairballoon = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")

}

function setup() {
  createCanvas(1000,640);
  airballoon = createSprite(250,420, 50, 50);
  airballoon.addAnimation("hotairballoon", hotairballoon);   
  airballoon.scale = 0.7;


  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 250, 30);

  if(position !== undefined)
    
    //to move the circle in all directions using arrow keys
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
       writePosition(0, -10);
      airballoon.scale = airballoon.scale - 0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
      airballoon.scale = airballoon.scale + 0.01;
      
    }
  drawSprites();

}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
})
}

function readPosition(data){
  position = data.val();
  airballoon.x = position.x;
  airballoon.y = position.y;
}

function showError(){
  console.log("its shows error in the database");
}
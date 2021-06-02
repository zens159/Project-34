//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()
  dog = createSprite(250,250,20,20)
  dog.addImage(dogImg)
  dog.scale = 0.2
  foodStock = database.ref('food')
  foodStock.on("value",readStock)
}


function draw() {  
  //add styles here
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  drawSprites();
  textSize(25);
  fill("white");
  stroke(2);
  text("Press up arrow to feed", 125,125);
  text("Food:", 190, 175);
  text(foodS, 270, 175);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x > 0){
    x = x - 1;
  }
  else
    x = 0;
  database.ref('/').update({
    food:x
  })
}


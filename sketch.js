var dog,sadDog,happyDog;
var foodS,foodStock;
var feedFood,addFood;
var fedTime,lastFed;
var foodObj; 
var database;

function preload()
{
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() 
{
  createCanvas(1000,400);
  database = firebase.database();
  
  console.log(database);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedFood = createButton("Feed The Dog");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);


  addFood  = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {
  background(46,139,87);
  

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed===0)
  {
    text("Last Feed : 12 AM",350,30);
  }else
  {
    text("Last Feed: "+ lastFed + " AM",350,30);
  }
  drawSprites();
}

//function to read food Stock
function readStoke(data)
{
  foodS=data.val();
}



//function to update food stock and last fed time
function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods()
{
  foodStok++;
  database.ref('/').upate({
    Food:foodStock
  })
}


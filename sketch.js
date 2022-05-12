var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var gameState;
var players;
var car1, car2, cars;
var car1Img, car2Img, trackImg;
var goldCoin, goldCoinGroup;
var obstaculo1;
var obstaculo2;
var obstacleGroup;
var groupFuel;
var carsEnd = 0;
var blestCar;
function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  trackImg = loadImage('./assets/track.jpg');
  car1Img = loadImage('./assets/car1.png');
  car2Img = loadImage('./assets/car2.png');
  goldCoin = loadImage('./assets/goldCoin.png');
  obstaculo1 = loadImage('./assets/obstacle1.png');
  obstaculo2 = loadImage('./assets/obstacle2.png');
  fuelImg = loadImage('./assets/fuel.png');
  blestCar = loadImage('./assets/blast.png');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  gameState = game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);

  if(playerCount == 2) {
    game.update(1);
  }
  if(gameState == 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

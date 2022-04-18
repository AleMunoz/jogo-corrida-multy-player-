class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();

    player.getCount();

    car1 = createSprite(width/2-50, height-100);
    car1.addImage(car1Img);
    car1.scale = 0.07;

    car2 = createSprite(width/2+100, height-100);
    car2.addImage(car2Img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  update(number) {
    database.ref("/").update({
      gameState: number
    })
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on('value', function (data) {
      gameState = data.val();
    })

  }

  handleElements() {
    form.hide();
    form.titleImg.position(width/2 - 350, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Resetar o jogo");
    this.resetTitle.class('resetText');
    this.resetButton.class('resetButton');
    this.resetTitle.position (width/2 + 350, 40);
    this.resetButton.position(width/2 + 400, 100);   
  }

  play() {
    this.handleElements();
    this.handleResetButton();
    Player.getInfosPlayer();
    
    
    
    if(players != undefined) {
      image(trackImg, 0, -height * 5, width, height * 6);
      var index = 0;
      for(var plr in players) {
        var x = players[plr].positionX;
        var y = height-players[plr].positionY;
        cars[index].position.x = x;
        cars[index].position.y = y;

        
        index += 1;

        if(player.index == index) {
          fill('red');
          ellipse(x, y, 60, 60);
          camera.position.x = width/2;
          camera.position.y = y;

          console.log(y);
        }

        
        
      }

      this.handlePlayerController();

      drawSprites();
    }
  }

  handlePlayerController() {
    if(keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW)) {
      player.positionX -= 10;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW)) {
      player.positionX += 10;
      player.update();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref('/').set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  showLeaderBoard() {
    var player = Object.values(players);
  }
}

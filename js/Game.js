class Game {
  constructor() {
    this.resetButton = createButton('');
    this.resetTitle = createElement('h2');

    this.leaderTitle = createElement('h2');
    this.leader1 = createElement('h2');
    this.leader2 = createElement('h2');
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

    goldCoinGroup = new Group();
    obstacleGroup = new Group();
    groupFuel = new Group();
    this.addSprites(goldCoinGroup,10, goldCoin, 0.10);

    var groupObstaclePositions = [
      { x: width / 2 + 250, y: height - 800, image: obstaculo2 },
      { x: width / 2 - 150, y: height - 1300, image: obstaculo1 },
      { x: width / 2 + 250, y: height - 1800, image: obstaculo1 },
      { x: width / 2 - 180, y: height - 2300, image: obstaculo2 },
      { x: width / 2, y: height - 2800, image: obstaculo2 },
      { x: width / 2 - 180, y: height - 3300, image: obstaculo1 },
      { x: width / 2 + 180, y: height - 3300, image: obstaculo2 },
      { x: width / 2 + 250, y: height - 3800, image: obstaculo2 },
      { x: width / 2 - 150, y: height - 4300, image: obstaculo1 },
      { x: width / 2 + 250, y: height - 4800, image: obstaculo2 },
      { x: width / 2, y: height - 5300, image: obstaculo1 },
      { x: width / 2 - 180, y: height - 5500, image: obstaculo2 }
    ];
    this.addSprites(obstacleGroup, groupObstaclePositions.length, obstaculo1, 0.04, groupObstaclePositions);
    this.addSprites(groupFuel, 4, fuelImg, 0.02);
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
    form.titleImg.position(width/2 - 150, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.position(width - 200, 40);
    this.resetTitle.html('reset game');
    this.resetTitle.class('resetTitle');

    this.resetButton.position(width - 200, 100);
    this.resetButton.class('resetButton');

    this.leaderTitle.position(width/18, 40);
    this.leaderTitle.html('placar');
    this.leaderTitle.class('resetTitle');

    this.leader1.position(width/18, 80);
    this.leader1.html('leader1');
    this.leader1.class('leadersText');
    this.leader2.position(width/18, 130);
    this.leader2.html('leader2');
    this.leader2.class('leadersText');
  }
  
  addSprites(spriteGroup, spritesNumber, spriteImage, scale, positions = []) {
    for(var i = 0; i < spritesNumber; i = i + 1) {
      var x;
      var y;
      if(positions.length  > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width/2 + 150, width/2 - 150);
        y = random(- height*4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage(spriteImage);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
   
  }

  handleCoin(index) {
    // callback
    cars[index - 1].overlap(goldCoinGroup, function(car, coin) {
      player.score=player.score + 10;
      player.update();
      coin.remove();
    });
  }

  play() {
    this.handleElements();
    this.handleMousePressedResetButton();
    Player.getInfosPlayer();
    
    if(players != undefined) {
      image(trackImg, 0, -height * 5, width, height * 6);
      this.showLeaderboard();
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
          this.handleCoin(index);
          camera.position.x = width/2;
          if(players[plr].positionY > height) {
            camera.position.y = y;
          }
        }
      }

      this.handlePlayerController();

      drawSprites();
    }
  }

  handlePlayerController() {
    if(keyIsDown(38)) {
      player.positionY += 10;
      player.update();
    }

    if(keyIsDown(39)) {
      player.positionX += 10;
      player.update();
    }

    if(keyIsDown(37)) {
      player.positionX -= 10;
      player.update();
    }
  }

  handleMousePressedResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref('/').set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  showLeaderboard() {
    var leader1, leader2;
    var player = Object.values(players);
    if (
      (player[0].rank === 0 && player[1].rank === 0) ||
      player[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        player[0].rank +
        "&emsp;" +
        player[0].name +
        "&emsp;" +
        player[0].score;

      leader2 =
        player[1].rank +
        "&emsp;" +
        player[1].name +
        "&emsp;" +
        player[1].score;
    }

    if (player[1].rank === 1) {
      leader1 =
        player[1].rank +
        "&emsp;" +
        player[1].name +
        "&emsp;" +
        player[1].score;

      leader2 =
        player[0].rank +
        "&emsp;" +
        player[0].name +
        "&emsp;" +
        player[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
}

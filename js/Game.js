class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
  }

  play() {
    console.log(gameState);
  }

  getGameState() {
   var ref = database.ref("gameState"); 
   ref.on("value", function (data) {
    gameState = data.val();
  });
  }
  
  updateGameState(state) {
    var ref = database.ref("/");
    ref.update({
      gameState: state
    });
  }

}

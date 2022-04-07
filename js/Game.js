class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40,50);
    fonformdata.titleImg.class("gameTitleAfterEffect")
  }

  play() {
    Player.getPlayerInfo();
    this.handleElements();
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

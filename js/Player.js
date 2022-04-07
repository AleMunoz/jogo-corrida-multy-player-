class Player {
  constructor() {
    // propriedades - características
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", function (data) {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    var playerCountRef = database.ref("/");
    playerCountRef.update({
      playerCount: count
    });
  }

  addPlayer(){
    var playersRef = "players/player"+this.index;

    if (this.index == 1) {
      this.positionX = width/2 - 100;
    } else {
      this.positionX = width/2 + 100;
    }

    database.ref(playersRef).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
    });
  }


  static getPlayerInfo() {
    var playersRef = database.ref("players");
    playersRef.on ("value",function (data) {
      allPlayers = data.val();
    });
  }
}

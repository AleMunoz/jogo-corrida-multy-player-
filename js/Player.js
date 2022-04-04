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
}

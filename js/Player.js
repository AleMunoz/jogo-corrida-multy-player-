class Player {
  constructor() {
    // propriedades
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.fuel = 185;
    this.life = 185;
  }

  update() {
    // players/player1
    database.ref("/players/player"+this.index).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      fuel: this.fuel,
      life: this.life,
    });
  }
  // carsEnd -> contador de quantos carros terminaram
  getCarsEnd() {
    // criar referência
    // criar escuta 
    database.ref("/carsEnd").on("value", function (data) {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      carsEnd: rank
    });
  }

  getCount() {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on('value', function (data) {
      playerCount = data.val();
    })
  }

  updateCount(number) {
    database.ref("/").update({
      playerCount: number
    });
  }

  addPlayer() {
    var playerRef = "players/player"+ player.index;
    if(player.index == 1) {
      this.positionX = width/2 - 100;
    } else {
      this.positionX = width/2 + 100;
    }

    database.ref(playerRef).set({
      name: this.name,
      positionX: this.positionX,
      positionY:  this.positionY,
      rank: this.rank,
      score: this.score
    })
  }

  static getInfosPlayer() {
    var playersRef = database.ref("players");
    playersRef.on("value", function (data) {
      players = data.val();
    });
  }

  getDistance() {
    var distanceRef = database.ref('players/player' + this.index);

    distanceRef.on('value', (data)=> {
      var position = data.val();
      this.positionX = position.positionX;
      this.positionY = position.positionY;
    })
  }
}

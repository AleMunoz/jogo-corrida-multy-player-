class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  setPosition() {
    this.input.position(width/2-110, height/2-80);
    this.playButton.position(width/2-90, height/2-20);
    this.titleImg.position(120, 50);
    this.greeting.position(width/2-300, height/2-100);
  }

  setStyle() {
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.titleImg.class("gameTitle");
    this.greeting.class("greeting");
  }

  handlePressButton() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `Olá, ${this.input.value()} <br> espere o outro jogador entrar...`;
      this.greeting.html(message);
      playerCount += 1;
      player.index = playerCount;
      player.name = this.input.value();
      player.addPlayer();
      player.updateCount(playerCount);

      player.getDistance();
    });
  }

  display() {
    this.setPosition();
    this.setStyle();
    this.handlePressButton();
  }

}

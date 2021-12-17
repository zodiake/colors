export class StartScreen extends Phaser.Scene {
  constructor() {
    super("startScreen");
  }

  preload() {
    this.load.image("", "../images/title.png");
  }

  create() {}
}

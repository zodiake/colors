export class StartScreen extends Phaser.Scene {
  private title = "ellipse-title";
  private button = "ellipse-button";

  constructor() {
    super("startScreen");
  }

  preload() {
    this.load.image(this.title, "../images/ellipse-title.png");
    this.load.image(this.button, "../images/ellipse-button.png");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const zone = this.add.zone(width / 2, height / 2, width, height);
    const titleImage = this.add.image(0, 0, "ellipse-title");
    const buttonImage = this.add.image(0, 0, "ellipse-button");
    Phaser.Display.Align.In.Center(titleImage, zone);
    Phaser.Display.Align.In.Center(buttonImage, zone);

    buttonImage.setInteractive();
    buttonImage.on("pointDown", () => {
      this.scene.start("main");
    });
  }
}

export class StartScreen extends Phaser.Scene {
  private title = "ellipse-title";
  private button = "ellipse-button";
  private description = "123";

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
    const titleImage = this.add.image(0, 0, "ellipse-title");
    const buttonImage = this.add.image(0, 0, "ellipse-button");
    const description = this.add.text(0, 0, this.description);
    Phaser.Display.Align.In.Center(
      titleImage,
      this.add.zone(width / 2, height / 4, width, height)
    );
    Phaser.Display.Align.In.Center(
      buttonImage,
      this.add.zone(width / 2, height / 2, width, height)
    );
    Phaser.Display.Align.In.Center(
      description,
      this.add.zone(width / 2, height - height / 3, width, height)
    );

    buttonImage.setInteractive();
    buttonImage.on("pointDown", () => {
      this.scene.start("main");
    });
  }
}

export class StartScreen extends Phaser.Scene {
  private title = "ellipse-title";
  private button = "ellipse-button";
  private description =
    "根据左上角提示颜料桶颜色，用手自拖动下方两种颜色颜料桶，导入上方崆峒，知道玉提示颜色相同";

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
    buttonImage.on("pointerdown", () => {
      this.scene.start("ellipse-main");
    });
  }
}

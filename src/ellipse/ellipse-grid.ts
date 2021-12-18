import { config } from "./config";
import { Ellipse } from "./ellipse";

export class EllipseGrid {
  public firstClick = false;
  public secondClick = false;
  public children: Phaser.GameObjects.GameObject[];
  offsetX = 128 / 3;
  offsetY = 128;
  targetAngle = 70;

  constructor(private scene: Phaser.Scene, public targetEllipse: Ellipse) {}

  create() {
    const cellHeight = this.scene.scale.height / 6;
    this.children = this.filledEllipse();

    Phaser.Actions.GridAlign(this.children, {
      width: 6,
      height: 2,
      cellWidth: this.scene.scale.width / 8,
      cellHeight: this.scene.scale.height / 6,
      position: Phaser.Display.Align.CENTER,
      x: this.scene.scale.width / 8,
      y: cellHeight * 3,
    });
  }

  filledEllipse(): Phaser.GameObjects.GameObject[] {
    const colors = ["red", "purple"];
    return colors.map((color) => {
      const sprite = this.scene.add.sprite(
        0,
        0,
        config.atlasKey,
        `${color}-filled.png`
      );
      sprite.on("pointerdown", () => this.pointerDown(color, sprite));
      return sprite;
    });
  }

  pointerDown(color: string, sprite: Phaser.GameObjects.Sprite) {
    console.log(color);
    // ellipse can be clicked
    if (this.firstClick == false && this.secondClick == false) {
      // prevent click when ellipse is tweening
      this.firstClick = true;
      this.secondClick = true;
      // after tween finish enable second click
      this.playTween(
        sprite,
        `${color}-bottom`,
        () => (this.secondClick = false)
      );
    }
    if (this.firstClick == true && this.secondClick == false) {
      this.secondClick = true;
      this.playTween(sprite, `${color}-top`);
    }
  }

  playTween(
    ellipse: Phaser.GameObjects.Sprite,
    color: string,
    onComplete: () => void = () => null
  ) {
    const [originX, originY] = [ellipse.x, ellipse.y];
    const [targetX, targetY] = [
      this.targetEllipse.getSource().x,
      this.targetEllipse.getSource().y,
    ];
    let tx = 0;
    let tag = 0;
    if (originX < targetX) {
      tx = targetX - this.offsetX;
      tag = this.targetAngle;
    } else {
      tx = targetX + this.offsetX;
      tag = -this.targetAngle;
    }
    const timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: ellipse,
      x: { value: tx, duration: 1500, ease: "Power2" },
      y: {
        value: targetY - this.offsetY,
        duration: 1500,
        ease: "Power2",
      },
      angle: { value: tag, duration: 1500 * 1.2, ease: "Power2" },
      ease: "Power2",
      onComplete: () => {
        this.targetEllipse.playHalf(color);
      },
    });

    timeline.add({
      targets: ellipse,
      x: originX,
      y: originY,
      angle: 0,
      delay: 2000,
      onComplete,
    });

    timeline.play();
  }
}

import { config } from "./config";
import { Ellipse } from "./ellipse";
import { EllipseGrid } from "./ellipse-grid";

export class FilledEllipse {
  sprite: Phaser.GameObjects.Sprite;
  offsetX = 128 / 3;
  offsetY = 128;
  targetAngle = 70;

  constructor(
    private scene: Phaser.Scene,
    public color: string,
    private grid: EllipseGrid,
    private target: Ellipse
  ) {}

  create({ x, y }) {
    this.sprite = this.scene.add.sprite(
      x,
      y,
      config.atlasKey,
      `${this.color}-filled.png`
    );
    this.sprite.setInteractive();
    this.sprite.on("pointerdown", () => this.onPress());
  }

  onPress() {
    const [originX, originY] = [this.sprite.x, this.sprite.y];
    const [targetX, targetY] = [
      this.target.getSource().x,
      this.target.getSource().y,
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
      targets: this.sprite,
      x: { value: tx, duration: 1500, ease: "Power2" },
      y: { value: targetY - this.offsetY, duration: 1500, ease: "Power2" },
      angle: { value: tag, duration: 1500 * 1.2, ease: "Power2" },
      ease: "Power2",
      onComplete: () => {
        if (!this.grid.firstClick && !this.grid.secondClick) {
          this.grid.firstClick = this;
          this.target.playFillBottomHalf(this.color);
        } else if (this.grid.firstClick && !this.grid.secondClick) {
          this.grid.firstClick = this;
          this.target.playFillTopHalf(this.color);
        } else if (this.grid.firstClick && this.grid.secondClick) {
          this.target.changeColor(
            this.grid.firstClick.color,
            this.grid.secondClick.color
          );
        }
      },
    });

    timeline.add({
      targets: this.sprite,
      x: originX,
      y: originY,
      angle: 0,
      delay: 2000,
    });
    timeline.play();
  }
}

import { config } from "./config";
import { Ellipse } from "./ellipse";

export class EllipseGrid {
  public firstClick = false;
  public secondClick = false;
  public firstColor: string;
  public secondColor: string;
  public children: Phaser.GameObjects.GameObject[];
  timeEvent: Phaser.Time.TimerEvent;
  columns = 6;
  rows = 2;
  offsetX = 128 / 3;
  offsetY = 128;
  targetAngle = 70;

  constructor(private scene: Phaser.Scene, public targetEllipse: Ellipse) {
    const cellHeight = this.scene.scale.height / 6;
    const cellWidth = this.scene.scale.width / (this.columns + 2);
    this.children = this.filledEllipse();

    Phaser.Actions.GridAlign(this.children, {
      width: this.columns,
      height: this.rows,
      cellWidth: cellWidth,
      cellHeight,
      position: Phaser.Display.Align.CENTER,
      x: cellWidth + cellWidth / 2,
      y: cellHeight * 3,
    });
  }

  filledEllipse(): Phaser.GameObjects.GameObject[] {
    let colors = ["red", "purple", "red", "purple", "red", "purple"];
    colors = [...colors, ...colors];
    return colors.map((color) => {
      const sprite = this.scene.add.sprite(
        0,
        0,
        config.atlasKey,
        `${color}-filled.png`
      );
      sprite.on("pointerdown", () =>
        this.pointerDown(color, sprite, this.timeEvent)
      );
      return sprite;
    });
  }

  setTimeEvent(timeEvent: Phaser.Time.TimerEvent) {
    this.timeEvent = timeEvent;
  }

  pointerDown(
    color: string,
    sprite: Phaser.GameObjects.Sprite,
    timeEvent: Phaser.Time.TimerEvent
  ) {
    // ellipse can be clicked
    if (this.firstClick == false && this.secondClick == false) {
      // prevent click when ellipse is tweening
      this.firstClick = true;
      this.secondClick = true;
      // after tween finish enable second click
      this.playTween(sprite, `${color}-bottom`, () => {
        this.secondClick = false;
        this.firstColor = color;
      });
    }
    if (this.firstClick == true && this.secondClick == false) {
      this.secondClick = true;
      this.playTween(sprite, `${color}-top`, () => {
        this.secondColor = color;
        const resultColor = this.checkColor(this.firstColor, this.secondColor);
        if (resultColor) {
          this.targetEllipse.playBoth(resultColor);
          timeEvent.remove();
        } else {
          this.targetEllipse.restore();
          this.firstClick = false;
          this.secondClick = false;
          this.firstColor = null;
          this.secondColor = null;
        }
      });
    }
  }

  checkColor(first: string, second: string): string | null {
    const mix = [["red", "purple", "blue"]];
    const filter = mix
      .filter(([f, s, r]) => {
        if (f === first && s === second) {
          return true;
        } else {
          return false;
        }
      })
      .map(([f, s, r]) => r);
    if (filter.length > 0) {
      return filter[0];
    } else {
      return null;
    }
  }

  playTween(
    ellipse: Phaser.GameObjects.Sprite,
    color: string,
    onComplete: () => void
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

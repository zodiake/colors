import { TargetEllipse } from "../target/targetEllipse";
import { EllipseGroup } from "./ellipseGroup";

export interface EllipseConfig {
  color: string;
  angle: number;
}

export class EllipseSingle extends Phaser.GameObjects.Sprite {
  constructor(
    public scene: Phaser.Scene,
    public group: EllipseGroup,
    public target: TargetEllipse,
    public countDownTime: Phaser.Time.TimerEvent,
    public config: EllipseConfig
  ) {
    super(scene, 0, 0, "atals", `${config.color}-filled.png`);

    this.on("pointerdown", () => {
      this.pointerdown();
    });
  }

  pointerdown() {
    if (this.group.firstColor == null && this.group.secondColor == null) {
      this.playMove(() => {
        this.group.firstColor = this;
      });
      this.target.firstFill(this.config.color);
    }
    if (this.group.firstColor != null && this.group.secondColor == null) {
      this.playMove(() => {
        this.group.secondColor = this;
      });
      this.target.secondFill(this.config.color);

      const mixColor = this.target.checkColor();
      if (mixColor == null) {
        this.target.restore();
        this.group.firstColor = null;
        this.group.secondColor = null;
      } else {
        this.countDownTime.remove(true);
      }
    }
  }

  playMove(onComplete: () => void) {
    const [originX, originY] = [this.x, this.y];
    const [targetX, targetY] = [this.target.x, this.target.y];
    const timeline = this.scene.tweens.createTimeline();

    let tx = 0;
    let tag = 0;
    if (originX < targetX) {
      tx = targetX - this.width / 2;
      tag = this.config.angle;
    } else {
      tx = targetX + this.width / 2;
      tag = -this.config.angle;
    }
    timeline.add({
      targets: this,
      x: { value: tx, duration: 1500, ease: "Power2" },
      y: {
        value: targetY - this.height / 3,
        duration: 1500,
        ease: "Power2",
      },
      angle: { value: tag, duration: 1500 * 1.2, ease: "Power2" },
      ease: "Power2",
    });

    timeline.add({
      targets: this,
      x: originX,
      y: originY,
      angle: 0,
      onComplete,
    });

    timeline.play();
  }
}

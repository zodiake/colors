import { TargetEllipse } from "../target/targetEllipse";
import { EllipseGroup } from "./ellipseGroup";

export interface EllipseConfig {
  color: string;
  angle: number;
}

export class EllipseSingle extends Phaser.GameObjects.Sprite {
  private duration = 1500;

  constructor(
    public scene: Phaser.Scene,
    public group: EllipseGroup,
    public target: TargetEllipse,
    public countDownTime: Phaser.Time.TimerEvent,
    public config: EllipseConfig
  ) {
    super(scene, 0, 0, "atlas", `${config.color}-filled.png`);

    this.on("pointerdown", () => {
      if (group.clickable) {
        group.clickable = false;
        this.pointerdown();
      }
    });
  }

  pointerdown() {
    if (this.group.firstColor == null) {
      this.playMove();
      this.group.firstColor = this;
    } else {
      this.playMove();
    }
  }

  playMove() {
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
      x: { value: tx, duration: this.duration, ease: "Power2" },
      y: {
        value: targetY - this.height / 3,
        duration: 1500,
        ease: "Power2",
      },
      angle: { value: tag, duration: this.duration * 1.2, ease: "Power2" },
      ease: "Power2",
      onComplete: () => {
        this.target.playFill(this.config.color);
        this.group.secondColor = this;
      },
    });
    timeline.add({
      delay: 1000,
      targets: this,
      x: { value: originX, duration: this.duration, ease: "Power2" },
      y: {
        value: originY,
        duration: 1500,
        ease: "Power2",
      },
      angle: { value: 0, duration: this.duration, ease: "Power2" },
      ease: "Power2",
      onComplete: () => {
        this.group.clickable = true;
      },
    });

    timeline.play();
  }
}

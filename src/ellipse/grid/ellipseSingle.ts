import { TargetEllipse } from "../target/targetEllipse";

export interface EllipseConfig {
  color: string;
  angle: number;
  target: TargetEllipse;
  countDownTime: Phaser.Time.TimerEvent;
}

export class EllipseSingle extends Phaser.GameObjects.Sprite {
  constructor(public scene: Phaser.Scene, public config: EllipseConfig) {
    super(scene, 0, 0, "atals", `${config.color}-filled.png`);

    this.on("pointerdown", () => this.playMove());
  }

  playMove() {
    const [originX, originY] = [this.x, this.y];
    const [targetX, targetY] = [this.config.target.x, this.config.target.y];
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
    });

    timeline.play();
  }
}

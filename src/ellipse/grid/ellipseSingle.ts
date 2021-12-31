import { MainSene } from "../main-sceen";

export interface EllipseConfig {
  color: string;
  angle: number;
}

export class EllipseSingle extends Phaser.GameObjects.Sprite {
  private duration = 1500;

  constructor(public scene: MainSene, public config: EllipseConfig) {
    super(scene, 0, 0, "atlas", `${config.color}-filled.png`);

    this.on("pointerdown", () => {
      if (scene.group.clickable) {
        scene.group.clickable = false;
        this.pointerdown();
      }
    });
  }

  pointerdown() {
    if (this.scene.firstColor == null) {
      this.playMove();
      this.scene.firstColor = this.config.color;
    } else {
      this.playMove();
    }
  }

  moveToTarget(x: number, y: number) {}

  playMove() {
    const [originX, originY] = [this.x, this.y];
    const [targetX, targetY] = [
      this.scene.headerEllipse.x,
      this.scene.headerEllipse.y,
    ];
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
        if (this.scene.firstColor == null) {
          this.scene.firstColor = this.config.color;
        } else if (this.scene.secondColor == null) {
          this.scene.secondColor = this.config.color;
        } else {
          console.error("error should not happen");
        }
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
        this.scene.group.clickable = true;
      },
    });

    timeline.play();
  }
}

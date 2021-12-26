import { HalfEllipse } from "./halfEllipse";

export interface TargetEllipseConfig {
  rules: string[][];
}

export class TargetEllipse extends Phaser.GameObjects.Container {
  rules: string[][];
  top: HalfEllipse;
  bottom: HalfEllipse;
  firstColor: string = null;
  secondColor: string = null;

  constructor(scene: Phaser.Scene, config: TargetEllipseConfig) {
    super(scene);
    const width = scene.scale.width;
    const height = scene.scale.height;
    this.rules = [
      ...config.rules.map(([f, s, m]) => [s, f, m]),
      ...config.rules,
    ];
    this.top = new HalfEllipse(scene, {
      orient: "top",
      colors: this.rules.map((i) => i[0]),
      key: "atlas",
    });
    this.bottom = new HalfEllipse(scene, {
      orient: "bottom",
      colors: this.rules.map((i) => i[1]),
      key: "atlas",
    });

    this.add(this.top);
    this.add(this.bottom);

    Phaser.Display.Align.In.Center(
      this,
      scene.add.zone(width / 2, height / 4, width, height)
    );
    scene.add.existing(this);
  }

  playFill(color: string) {
    if (this.firstColor == null && this.secondColor == null) {
      this.firstColor = color;
      this.bottom.play(`${color}-bottom`);
      return;
    }
    if (this.firstColor != null && this.secondColor == null) {
      this.secondColor = color;
      this.top.play(`${color}-top`);
      const mixedColor = this.checkColor();
      console.log(mixedColor);
      if (mixedColor != null) {
        this.bottom.playFull(mixedColor, "bottom");
        this.top.playFull(mixedColor, "top");
      } else {
        this.restore();
      }
    }
  }

  restore() {
    this.bottom.restore();
    this.top.restore();
  }

  checkColor(): string | null {
    const result = [];
    for (const [f, s, m] of this.rules) {
      if (f === this.firstColor && s === this.secondColor) {
        result.push(m);
      }
    }
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }
}

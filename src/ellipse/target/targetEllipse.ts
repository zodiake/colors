import { HalfEllipse } from "./halfEllipse";

export interface TargetEllipseConfig {
  rules: string[][];
}

export class TargetEllipse extends Phaser.GameObjects.Container {
  rules: string[][];
  top: HalfEllipse;
  bottom: HalfEllipse;
  firstColor: string;
  secondColor: string;

  constructor(scene: Phaser.Scene, config: TargetEllipseConfig) {
    super(scene);
    this.rules = [
      ...config.rules.map(([f, s, m]) => [s, f, m]),
      ...config.rules,
    ];
    this.top = new HalfEllipse(scene, {
      orient: "bottom",
      colors: this.rules.map((i) => i[0]),
      key: "atlas",
    });
    this.bottom = new HalfEllipse(scene, {
      orient: "top",
      colors: this.rules.map((i) => i[1]),
      key: "atlas",
    });
    const width = scene.scale.width;
    const height = scene.scale.height;

    this.add(this.top);
    this.add(this.bottom);

    Phaser.Display.Align.In.Center(
      this,
      scene.add.zone(width / 2, height / 4, width, height)
    );
    scene.add.existing(this);
  }

  firstFill(color: string) {
    this.bottom.playHalf(color);
    this.firstColor = color;
  }

  secondFill(color: string) {
    this.top.playHalf(color);
    this.secondColor = color;
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

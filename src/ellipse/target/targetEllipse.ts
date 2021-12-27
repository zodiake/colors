import { EllipseGroup } from "../grid/ellipseGroup";
import { HalfEllipse } from "./halfEllipse";

export class TargetEllipse extends Phaser.GameObjects.Container {
  rules: string[][];
  top: HalfEllipse;
  bottom: HalfEllipse;

  constructor(
    scene: Phaser.Scene,
    private group: EllipseGroup,
    rules: string[][]
  ) {
    super(scene);
    const width = scene.scale.width;
    const height = scene.scale.height;
    this.rules = [...rules.map(([f, s, m]) => [s, f, m]), ...rules];
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
    if (this.group.firstColor == null && this.group.secondColor == null) {
      this.bottom.play(`${color}-bottom`);
    } else {
      this.top.play(`${color}-top`);
    }
  }

  restore() {
    this.bottom.restore();
    this.top.restore();
  }

  update(): void {}

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

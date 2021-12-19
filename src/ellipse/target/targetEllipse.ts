import { HalfEllipse } from "./halfEllipse";

export class TargetEllipse extends Phaser.GameObjects.Container {
  mixRule = [["red", "purple", "blue"]];
  top: HalfEllipse;
  bottom: HalfEllipse;
  firstColor: string;
  secondColor: string;

  constructor(scene: Phaser.Scene) {
    super(scene);
    const top = new HalfEllipse(scene, {
      orient: "bottom",
      colors: ["red"],
      key: "atlas",
    });
    const bottom = new HalfEllipse(scene, {
      orient: "top",
      colors: ["purple"],
      key: "atlas",
    });
    const width = scene.scale.width;
    const height = scene.scale.height;

    this.add(top);
    this.add(bottom);

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
    const mixColor = this.checkColor();
    if (mixColor != null) {
      this.bottom.playFill(mixColor);
      this.bottom.playFill(mixColor);
    }
  }

  checkColor(): string | null {
    const result = [];
    for (const [f, s, m] of this.mixRule) {
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

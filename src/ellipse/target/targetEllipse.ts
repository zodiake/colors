import { EllipseGroup } from "../grid/ellipseGroup";
import { HalfEllipse } from "./halfEllipse";

export class TargetEllipse extends Phaser.GameObjects.Container {
  top: HalfEllipse;
  bottom: HalfEllipse;

  constructor(
    scene: Phaser.Scene,
    private group: EllipseGroup,
    rules: Array<[string, string, string]>
  ) {
    super(scene);
    const width = scene.scale.width;
    const height = scene.scale.height;

    this.top = new HalfEllipse(scene, {
      orient: "top",
      colors: rules.map((i) => i[0]),
      key: "atlas",
    });
    this.bottom = new HalfEllipse(scene, {
      orient: "bottom",
      colors: rules.map((i) => i[0]),
      key: "atlas",
    });

    this.add(this.top);
    this.add(this.bottom);

    this.y = height / 4;
    this.x = width / 2;
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
}

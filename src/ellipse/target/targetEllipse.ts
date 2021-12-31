import { MainSene } from "../main-sceen";
import { HalfEllipse } from "./halfEllipse";

export class TargetEllipse extends Phaser.GameObjects.Container {
  top: HalfEllipse;
  bottom: HalfEllipse;

  constructor(public scene: MainSene) {
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

  bottomFill(color: string) {
    this.bottom.play(`${color}-bottom`);
  }

  topFill(color: string) {
    this.top.play(`${color}-top`);
  }

  restore() {
    this.bottom.restore();
    this.top.restore();
  }

  update(first: string, second: string): void {}
}

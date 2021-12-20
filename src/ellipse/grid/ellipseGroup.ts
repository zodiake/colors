import { TargetEllipse } from "../target/targetEllipse";
import { EllipseSingle } from "./ellipseSingle";

export interface EllipseGroupConfig {
  colors: string[];
  columns: number;
  rows: number;
}

export class EllipseGroup {
  firstColor: EllipseSingle;
  secondColor: EllipseSingle;
  constructor(
    public scene: Phaser.Scene,
    public target: TargetEllipse,
    public timeEvent: Phaser.Time.TimerEvent,
    config: EllipseGroupConfig
  ) {
    const children = config.colors.map((color) => {
      return scene.add.sprite(0, 0, "atlas", `${color}-filled.png`);
    });
    const cellHeight = this.scene.scale.height / 6;
    const cellWidth = this.scene.scale.width / (config.columns + 2);

    Phaser.Actions.GridAlign(children, {
      width: config.columns,
      height: config.rows,
      cellWidth: cellWidth,
      cellHeight,
      position: Phaser.Display.Align.CENTER,
      x: cellWidth + cellWidth / 2,
      y: cellHeight * 3,
    });
  }
}

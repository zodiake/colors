import { TargetEllipse } from "../target/targetEllipse";
import { EllipseSingle } from "./ellipseSingle";

export interface EllipseGroupConfig {
  colors: string[];
  columns: number;
  rows: number;
  target: TargetEllipse;
  countDownTime: Phaser.Time.TimerEvent;
}

export class EllipseGroup extends Phaser.GameObjects.Group {
  constructor(public scene: Phaser.Scene, config: EllipseGroupConfig) {
    super(scene);
    const children = config.colors.map(
      (color) =>
        new EllipseSingle(scene, {
          color,
          target: config.target,
          angle: 70,
          countDownTime: config.countDownTime,
        })
    );
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

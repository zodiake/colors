import { TargetEllipse } from "../target/targetEllipse";
import { EllipseSingle } from "./ellipseSingle";

export interface EllipseGroupConfig {
  colors: string[];
  columns: number;
  rows: number;
}

export class EllipseGroup extends Phaser.GameObjects.Group {
  private canBeClicked = true;

  firstColor: EllipseSingle;
  secondColor: EllipseSingle;

  constructor(
    public scene: Phaser.Scene,
    public target: TargetEllipse,
    public timeEvent: Phaser.Time.TimerEvent,
    config: EllipseGroupConfig
  ) {
    super(scene);
    config.colors
      .map((color) => {
        return new EllipseSingle(this.scene, this, target, timeEvent, {
          color,
          angle: 70,
        });
      })
      .forEach((i) => this.add(i, true));

    const cellHeight = this.scene.scale.height / 6;
    const cellWidth = this.scene.scale.width / (config.columns + 2);

    Phaser.Actions.GridAlign(this.children.getArray(), {
      width: config.columns,
      height: config.rows,
      cellWidth: cellWidth,
      cellHeight,
      position: Phaser.Display.Align.CENTER,
      x: cellWidth + cellWidth / 2,
      y: cellHeight * 3,
    });
  }

  clickable() {
    return this.canBeClicked;
  }

  disableClick() {
    this.canBeClicked = false;
  }

  enableClick() {
    this.canBeClicked = true;
  }
}

import { GameState, MainSene } from "../main-sceen";
import { TargetEllipse } from "../target/targetEllipse";
import { EllipseSingle } from "./ellipseSingle";

export interface EllipseGroupConfig {
  colors: string[];
  columns: number;
  rows: number;
  state: GameState;
}

export class EllipseGroup extends Phaser.GameObjects.Group {
  public clickable = true;
  state: GameState;

  constructor(public scene: MainSene, config: EllipseGroupConfig) {
    super(scene);
    this.state = config.state;

    config.colors
      .map((color) => {
        return new EllipseSingle(this.scene, {
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

  update(firstColor: string, secondColor: string) {}
}

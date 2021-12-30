import { GameState } from "../main-sceen";
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
  firstColor: EllipseSingle;
  secondColor: EllipseSingle;
  target: TargetEllipse;
  rules: Array<[string, string, string]>;
  ruleMap: Map<string, string>;
  state: GameState;

  constructor(public scene: Phaser.Scene, config: EllipseGroupConfig) {
    super(scene);
    this.rules = [["red", "purple", "blue"]];
    const entries: Array<[string, string]> = [
      ...this.rules.map(([f, s, m]) => [s, f, m]),
      ...this.rules,
    ].map(([f, s, m]) => [f + "-" + s, m]);
    this.ruleMap = new Map(entries);
    this.state = config.state;

    this.target = new TargetEllipse(scene, this, this.rules);

    config.colors
      .map((color) => {
        return new EllipseSingle(this.scene, this, this.target, {
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

  update() {
    if (this.firstColor != null && this.secondColor != null) {
      const m = this.ruleMap.get(
        `${this.firstColor.config.color}-${this.secondColor.config.color}`
      );
      if (m == null) {
        this.target.restore();
        this.clickable = true;
        this.firstColor = null;
        this.secondColor = null;
      } else {
        //this.countDownTime.pause = true;
        this.state = GameState.success;
      }
    }
  }
}

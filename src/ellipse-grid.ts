import { config } from "./config";
import { Ellipse } from "./ellipse";
import { FilledEllipse } from "./filledEllipse";

export class EllipseGrid {
  constructor(private scene: Phaser.Scene, public targetEllipse: Ellipse) {}
  public firstClick: FilledEllipse;
  public secondClick: FilledEllipse;
  public canBeClicked: boolean;

  create() {
    const rows = config.rows;
    const columns = config.columns;
    const cellWidth = this.scene.scale.width / 8;
    const cellHeight = this.scene.scale.height / 6;
    const startX = this.scene.scale.width / 2 - 3 * cellWidth;
    const startY = cellHeight * 3;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const color = config.colors[row][column];
        const ellipse = new FilledEllipse(
          this.scene,
          color,
          this,
          this.targetEllipse
        );
        ellipse.create({
          x: startX + column * cellWidth + 0.5 * cellWidth,
          y: startY + row * cellHeight,
        });
      }
    }
  }
}

import { Ellipse } from "./ellipse";
import { EllipseGrid } from "./ellipse-grid";

export class MainSene extends Phaser.Scene {
  headEllipse: Ellipse;
  purpleEllipse: Ellipse;

  constructor() {
    super("main");
  }

  preload() {
    const jsonFile = `../images/color.json`;
    this.load.multiatlas("atlas", jsonFile, "images");
  }

  create() {
    this.headEllipse = new Ellipse(this);
    this.headEllipse.create();
    const grid = new EllipseGrid(this, this.headEllipse);
    grid.create();
  }
}

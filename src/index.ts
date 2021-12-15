import * as Phaser from "phaser";
import { Ellipse } from "./ellipse";
import { config } from "./config";
import { EllipseGrid } from "./ellipse-grid";

class MySene extends Phaser.Scene {
  headEllipse: Ellipse;
  purpleEllipse: Ellipse;

  preload() {
    const jsonFile = `${config.atlasFolder}/color.json`;
    this.load.multiatlas("atlas", jsonFile, "assets");
  }

  create() {
    this.headEllipse = new Ellipse(this);
    this.headEllipse.create();
    const grid = new EllipseGrid(this, this.headEllipse);
    grid.create();
  }
}

const conf = {
  type: Phaser.AUTO,
  backgroundColor: "#2dab2d",
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "phaser-example",
    width: "100%",
    height: "100%",
  },
  scene: MySene,
};

const game = new Phaser.Game(conf);

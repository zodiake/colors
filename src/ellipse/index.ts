import * as Phaser from "phaser";
import { MainSene } from "./main-sceen";
import { StartScreen } from "./start-screen";

const conf = {
  type: Phaser.AUTO,
  backgroundColor: "#2dab2d",
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "phaser-example",
    width: "100%",
    height: "100%",
  },
  scene: [MainSene],
};

const game = new Phaser.Game(conf);

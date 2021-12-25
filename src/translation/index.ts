import * as Phaser from "phaser";
import { Main } from "./main";

const conf = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "phaser-example",
    width: "100%",
    height: "100%",
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
      debugBodyColor: 0xffffff,
      gravity: {
        y: 0.1,
      },
    },
  },
  scene: [Main],
};

const game = new Phaser.Game(conf);

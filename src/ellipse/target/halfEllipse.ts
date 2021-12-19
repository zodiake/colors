import { ImageKeys } from "../config";

export interface HalfEllipseConfig {
  orient: "bottom" | "top";
  colors: string[];
  key: string;
}

export class HalfEllipse extends Phaser.GameObjects.Sprite {
  position: "bottom" | "top";

  constructor(scene: Phaser.Scene, config: HalfEllipseConfig) {
    const colors = config.colors;
    if (config.orient == "bottom") {
      super(scene, 0, 0, "atlas", ImageKeys.BOTTOM_HALD_EMPTY_ELLIPSE);
    } else {
      super(scene, 0, 0, "atlas", ImageKeys.TOP_HALF_EMPTY_ELLIPSE);
    }
    this.position = config.orient;
    this.addFrame(colors, config.key, config.orient);
  }

  addFrame(colors: string[], key: string, orient: string) {
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      const prefix = `${colors}-${orient}-`;
      const frameNames = this.scene.anims.generateFrameNames(key, {
        start: 1,
        end: 6,
        prefix,
        suffix: ".png",
      });
      this.scene.anims.create({
        key: prefix,
        frames: frameNames,
        frameRate: 10,
        repeat: 0,
      });
      this.scene.anims.create({
        key: `${color}-${orient}-half`,
        frames: [{ key: `${color}-${orient}-half` }],
        repeat: 0,
      });
    }
  }

  playHalf(color: string) {
    this.play(`${color}-half`);
  }

  playFill(color: string) {
    this.play(`${color}-filled`);
  }

  restore() {
    this.play(`empty-${this.position}-half`);
  }
}

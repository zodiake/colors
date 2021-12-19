import * as Phaser from "phaser";
import { config } from "./config";

export enum HalfEnum {
  top = "top",
  bottom = "bottom",
}

export class Ellipse {
  topSprit: Phaser.GameObjects.Sprite;
  bottomSprit: Phaser.GameObjects.Sprite;
  container: Phaser.GameObjects.Container;

  constructor(private scene: Phaser.Scene) {
    this.container = scene.add.container(0, 0);
    const width = scene.scale.width;
    const height = scene.scale.height;

    this.topSprit = scene.add.sprite(0, 0, config.atlasKey, `empty-top.png`);
    this.bottomSprit = scene.add.sprite(
      0,
      0,
      config.atlasKey,
      `empty-bottom.png`
    );
    this.container.add(this.topSprit);
    this.container.add(this.bottomSprit);

    Phaser.Display.Align.In.Center(
      this.container,
      scene.add.zone(width / 2, height / 4, width, height)
    );
    this.addAnimation();
  }

  getSource(): Phaser.GameObjects.Sprite {
    return this.topSprit;
  }

  private addAnimation() {
    let colors = config.colors.flatMap((i) => i);
    const set = new Set([...colors]);
    colors = [...set];

    for (let i = 0; i < colors.length; i++) {
      const topFrameName = this.scene.anims.generateFrameNames(
        config.atlasKey,
        {
          start: 1,
          end: 6,
          prefix: `${colors[i]}-top-`,
          suffix: ".png",
        }
      );
      this.scene.anims.create({
        key: `${colors[i]}-top-half`,
        frames: topFrameName,
        frameRate: 10,
        repeat: 0,
      });

      const bottomFrameName = this.scene.anims.generateFrameNames(
        config.atlasKey,
        {
          start: 1,
          end: 6,
          prefix: `${colors[i]}-bottom-`,
          suffix: ".png",
        }
      );
      this.scene.anims.create({
        key: `${colors[i]}-bottom-half`,
        frames: bottomFrameName,
        frameRate: 10,
        repeat: 0,
      });

      this.scene.anims.create({
        key: `blue-bottom-half`,
        frames: [{ key: "blue-bottom-half" }],
        repeat: 0,
      });

      this.scene.anims.create({
        key: `blue-top-half`,
        frames: [{ key: "blue-top-half" }],
        repeat: 0,
      });
    }
  }

  playHalf(color: string) {
    const split = color.split("-");
    if (split[1] == "bottom") {
      this.bottomSprit.anims.play(`${color}-half`);
    } else {
      this.topSprit.anims.play(`${color}-half`);
    }
  }

  playBoth(color: string) {
    this.bottomSprit.anims.play(`${color}-bottom-half`);
    this.topSprit.anims.play(`${color}-top-half`);
  }

  playMix(color: string) {
    this.bottomSprit.anims.play(`${color}-half`);
    this.topSprit.anims.play(`${color}-half`);
  }

  restore() {
    this.bottomSprit.anims.play(`empty-bottom-half`);
    this.topSprit.anims.play(`empty-top-half`);
  }
}

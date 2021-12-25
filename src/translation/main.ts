import { ImageKeys } from "../common/config";

export class Main extends Phaser.Scene {
  group: Phaser.Physics.Arcade.Group;
  bar: Phaser.Physics.Matter.Image;
  rightClicked = false;
  constructor() {
    super("main");
  }

  preload() {
    this.load.image(ImageKeys.FAIL_IMAGE, "/images/ellipse-title.png");
    this.load.image(ImageKeys.HOME_BUTTON, "/images/SYMB_REPLAY.png");
    this.load.image(ImageKeys.LEFT_ARROW, "/images/left.png");
    this.load.image(ImageKeys.RIGHT_ARROW, "/images/right.png");
  }

  create() {
    const geo = this.matter.add.image(500, 500, ImageKeys.HOME_BUTTON);
    geo.setMass(20);

    this.bar = this.matter.add.image(500, 600, ImageKeys.FAIL_IMAGE, 0, {
      isStatic: true,
    });
    this.bar.setFriction(1, 1, Infinity);
    const leftArrow = this.add.image(300, 200, ImageKeys.LEFT_ARROW);
    const rightArrow = this.add.image(1000, 200, ImageKeys.RIGHT_ARROW);

    leftArrow.setInteractive();
    rightArrow.setInteractive();
    leftArrow.on("pointerdown", () => {});
    leftArrow.on("pointerup", () => {
      console.log(456);
    });
    rightArrow.on("pointerdown", () => {
      this.rightClicked = true;
    });
    rightArrow.on("pointerup", () => {
      this.rightClicked = false;
    });
  }

  update(time: number, delta: number): void {
    if (this.rightClicked) {
      this.bar.x += 3;
      this.bar.setVelocityX(3);
    } else {
      this.bar.x += 0;
      this.bar.setVelocityX(0);
    }
  }
}

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
    const width = this.scale.width;
    const height = this.scale.height;

    this.bar = this.matter.add.image(500, 600, ImageKeys.FAIL_IMAGE, 0, {
      isStatic: true,
      collisionFilter: {
        category: 0x0002,
      },
    });
    this.bar.setFriction(1, 1, Infinity);

    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {});
    this.createGeo();
    this.setupArrow();
    this.setupPanel(width, height);
  }

  createGeo(i = 0) {
    if (i == 1) {
      return;
    }
    const geo = this.matter.add.image(500, 200, ImageKeys.HOME_BUTTON, 0, {
      gravityScale: new Phaser.Math.Vector2(0, 3.2),
      collisionFilter: {
        mask: 0x0002,
        category: 0x0002,
      },
    });
    this.time.delayedCall(2000, this.createGeo, [i + 1], this);
  }

  setupPanel(width: number, height: number) {
    const leftPanel = this.matter.add.rectangle(150, height - 150, 300, 300, {
      isStatic: true,
      collisionFilter: {
        mask: 0x0001,
      },
    });
    const rightPanel = this.matter.add.rectangle(
      width - 150,
      height - 150,
      300,
      300,
      {
        isStatic: true,
        collisionFilter: {
          mask: 0x0001,
        },
      }
    );
    rightPanel.bounds;

    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      console.log(bodyA.gameObject.texture.key);
      console.log(bodyB.gameObject.texture.key);
    });
  }

  setupArrow() {
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

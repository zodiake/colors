import { ImageEnum } from "../ellipse/config";

export class BaseResultUI<M extends Phaser.Scene> {
  constructor(public mainScene: M, public descImage: string) {}

  init() {
    const width = this.mainScene.scale.width;
    const height = this.mainScene.scale.height;
    const image = this.mainScene.add.image(0, 0, this.descImage);
    const restart = this.mainScene.add.image(0, 0, ImageEnum.RESTART_BUTTON);
    const home = this.mainScene.add.image(0, 0, ImageEnum.HOME_BUTTON);
    const layer = this.mainScene.add.layer();
    [image, restart, home].forEach((i) => layer.add(i));

    Phaser.Display.Align.In.Center(
      image,
      this.mainScene.add.zone(width / 2, height / 2, width, height)
    );

    home.setX(image.x - image.width / 2 + home.width / 2);
    home.setY(image.y + home.width * 3);

    restart.setX(image.x + image.width / 2 - restart.width / 2);
    restart.setY(image.y + home.width * 3);
    home.setInteractive().on("pointerdown", () => this.gotoMainScene());
    restart.setInteractive().on("pointerdown", () => this.gotoStartScene());
  }

  gotoMainScene() {
    this.mainScene.scene.restart();
  }

  gotoStartScene() {
    this.mainScene.scene.start("startScreen");
  }
}

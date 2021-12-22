export class ImageMask extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene) {
    const width = scene.scale.width;
    const height = scene.scale.height;
    super(scene, 0, 0, width, height, 0xffffff);
    this.setOrigin(0, 0);
    this.setDepth(1);
    this.setAlpha(0.4);
  }
}

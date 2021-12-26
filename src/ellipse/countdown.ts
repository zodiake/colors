export class Countdown extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    const text = 60;
    super(scene, 0, 0, text.toString(), { fontSize: "5rem" });
    this.setPosition(scene.scale.width, scene.scale.height / 12);
    this.setOrigin(1, 1);
    scene.add.existing(this);
  }

  update() {
    const current = parseInt(this.text);
    this.setText((current - 1).toString());
  }
}

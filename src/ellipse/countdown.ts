import { GameState } from "./main-sceen";

export class CountdownTime extends Phaser.GameObjects.Text {
  event: Phaser.Time.TimerEvent;
  total = 60;
  constructor(scene: Phaser.Scene, public gameState: GameState) {
    super(scene, 0, 0, "60", { fontSize: "5rem" });
    this.setPosition(scene.scale.width, scene.scale.height / 12);
    this.setOrigin(1, 1);
    scene.add.existing(this);

    this.event = scene.time.addEvent({
      repeat: 60,
      callback: () => {
        this.total -= 1;
        this.setText(this.total.toString());
        if (this.total == 55) {
          this.event.paused = true;
        }
      },
      delay: 1000,
      paused: true,
    });
  }

  start() {
    this.event.paused = false;
  }

  update() {
    if (
      this.gameState == GameState.fail ||
      this.gameState == GameState.success
    ) {
      this.event.paused = true;
    }
  }
}

export class CountdownLayer extends Phaser.GameObjects.Layer {
  timeline: Phaser.Tweens.Timeline;
  constructor(scene: Phaser.Scene) {
    super(scene);
    const countDownThree = scene.add.image(0, 0, "three");
    const countDownTwo = scene.add.image(-100, -100, "two");
    const countDownOne = scene.add.image(-100, -100, "one");
    const timeline = scene.tweens.createTimeline();
    timeline.add({
      targets: countDownThree,
      scaleX: 5,
      scaleY: 5,
      duration: 1000,
      ease: "Power1",
      onComplete: () => {
        countDownThree.destroy();
      },
    });
    timeline.add({
      targets: countDownTwo,
      scaleX: 5,
      scaleY: 5,
      duration: 1000,
      ease: "Power1",
      onComplete: () => {
        countDownTwo.destroy();
      },
    });
    timeline.add({
      targets: countDownOne,
      scaleX: 5,
      scaleY: 5,
      duration: 1000,
      ease: "Power1",
      onComplete: () => {
        countDownOne.destroy();
      },
    });
  }

  play() {
    this.timeline.play();
  }
}

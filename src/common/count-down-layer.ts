export class CountdownLayer extends Phaser.GameObjects.Layer {
  timeline: Phaser.Tweens.Timeline;
  lastTween: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    super(scene);
    const width = scene.scale.width / 2;
    const height = scene.scale.height / 2;
    this.lastTween = scene.add.image(width, height, "three");
    const countDownTwo = scene.add.image(width, height, "two");
    const countDownOne = scene.add.image(width, height, "one");
    countDownOne.setAlpha(0);
    countDownTwo.setAlpha(0);
    this.lastTween.setAlpha(0);
    this.timeline = scene.tweens.createTimeline();
    this.timeline.add(this.config(this.lastTween));
    this.timeline.add(this.config(countDownTwo));
    this.timeline.add(this.config(countDownOne));
  }

  config(target: Phaser.GameObjects.Image) {
    return {
      targets: target,
      scaleX: 5,
      scaleY: 5,
      alpha: 1,
      duration: 1000,
      ease: "Power1",
      onComplete: () => {
        target.setVisible(false);
      },
    };
  }

  onComplete(config: Phaser.Types.Tweens.TweenBuilderConfig) {
    this.timeline.add({ ...config, targets: this.lastTween });
  }

  play() {
    this.timeline.play();
  }
}

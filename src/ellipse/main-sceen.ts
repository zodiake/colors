import { Ellipse } from "./ellipse";
import { EllipseGrid } from "./ellipse-grid";

export class MainSene extends Phaser.Scene {
  headEllipse: Ellipse;
  purpleEllipse: Ellipse;
  countDownText: Phaser.GameObjects.Text;
  grid: EllipseGrid;
  timeEvent: Phaser.Time.TimerEvent;

  constructor() {
    super("ellipse-main");
  }

  preload() {
    const jsonFile = `../images/color.json`;
    this.load.multiatlas("atlas", jsonFile, "images");
    this.load.image("three", "../images/SYMB_3.png");
    this.load.image("two", "../images/SYMB_2.png");
    this.load.image("one", "../images/SYMB_1.png");
    this.load.image("blue-bottom-half", "../images/blue-bottom-half.png");
    this.load.image("blue-top-half", "../images/blue-top-half.png");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const countDownThree = this.add.image(0, 0, "three");
    const countDownTwo = this.add.image(-100, -100, "two");
    const countDownOne = this.add.image(-100, -100, "one");

    this.countDownText = this.add.text(100, 200, "60");
    this.headEllipse = new Ellipse(this);
    this.grid = new EllipseGrid(this, this.headEllipse);

    Phaser.Display.Align.In.Center(
      countDownThree,
      this.add.zone(width / 2, height / 2, width, height)
    );

    this.tweens.timeline({
      tweens: [
        {
          targets: countDownThree,
          scaleX: 5,
          scaleY: 5,
          duration: 1000,
          ease: "Power1",
          onComplete: () => {
            countDownThree.destroy();
            Phaser.Display.Align.In.Center(
              countDownTwo,
              this.add.zone(width / 2, height / 2, width, height)
            );
          },
        },
        {
          targets: countDownTwo,
          scaleX: 5,
          scaleY: 5,
          duration: 1000,
          ease: "Power1",
          onComplete: () => {
            countDownTwo.destroy();
            Phaser.Display.Align.In.Center(
              countDownOne,
              this.add.zone(width / 2, height / 2, width, height)
            );
          },
        },
        {
          targets: countDownOne,
          scaleX: 5,
          scaleY: 5,
          duration: 1000,
          ease: "Power1",
          onComplete: () => {
            countDownOne.destroy();
            this.timeEvent = this.time.addEvent({
              repeat: 59,
              callback: this.onStart,
              callbackScope: this,
              delay: 1000,
            });
          },
        },
      ],
    });
  }

  onStart() {
    this.grid.children.forEach((i) => i.setInteractive());
    this.grid.setTimeEvent(this.timeEvent);
    const current = Number.parseInt(this.countDownText.text);
    this.countDownText.setText((current - 1).toString());
  }
}

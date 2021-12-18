import { Ellipse } from "./ellipse";
import { EllipseGrid } from "./ellipse-grid";

export class MainSene extends Phaser.Scene {
  headEllipse: Ellipse;
  purpleEllipse: Ellipse;
  countDownText: Phaser.GameObjects.Text;
  grid: EllipseGrid;

  constructor() {
    super("ellipse-main");
    this.headEllipse = new Ellipse(this);
    this.grid = new EllipseGrid(this, this.headEllipse);
  }

  preload() {
    const jsonFile = `../images/color.json`;
    this.load.multiatlas("atlas", jsonFile, "images");
    this.load.image("three", "../images/SYMB_3.png");
    this.load.image("two", "../images/SYMB_2.png");
    this.load.image("one", "../images/SYMB_1.png");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const countDownThree = this.add.image(0, 0, "three");
    const countDownTwo = this.add.image(-100, -100, "two");
    const countDownOne = this.add.image(-100, -100, "one");
    const countDownText = this.add.text(100, 200, "60");

    this.headEllipse.create();
    this.grid.create();

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
            this.time.addEvent({
              repeat: 59,
              callback: this.countDownTime(countDownText),
              delay: 1000,
            });
          },
        },
      ],
    });
  }

  countDownTime(text: Phaser.GameObjects.Text) {
    return () => {
      const current = Number.parseInt(text.text);
      this.grid.children.forEach((i) => i.setInteractive());
      text.setText((current - 1).toString());
    };
  }
}

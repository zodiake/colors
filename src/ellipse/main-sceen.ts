import { FailUI } from "../common/fail-ui";
import { ImageKeys } from "./config";
import { Ellipse } from "./ellipse";
import { EllipseGrid } from "./ellipse-grid";
import { EllipseGroup } from "./grid/ellipseGroup";
import { TargetEllipse } from "./target/targetEllipse";

export class MainSene extends Phaser.Scene {
  headEllipse: Ellipse;
  purpleEllipse: Ellipse;
  countDownText: Phaser.GameObjects.Text;
  grid: EllipseGrid;
  timeEvent: Phaser.Time.TimerEvent;
  failUI: FailUI<MainSene>;
  targetColors = ["blue"];
  targetColor: string;

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

    this.load.image(ImageKeys.HOME_BUTTON, "../images/SYMB_PLAY.png");
    this.load.image(ImageKeys.RESTART_BUTTON, "../images/SYMB_REPLAY.png");
    this.load.image(ImageKeys.FAIL_IMAGE, "../images/ellipse-title2.png");
    this.load.image("ellipse-title", "../images/ellipse-title.png");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const countDownThree = this.add.image(0, 0, "three");
    const countDownTwo = this.add.image(-100, -100, "two");
    const countDownOne = this.add.image(-100, -100, "one");

    const targetEllipse = new TargetEllipse(this, {
      rules: [["red", "purple", "blue"]],
    });
    this.timeEvent = this.time.addEvent({
      repeat: 5,
      callback: this.onStart,
      callbackScope: this,
      delay: 1000,
      paused: true,
    });
    const groupEllipse = new EllipseGroup(this, targetEllipse, this.timeEvent, {
      colors: ["red", "purple", "red", "purple"],
      columns: 6,
      rows: 2,
    });

    /*
    this.countDownText = this.add.text(100, 200, "60");
    this.headEllipse = new Ellipse(this);
    this.grid = new EllipseGrid(this, this.headEllipse, this.targetColor);
    this.failUI = new FailUI(this, ImageEnum.FAIL_IMAGE);
    this.failUI.init();

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
            this.grid.children.forEach((i) => i.setInteractive());
            this.grid.setTimeEvent(this.timeEvent);
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
              repeat: 5,
              callback: this.onStart,
              callbackScope: this,
              delay: 1000,
            });
          },
        },
      ],
    });
    */
  }

  // update count down text
  onStart() {
    const current = Number.parseInt(this.countDownText.text);
    this.countDownText.setText((current - 1).toString());
  }
}

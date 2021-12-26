import { CountdownLayer } from "../common/count-down-layer";
import { FailUI } from "../common/fail-ui";
import { ImageKeys } from "./config";
import { Countdown } from "./countdown";
import { Ellipse } from "./ellipse";
import { EllipseGrid } from "./ellipse-grid";
import { EllipseGroup } from "./grid/ellipseGroup";
import { TargetEllipse } from "./target/targetEllipse";

export class MainSene extends Phaser.Scene {
  headEllipse: Ellipse;
  purpleEllipse: Ellipse;
  countDownText: Countdown;
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
    const countDown = new CountdownLayer(this);
    this.countDownText = new Countdown(this);

    const targetEllipse = new TargetEllipse(this, {
      rules: [["red", "purple", "blue"]],
    });
    this.timeEvent = this.time.addEvent({
      repeat: 60,
      callback: () => {
        this.countDownText.update();
      },
      callbackScope: this,
      delay: 1000,
      paused: true,
    });
    const groupEllipse = new EllipseGroup(this, targetEllipse, this.timeEvent, {
      colors: ["red", "purple", "red", "purple"],
      columns: 6,
      rows: 2,
    });
    const mask = this.add.rectangle(0, 0, width, height, 0xffffff);
    mask.setOrigin(0, 0);
    mask.setAlpha(0.3);
    countDown.onComplete({
      targets: null,
      onComplete: () => {
        mask.setVisible(false);
        groupEllipse.enableClick();
        groupEllipse.getChildren().forEach((i) => i.setInteractive());
        this.timeEvent.paused = false;
      },
    });
    countDown.play();
  }

  // update count down text
  onStart() {
    this.countDownText.update();
  }
}

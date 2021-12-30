import { CountdownLayer } from "../common/count-down-layer";
import { FailUI } from "../common/fail-ui";
import { ImageKeys } from "./config";
import { CountdownTime } from "./countdown";
import { Ellipse } from "./ellipse";
import { EllipseGroup } from "./grid/ellipseGroup";

export enum GameState {
  success,
  fail,
  timeover,
  pending,
}

export class MainSene extends Phaser.Scene {
  headEllipse: Ellipse;
  purpleEllipse: Ellipse;
  group: EllipseGroup;
  timeEvent: Phaser.Time.TimerEvent;
  failUI: FailUI<MainSene>;
  targetColors = ["blue"];
  targetColor: string;
  countdownTime: CountdownTime;
  state: GameState = GameState.pending;

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
    this.countdownTime = new CountdownTime(this, this.state);

    this.group = new EllipseGroup(this, {
      colors: ["red", "purple", "red", "purple"],
      columns: 6,
      rows: 2,
      state: this.state,
    });
    const mask = this.add.rectangle(0, 0, width, height, 0xffffff);
    mask.setOrigin(0, 0);
    mask.setAlpha(0.3);
    countDown.onComplete({
      targets: null,
      onComplete: () => {
        mask.setVisible(false);
        this.group.clickable = true;
        this.group.getChildren().forEach((i) => i.setInteractive());
        this.countdownTime.start();
      },
    });
    countDown.play();
  }

  update(time: number, delta: number): void {
    this.group.update();
    this.countdownTime.update();
  }
}

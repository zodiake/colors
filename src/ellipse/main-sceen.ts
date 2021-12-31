import { CountdownLayer } from "../common/count-down-layer";
import { FailUI } from "../common/fail-ui";
import { ImageKeys } from "./config";
import { CountdownTime } from "./countdown";
import { Ellipse } from "./ellipse";
import { EllipseGroup } from "./grid/ellipseGroup";
import { TargetEllipse } from "./target/targetEllipse";

export enum GameState {
  success,
  fail,
  timeover,
  pending,
}

export class MainSene extends Phaser.Scene {
  state: GameState = GameState.pending;
  firstColor: string;
  secondColor: string;
  headerEllipse: TargetEllipse;
  group: EllipseGroup;
  rules: Array<[string, string, string]>;
  ruleMap: Map<string, string>;

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

    this.group = new EllipseGroup(this, {
      colors: ["red", "purple", "red", "purple"],
      columns: 6,
      rows: 2,
      state: this.state,
    });
    this.rules = [["red", "purple", "blue"]];
    this.headerEllipse = new TargetEllipse(this);
    this.createRules();
  }

  createRules() {
    this.rules = [["red", "purple", "blue"]];
    const entries: Array<[string, string]> = [
      ...this.rules.map(([f, s, m]) => [s, f, m]),
      ...this.rules,
    ].map(([f, s, m]) => [f + "-" + s, m]);
    this.ruleMap = new Map(entries);
  }

  update(time: number, delta: number): void {
    if (this.firstColor != null && this.secondColor != null) {
      // change target color or restore
    }
    if (this.firstColor != null) {
      this.headerEllipse.bottomFill(this.firstColor);
      return;
    }
    if (this.secondColor != null) {
      this.headerEllipse.topFill(this.secondColor);
      return;
    }
  }
}

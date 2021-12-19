import { BaseResultUI } from "./base-result-ui";

export class FailUI<M extends Phaser.Scene> extends BaseResultUI<M> {
  constructor(screen: M, descImage: string) {
    super(screen, descImage);
  }
}

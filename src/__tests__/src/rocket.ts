export class Rocket {
  isInSpace: boolean;
  boostersLanded: boolean;

  constructor() {
    this.isInSpace = false;
    this.boostersLanded = true;
  }

  launch() {
    this.isInSpace = true;
    this.boostersLanded = true;
  }
}

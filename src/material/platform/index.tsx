import HitBox from "../hitBox";

class Platform extends HitBox{
  constructor() {
    super({x: 0, y: 600, width: 150, height: 10})
  }

  moveLeft() {
    this.x.value -= 10; // Move left by 10 units
  }

  moveRight() {
    this.x.value += 10; // Move right by 10 units
  }

  init() {

  }
}

export default Platform

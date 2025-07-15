import HitBox from "../hitBox";
import type Scene from "../scene";

class Platform extends HitBox{
  private scene: Scene;
  private movement = () => {}
  constructor(scene: Scene) {
    super({x: 375, y: 600, width: 150, height: 10})
    this.scene = scene
  }

  moveLeft() {
    if(this.left < 0){
      this.x.value = this.width / 2;
      return;
    }
    this.x.value -= 10;
    this.movement()
  }

  moveRight() {
    if(this.right > this.scene.width){
      this.x.value = this.scene.width - this.width / 2;
      return;
    }
    this.x.value += 10;
    this.movement()
  }

  onMove(callback: any) {
    this.movement = callback;
  }

  setDomRef(el: HTMLElement | null) {
    this.domRef = el;
  }
  render() {
    return <div
      ref={(el) => this.setDomRef(el as HTMLElement)}
      style={`
      position: absolute;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease;
      left: ${this.x.value}px;
      top: ${this.y.value}px;
      width: ${this.width}px;
      height: ${this.height}px;
      background-color: ${this.color};
    `}></div>
  }

}

export default Platform

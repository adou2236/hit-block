import Scene from "../scene";
import {v4 as uuid} from "uuid"
class Game {
  public id: string;
  public scene: Scene;
  public isPause: boolean = false;
  private animationFrameId: number | null = null; // 可选：保存动画帧 ID
  constructor() {
    this.id = uuid();
    this.scene = new Scene()
  }
  play() {
    this.isPause = false
    this.animateStart()
  }
  pause() {
    this.isPause = true
    this.clearAnimation()
  }

  pauseToggle() {
    console.log("???")
    if(this.isPause) this.play()
    else this.pause()
  }

  animateStart() {
    this.scene.init()
    this.scene.balls.forEach(ball => {
      ball.move()
    })
    this.animationFrameId = requestAnimationFrame(this.animateStart.bind(this))
  }

  clearAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null; // 重置 ID，以便后续可以再次启动动画
    }
  }

  gameStart() {
    this.play()
  }

  gameOver() {
    console.log(`Game over for ${this.id}`);
  }

}

export default Game

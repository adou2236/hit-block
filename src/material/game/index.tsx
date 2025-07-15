import Scene from "../scene";
import {v4 as uuid} from "uuid"
import HitBox from "../hitBox";
import Ball from "../ball";
import Block from "../block";
import PowerUp, {createPowerUp, Expand, PowerFactory} from "../powerUp";
class Game {
  public id: string;
  public scene: Scene;
  public isPause: boolean = false;
  public isGameStart: boolean = false
  public isGameOver: boolean = false;
  private animationFrameId: number | null = null; // 可选：保存动画帧 ID
  constructor() {
    this.id = uuid();
    this.scene = new Scene(this)
    // TODO 是否在此声明小球碰撞事件
    // Ball.prototype.onCollide = (colHandlers) => {
    //   for (let i = 0; i < colHandlers.length; i++){
    //     switch (true) {
    //       case colHandlers[i].instance instanceof Platform:
    //         this.hitOnPlatform(colHandlers[i])
    //         break;
    //       case colHandlers[i].instance instanceof Block:
    //         this.hitOnBlock(colHandlers[i])
    //         break;
    //       default:
    //         return
    //     }
    //   }
    // }
    // 声明碰撞盒被摧毁时发生的事件
    HitBox.prototype.onRemoved = (instance) => {
      switch (true) {
        case instance instanceof Ball:
          this.scene.balls = this.scene.balls.filter(ball => ball !== instance)
          break;
        case instance instanceof Block:

          if(instance.powers && instance.powers.length > 0){
            this.scene.powers.push(...instance.powers.map(power => {
              return createPowerUp('expand', this.scene, {x: instance.x.value, y: instance.y.value, duration: power.duration})
            }))
          }
          this.scene.blocks = this.scene.blocks.filter(block => block !== instance)
          break;
        case instance instanceof PowerUp:
          this.scene.powers = this.scene.powers.filter(power => power !== instance)
          break;
        default:
          return
      }
    }
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
    if(this.isPause) this.play()
    else this.pause()
  }

  animateStart() {
    // console.log(this.scene.balls, this.scene.blocks)
    if (!this.isGameStart || this.isPause || this.isGameOver) return; // 如果已暂停，不再继续

    if(this.scene.balls.length === 0) {
      this.gameOver()
    }
    if(this.scene.blocks.length === 0) {
      this.gamePass()
    }
    this.scene.hitWatcher()
    this.scene.balls.forEach(ball => {
      ball.move()
    })
    this.scene.powers.forEach(power => {
      power.move()
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
    if(this.isGameStart) return; // 防止重复触发
    this.isGameStart = true
    this.play()
  }

  gamePass() {
    console.log("游戏通关!!!!!!!")
    this.gameOver()
  }
  gameOver() {
    if (this.isGameOver) return; // 防止重复触发
    console.log("游戏结束");
    this.pause();
    this.isGameOver = true;
  }

}

export default Game

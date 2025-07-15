import Platform from "../platform";
import Ball from "../ball";
import Block from "../block";
import HitBox from "../hitBox";
import {PowerUp} from "../powerUp";
import type Game from "../game";
import { blocks, walls } from './init.ts'


class Scene {
  public game: Game;
  public width: number;
  public height: number;
  public backgroundColor: string;
  public platform: Platform;
  public balls: Array<Ball>
  public blocks: Array<Block>
  public walls: Array<HitBox>
  public powers: Array<PowerUp>

  constructor(game: Game) {
    this.game = game;
    this.width = 750; // Default width
    this.height = 750; // Default height
    this.backgroundColor = 'black'; // Default background color
    this.platform = new Platform(this);
    this.balls = [new Ball({x: this.platform.x.value, y: this.platform.y.value - 10,width: 10, height: 10, color: 'yellow'})]
    this.blocks = blocks.map(block => new Block(block))
    this.walls = walls.map(wall => new Block({...wall, color: 'gray', life: -1}))
    this.powers = []
    this.platform.onMove(() => {
      if(!this.game.isGameStart){
        this.balls[0].x.value = this.platform.x.value
      }
    })
  }


  render() {
    return (
      <div
        id="room"
        style={`
          position: relative;
          width: ${this.width}px;
          height: ${this.height}px;
          background-color: ${this.backgroundColor};
        `}>
          {this.platform.render()}
          {this.balls.map(ball => ball.render())}
          {this.blocks.map(block => block.render())}
          {this.walls.map(wall => wall.render())}
          {this.powers.map(power => power.render())}
      </div>
    )
  }

  hitWatcher() {
    this.balls.forEach(ball => {
      if (ball.top < 0) {
        ball.y.value = ball.width / 2
        ball.speedY = -1 * ball.speedY
      }
      if (ball.top > this.height) {
        ball.destroy() // 掉出空间
      }
      if (ball.left < 0) {
        ball.x.value = ball.width / 2
        ball.speedX = -1 * ball.speedX
      }
      if (ball.right > this.width) {
        ball.x.value = this.width - ball.width / 2
        ball.speedX = -1 * ball.speedX
      }
    })
    this.powers.forEach(power => {
      if (power.y.value > this.height - power.width) {
        power.destroy()
      }
    })
  }
}

export default Scene

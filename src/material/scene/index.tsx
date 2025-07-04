import Platform from "../platform";
import Ball from "../ball";
import Block from "../block";

const blocks = [
  {x: 0, y: 0, width: 150, height: 10, },
  {x: 160, y: 0, width: 150, height: 10},
  {x: 320, y: 0, width: 150, height: 10},
  {x: 480, y: 0, width: 150, height: 10},
  {x: 640, y: 0, width: 150, height: 10},
]
class Scene {
  public width: number;
  public height: number;
  public backgroundColor: string;
  public platform: Platform;
  public balls: Array<Ball>
  public blocks: Array<Block>

  constructor() {
    this.width = 750; // Default width
    this.height = 750; // Default height
    this.backgroundColor = 'black'; // Default background color
    this.platform = new Platform();
    this.balls = [new Ball({x: this.platform.x.value, y: this.platform.y.value - 10})]
    this.blocks = blocks.map(block => new Block(block))

  }

  render() {
    return <div
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
    </div>
  }

  hitWatcher() {
    this.balls.forEach(ball => {
      if (ball.y.value < 0) {
        ball.y.value = 0
        ball.speedY = -1 * ball.speedY
      }
      if(ball.y.value > this.height - ball.width) {
        ball.y.value = this.height - ball.width
        ball.speedY = -1 * ball.speedY
      }
      if (ball.x.value < 0) {
        ball.x.value = 0
        ball.speedX = -1 * ball.speedX
      }
      if (ball.x.value > this.width - ball.width) {
        ball.x.value = this.width - ball.width
        ball.speedX = -1 * ball.speedX
      }
    })
  }

  init() {
    this.hitWatcher()
  }
}

export default Scene

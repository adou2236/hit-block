import Platform from "../platform";
import Block from "../block";
import HitBox, {CollisionDirection, CollisionHandler} from "../hitBox";

class Ball extends HitBox{
  public speedX: number;
  public speedY: number;
  constructor({x, y, speed = 1}) {
    super({x, y, width: 10, height: 10})
    this.speedX = speed;
    this.speedY = speed;
    this.onCollide((colHandlers) => {
      for (let i = 0; i < colHandlers.length; i++){
        switch (true) {
          case colHandlers[i].instance instanceof Platform:
            this.hitOnPlatform(colHandlers[i])
            break;
          case colHandlers[i].instance instanceof Block:
            this.hitOnBlock(colHandlers[i])
            break;
          default:
            return

        }
      }
    })
  }

  move() {
    this.x.value += this.speedX;
    this.y.value -= this.speedY;
    this.hitCheck()
  }

  // 碰撞平台时会发生什么
  hitOnPlatform(colHandler: CollisionHandler<Platform>) {
    this.changeDirection(colHandler)
  }

  hitOnBlock(colHandler: CollisionHandler<Block>) {
    colHandler.instance.hit()
    this.changeDirection(colHandler)
  }

  changeDirection(colHandler: CollisionHandler<HitBox>) {
    if(colHandler.direction === CollisionDirection.top || colHandler.direction === CollisionDirection.bottom){
      this.speedY *= -1
    }
    if(colHandler.direction === CollisionDirection.left || colHandler.direction === CollisionDirection.right){
      this.speedX *= -1
    }
  }

}

export default Ball

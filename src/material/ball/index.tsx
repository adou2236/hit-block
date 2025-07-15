import Platform from "../platform";
import Block from "../block";
import HitBox, {CollisionDirection} from "../hitBox";
import type {CollisionHandler} from "../hitBox";
import {nextTick} from "vue";
import type {RECTANGLE} from "../rectangle";

class Ball extends HitBox {
  public speedX: number;
  public speedY: number;
  private isColliding: boolean

  constructor(p: RECTANGLE, speed = 1) {
    const defaultProps = {
      width: 10,
      height: 10,
    };
    const mergedProps = {...defaultProps, ...p};
    super(mergedProps)
    this.speedX = speed;
    this.speedY = speed;
    this.isColliding = false
    this.onCollide((colHandlers) => {
      for (let i = 0; i < colHandlers.length; i++) {
        switch (true) {
          case colHandlers[i].instance instanceof Platform:
            this.hitOnPlatform(colHandlers[i] as CollisionHandler<Platform>)
            break;
          case colHandlers[i].instance instanceof Block:
            this.hitOnBlock(colHandlers[i] as CollisionHandler<Block>)
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
    // 如果发生碰撞时两物体已经相交，更改小球坐标位置
    if (this.isColliding) {
      return
    }
    this.isColliding = true
    if (colHandler.direction === CollisionDirection.top) {
      this.speedY *= -1
      this.y.value = colHandler.instance.bottom + this.height / 2;
    } else if (colHandler.direction === CollisionDirection.bottom) {
      this.speedY *= -1
      this.y.value = colHandler.instance.top - this.height / 2;
    } else if (colHandler.direction === CollisionDirection.left) {
      this.speedX *= -1
      this.x.value = colHandler.instance.right + this.width / 2;
    } else if (colHandler.direction === CollisionDirection.right) {
      this.speedX *= -1
      this.x.value = colHandler.instance.left - this.width / 2;
    }
    nextTick(() => {
      this.isColliding = false
    })
  }

}

export default Ball

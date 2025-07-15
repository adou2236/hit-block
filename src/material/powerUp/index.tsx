// 道具类

import HitBox from "../hitBox";
import type Scene from "../scene";
import Platform from "../platform";

class PowerUp extends HitBox {
  public duration = -1;
  public speedY = 2;
  public apply: any
  public deApply: any
  public scene: Scene;
  constructor(scene: Scene, p) {
    const defaultProps = {
      width: 10,
      height: 10,
    };
    const mergedProps = { ...defaultProps, ...p };
    super(mergedProps)
    this.scene = scene;
    this.duration = p.duration;
    this.onCollide((colHandlers) => {
      for (let i = 0; i < colHandlers.length; i++){
        switch (true) {
          case colHandlers[i].instance instanceof Platform:
            this.handleApply(this.scene)
            break;
          default:
            return

        }
      }
    })
    this.move()
  }

  move() {
    this.y.value += this.speedY;
    this.hitCheck()
  }

  handleApply(scene: Scene){
    this.apply(scene)
    this.destroy()
    if(this.duration > 0 && this.deApply){
      setTimeout(() => this.deApply(scene), this.duration * 1000)
    }
  }

}

class Expand extends PowerUp {
  constructor(scene: Scene, p) {
    super(scene, p)
  }

  apply(scene: Scene) {
    let trans = scene.platform.width * 0.25
    scene.platform.width = scene.platform.width * 1.5
    scene.platform.x.value -= trans
  }

  deApply(scene: Scene) {
    scene.platform.width = scene.platform.width / 1.5
    let trans = scene.platform.width * 0.25
    scene.platform.x.value += trans

  }
}

// 定义支持的道具类型
type PowerUpType = 'expand' | 'shrink' | 'speedUp' | 'extraBall';

// 工厂函数
function createPowerUp(type: PowerUpType, scene: Scene, p: any): PowerUp {
  switch (type) {
    case 'expand':
      return new Expand(scene, p);
    default:
      throw new Error(`Unknown power-up type: ${type}`);
  }
}

export { PowerUp, Expand, createPowerUp }
export default PowerUp

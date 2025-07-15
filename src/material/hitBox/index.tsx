import Rectangle from "../rectangle";
import type {RECTANGLE} from "../rectangle";

export enum CollisionDirection {
  null,
  'top',
  'bottom',
  'left',
  'right',
}
export type CollisionHandler<T> = {instance: T, direction: CollisionDirection}
export type MultiCollisionHandler = (other: Array<CollisionHandler<HitBox>>) => void

class HitBox extends Rectangle{
  private static instances: HitBox[] = []; // 存储所有 HitBox 实例
  private onCollideCallback: MultiCollisionHandler | null = null;
  public onRemoved: ((current: HitBox) => void) | undefined;
  constructor(p: RECTANGLE) {
    super(p)
    HitBox.instances.push(this);
  }



  // 设置碰撞回调
  onCollide(callback: MultiCollisionHandler) {
    this.onCollideCallback = callback;
  }
  // 检测碰撞（Axis-Aligned Bounding Box）
  checkCollision(otherInstance: Rectangle): CollisionDirection {
    // 获取两个实体中心点的水平距离与垂直距离
    const dx = this.x.value - otherInstance.x.value;
    const dy = this.y.value - otherInstance.y.value;
    const halfWidths = (this.width + otherInstance.width) / 2;
    const halfHeights = (this.height + otherInstance.height) / 2;


    let direction = CollisionDirection.null;
    if (Math.abs(dx) < halfWidths && Math.abs(dy) < halfHeights) {
      // 碰撞发生，判断方向
      const wy = halfWidths * dy;
      const hx = halfHeights * dx;
      if (wy > hx) {
        if (wy > -hx) {
          direction = CollisionDirection.top;
        } else {
          direction = CollisionDirection.right;
        }
      } else {
        if (wy > -hx) {
          direction = CollisionDirection.left;
        } else {
          direction = CollisionDirection.bottom;
        }
      }
    }
    return direction;
  }

  hitCheck() {
    const others = HitBox.instances.filter((instance) => instance !== this);

    const collidedList = others.filter((other) => this.checkCollision(other)).map((other) => {
      return {
        instance: other,
        direction: this.checkCollision(other),
      }
    });

    if (collidedList.length > 0 && this.onCollideCallback) {
      this.onCollideCallback(collidedList); // 回调传入碰撞对象数组
    }
  }
  // 可选：清理不再需要的实例
  destroy() {
    // if (this.domRef && this.domRef.parentNode) {
    //   this.domRef.parentNode.removeChild(this.domRef);
    // }

    // 同时从实例池中移除
    const index = HitBox.instances.indexOf(this);
    if (index > -1) {
      HitBox.instances.splice(index, 1);
    }

    this.domRef = null;
    this.onCollideCallback = null;
    if (this.onRemoved) {
      this.onRemoved(this);
    }
  }

}
export default HitBox;

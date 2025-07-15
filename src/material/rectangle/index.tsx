import {ref} from "vue";
import type {Ref} from "vue";

export type RECTANGLE = {
  height: number;
  width: number;
  x: number;
  y: number;
  color?: string;
}
class Rectangle {
  public height: number;
  public width: number;
  public x: Ref<number, number>;
  public y: Ref<number, number>;
  public color?: string;
  public domRef: HTMLElement | null = null;


  constructor({x, y, width, height, color}: RECTANGLE) {
    this.x = ref(x);
    this.y = ref(y);
    this.width = width;
    this.height = height;
    this.color = color || 'white';

  }
  get left(): number {
    return this.x.value - this.width / 2;
  }

  get right(): number {
    return this.x.value + this.width / 2;
  }

  get top(): number {
    return this.y.value - this.height / 2;
  }

  get bottom(): number {
    return this.y.value + this.height / 2;
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
      left: ${this.x.value}px;
      top: ${this.y.value}px;
      width: ${this.width}px;
      height: ${this.height}px;
      background-color: ${this.color};
    `}></div>
  }

}

export default Rectangle

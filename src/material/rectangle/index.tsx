import {ref} from "vue";
import type {Ref} from "vue";

class Rectangle {
  public height: number;
  public width: number;
  public x: Ref<number, number>;
  public y: Ref<number, number>;
  constructor({x, y, width, height}: {x: number, y: number, width: number, height: number}) {
    this.x = ref(x);
    this.y = ref(y);
    this.width = width;
    this.height = height;
  }
  get left(): number {
    return this.x.value;
  }

  get right(): number {
    return this.x.value + this.width;
  }

  get top(): number {
    return this.y.value;
  }

  get bottom(): number {
    return this.y.value + this.height;
  }

}

export default Rectangle

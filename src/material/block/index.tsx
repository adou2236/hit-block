import HitBox from "../hitBox";
import type {RECTANGLE} from "../rectangle";
import type PowerUp from "../powerUp";

interface BLOCK extends RECTANGLE{
  life?: number;
  score?: number;
  powers?: Array<PowerUp>;
}
class Block extends HitBox{
  public life = 1;
  public score = 1;
  public powers: Array<PowerUp> = [];
  public color: string;
  constructor(p: BLOCK) {
    super(p)
    this.life = p.life || 1;
    this.score = p.score || 1;
    this.powers = p.powers || []
    this.color = p.color || 'white'
  }

  hit() {
    this.life--
    if (this.life === 0) {
      this.destroy()
    }
  }

  render() {
    return <div
      ref={(el) => this.setDomRef(el as HTMLElement)}
      style={`
      position: absolute;
      transform: translate(-50%, -50%);
      border: 1px solid black;
      left: ${this.x.value}px;
      top: ${this.y.value}px;
      width: ${this.width}px;
      height: ${this.height}px;
      box-sizing: border-box;
      background-color: ${this.color};
    `}></div>
  }

}

export default Block

import HitBox from "../hitBox";

type BLOCK = {
  // 砖块位置信息
  x: number;
  y: number;
  width: number;
  height: number;
  // 砖块生命
  life: number;
  // 砖块分数
  score: number;
  // 砖块颜色
  color: string;
}
class Block extends HitBox{
  public life: number;
  public score: number;
  private color: string;
  constructor(p: BLOCK) {
    super(p)
    this.life = p.life || 1;
    this.score = p.score || 1;
    this.color = p.color || 'white'
  }

  hit() {
    this.life--
    if (this.life <= 0) {
      this.destroy()
    }
  }

}

export default Block

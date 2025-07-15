import Game from '../game'
class Controllor {
  public game: Game;
  private actions: any;
  private keydowns: any;
  constructor(game: Game) {
    this.game = game;
    this.actions = {};
    this.keydowns = {}

  }
  registerAction (key: string, callback:  any) {
    this.actions[key] = callback
  }
  init() {
    // 暂停按钮
    window.addEventListener('keyup',  (event) => {
      switch (event.keyCode) {
        case 80:
          this.game.pauseToggle()
          break;
        case 32:
          this.game.gameStart()
          break;
      }
    })
    // turbo 按钮
    window.addEventListener('keydown',  (event) => {
      this.keydowns[event.keyCode] = true
    })
    window.addEventListener('keyup',  (event) => {
      this.keydowns[event.keyCode] = false
    })
    // ←移动
    this.registerAction('37', () => {
      if(!this.game.isPause) this.platformMoveLeft()
    })
    // →移动
    this.registerAction('39', () => {
      if(!this.game.isPause) this.platformMoveRight()
    })
    this.startLiseners()
  }

  startLiseners() {
    let actions = Object.keys(this.actions)
    for (let i = 0; i < actions.length; i++) {
      let key = actions[i]
      if (this.keydowns[key]) {
        // 如果按键被按下，调用注册的action
        this.actions[key]()
      }
    }
    requestAnimationFrame(this.startLiseners.bind(this));
  }
  platformMoveLeft() {
    this.game.scene.platform.moveLeft();
  }
  platformMoveRight() {
    this.game.scene.platform.moveRight();
  }
}


export default Controllor

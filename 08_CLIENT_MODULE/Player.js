class Player {
  constructor(x, y) {
    this.img = image('./Images/char_down.png')
    this.x = x
    this.y = y
    this.width = 60
    this.width = 65
    this.vx = 0
    this.vy = 0
    this.delay = 0.1
  }
  draw() {
    this.delay -= deltaTime
    if (this.vx == 1) {
      this.img.src = './images/char_right.png'

    } else if (this.vx == -1) {
      this.img.src = './images/char_left.png'

    } else if (this.vy == 1) {
      this.img.src = './images/char_down.png'

    } else if (this.vy == -1) {
      this.img.src = './images/char_up.png'

    }
    if (this.delay < 0) {
      this.delay = 0.1
      if (this.vx == -1 && this.x + (this.vx * 64) < 60) {
        return
      }
      if (this.vy == -1 && this.y + (this.vx * 64) < 64 * 2) {
        return
      }
      this.x += this.vx * 64
      this.y += this.vy * 64
      game.maps.forEach(rect => {
        if (rect?.name !== 'brick') return;
      });
    }
    ctx.drawImage(this.img, this.x, this.y)
  }
}
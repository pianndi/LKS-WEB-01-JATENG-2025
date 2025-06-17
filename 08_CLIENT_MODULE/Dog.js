class Dog {
  constructor(x, y) {
    this.img = image('./Images/dog_left.png')
    this.x = x
    this.y = y
    this.width = 64
    this.height = 64
  }
  draw() {
    this.delay -= deltaTime
    if (this.vx == 1) {
      this.img.src = './images/dog_right.png'

    } else if (this.vx == -1) {
      this.img.src = './images/dog_left.png'

    } else if (this.vy == 1) {
      this.img.src = './images/dog_down.png'
    } else if (this.vy == -1) {
      this.img.src = './images/dog_up.png'
    }
    if (this.delay < 0) {
      this.delay = 0.1
      this.x += this.vx * 64
      this.y += this.vy * 64
    }
    ctx.drawImage(this.img, this.x, this.y)
  }
}
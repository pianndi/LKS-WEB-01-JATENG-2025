class Explosion {
  constructor(x, y) {
    this.img = image('./Images/duar.jpg')
    this.x = x
    this.y = y
    this.width = 60
    this.width = 65
    this.vx = 0
    this.vy = 0
    this.timer = 1;
    this.explode = false
  }
  draw() {
    this.timer -= deltaTime
    ctx.drawImage(this.img, this.x, this.y)
  }
}
class Wall {
  constructor(x, y) {
    this.img = image('./Images/wall.png')
    this.name = 'brick'
    this.x = x
    this.y = y
    this.width = 60
    this.width = 65
    this.vx = 0
    this.vy = 0
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y)
  }
}
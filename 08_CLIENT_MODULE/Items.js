class BrokenHeart {
  constructor(x, y) {
    this.img = image('./Images/heart.png')
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
class Ice {
  constructor(x, y) {
    this.img = image('./Images/ice.png')
    this.x = x
    this.y = y
    this.name = 'ice'
    this.width = 60
    this.width = 65
    this.vx = 0
    this.vy = 0
    this.explode = false
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y)
  }
}
class Tnt {
  constructor(x, y) {
    this.img = image('./Images/ice.png')
    this.x = x
    this.y = y
    this.name = 'tnt'
    this.width = 60
    this.width = 65
    this.vx = 0
    this.vy = 0
    this.explode = false
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y)
  }
}
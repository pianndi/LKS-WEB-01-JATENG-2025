let game;
let deltaTime = 0;
const ctx = canvas.getContext('2d')
canvas.width = 1000
canvas.height = 600
const map = [
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  Array(9).fill(0),
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  Array(9).fill(0),
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  Array(9).fill(0),
]
myform.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries((new FormData(e.target)).entries())
  inputUser = formData
  home_screen.classList.add('hidden')
  game_screen.classList.remove('hidden')
  main()
})
let inputUser = {
  username: 'PlayerName',
  level: 3,
}
const brickImage = image('./Images/wall_crack.png')
class Game {
  static collide(a, b) {
    return (
      a.x == b.x && a.y == b.y
    )
  }
  static generateWall() {
    const maps = []
    map.forEach((rows, y) => {
      rows.forEach((item, x) => {
        const r = 64
        if (item == 0) {
          maps.push(Math.random() > 0.5 ? new Wall(x * r + 64, y * r + 64) : new Rect(x * r, y * r, true))

        } else {
          maps.push(new Rect(x * r + r, y * r + r, true))

        }
      })
    })
    return maps
  }
  constructor() {
    this.pointer = {
      x: 0,
      y: 0,
    }
    this.hearts = 3;
    this.breaks = 0;
    this.isPaused = false
    this.tnt = 0;
    this.ice = 0
    this.maps = Game.generateWall()
    this.bgImage = image('./Images/background.jpg')
    this.player = new Player(64 * 1, 64 * 1)
    this.enemies = Array(parseInt(inputUser.level)).fill().map(() => new Dog(64 * random(1, 8), 64 * random(1, 5)))
    this.lastTime = performance.now()
    this.timer = 0;
    this.items = [];
    this.walls = [new Wall(64 * 3, 65)]
    this.bombs = [new Bomb(64 * 5, 64 * 1)]
    this.explosions = []
    this.countdown = 3;
    this.listener()
    this.render()
  }
  resume() {
    pause_popup.classList.add('hidden')
    this.countdown = 3;
    this.isPaused = false;
    this.lastTime = performance.now()
    this.render()
  }
  over() {
    this.isPaused = true;
    over_popup.classList.remove('hidden')
    overName.innerText = inputUser.username
    overTimer.innerText = `${Math.floor(this.timer / 60)}:${Math.floor(this.timer % 60)}`
    overBreaks.innerText = this.breaks
    overTnt.innerText = this.tnt
    overIce.innerText = this.ice
  }
  restart() {
    this.hearts = 3;
    this.breaks = 0;
    this.isPaused = false;
    this.tnt = 0;
    this.ice = 0
    this.maps = Game.generateWall()
    this.bgImage = image('./Images/background.jpg')
    this.player = new Player(64 * 1, 64 * 1)
    this.enemies = Array(parseInt(inputUser.level)).fill().map(() => new Dog(64 * random(1, 8), 64 * random(1, 5)))
    this.lastTime = performance.now()
    this.timer = 0;
    this.items = [];
    this.walls = []
    this.bombs = []
    this.explosions = []
    this.countdown = 3;
    this.render()
    leader_popup.classList.add('hidden')
  }
  pause() {
    pause_popup.classList.remove('hidden')
    this.isPaused = true;
  }
  update() {
    const currentTime = performance.now()
    deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime
    if (this.countdown > 0) {
      this.countdown -= deltaTime
      return
    }
    if (this.hearts <= 0) {
      this.over()
      return;
    }
    this.enemies.forEach(enemy => {
      if (this.player.x == enemy.x && this.player.y == enemy.y) {
        this.over()
      }
    })
    this.items.forEach((item, i) => {
      if (this.player.x == item.x && this.player.y == item.y) {
        this.items.splice(i, 1)
        if (item.name == 'ice') {
          this.ice++
        }
        if (item.name == 'tnt') {
          this.tnt++
        }
        this.hearts--
      }
    })
    this.maps.forEach((wall, i) => {
      if (wall.name != 'brick') {
        return
      }
      this.explosions.forEach((item, j) => {
        if (Game.collide(wall, item)) {
          this.maps.splice(i, 1)
          this.breaks++
          if (this.items)
            if (Math.random() > 0.5) {
              this.items.push(Math.random() > 0.5 ? Math.random() > 0.5 ? new Tnt(wall.x, wall.y) : new BrokenHeart(wall.x, wall.y) : new Ice(wall.x, wall.y))
            }
        }

      })
    })
    this.explosions.forEach((item, i) => {
      if (this.player.x == item.x && this.player.y == item.y) {
        this.explosions.splice(i, 1)
        this.hearts--
        return;
      }
      if (item.timer < 0) {
        this.explosions.splice(i, 1)
      }
      // if (Game.collide(this.player, item)) {
      //   console.log('ok')
      // }
    })
    this.bombs.forEach((bomb, i) => {
      if (bomb.timer < 0) {
        this.bombs.splice(i, 1)
        this.explosions.push(new Explosion(bomb.x, bomb.y))
        this.explosions.push(new Explosion(bomb.x - 64, bomb.y), new Explosion(bomb.x + 64, bomb.y), new Explosion(bomb.x, bomb.y + 64), new Explosion(bomb.x, bomb.y - 64))
      }
    })
    this.timer += deltaTime
  }
  render() {
    this.update()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(this.bgImage, 0, 0)
    this.maps.forEach(item => item.draw())
    this.enemies.forEach(item => item.draw())

    this.walls.forEach(item => item.draw())
    this.items.forEach(item => {
      item.draw()
    });
    this.player.draw()
    this.bombs.forEach(item => item.draw())
    this.explosions.forEach(item => item.draw())
    this.render_ui()
    if (this.isPaused) return;
    requestAnimationFrame(() => this.render())
  }
  render_ui() {
    ctx.font = 'bold 50px Arial'
    if (this.countdown > 0) {
      ctx.fillText(Math.ceil(this.countdown), canvas.width / 3, canvas.height / 2)
    }
    ctx.font = 'bold 20px Arial'
    ctx.fillText(`Player : ${inputUser.username}`, canvas.width - 250, 75)
    ctx.fillText(`Timer : ${Math.floor(this.timer / 60)}:${Math.floor(this.timer % 60)}`, canvas.width - 250, 100)
    ctx.fillText(`Hearts : ${this.hearts}`, canvas.width - 250, 150)
    ctx.fillText(`Breaked : ${this.breaks}`, canvas.width - 250, 180)
    ctx.fillText(`Ice : ${this.ice}`, canvas.width - 250, 210)
    ctx.fillText(`Tnt : ${this.tnt}`, canvas.width - 250, 240)

  }
  listener() {
    window.addEventListener('keydown', (e) => {
      const { code } = e
      if (code == 'Escape') {
        if (this.isPaused) {
          this.resume()
        } else {
          this.pause()
        }
      }
      if (code == 'Space') {
        this.bombs.push(new Bomb(this.player.x, this.player.y))
      }
      switch (code) {
        case 'KeyA':
          this.player.vx = -1
          break;
        case 'KeyD':
          this.player.vx = 1
          break;
        case 'KeyW':
          this.player.vy = -1
          break;
        case 'KeyS':
          this.player.vy = 1
          break;

        default:
          break;
      }
    })
    window.addEventListener('keyup', (e) => {
      const { code } = e

      switch (code) {
        case 'KeyA':
          this.player.vx = 0
          break;
        case 'KeyD':
          this.player.vx = 0
          break;
        case 'KeyW':
          this.player.vy = 0
          break;
        case 'KeyS':
          this.player.vy = 0
          break;

        default:
          break;
      }
    })
  }
}

function main() {
  game = new Game()
}

// main()

function image(url) {
  const gambar = new Image()
  gambar.src = url
  return gambar
}

function random(min, max) {
  return Math.round((Math.random() * (max - min)) + min)
}

function save_score() {
  const scores = JSON.parse(localStorage.getItem('scores') || '[]')

  scores.push({
    username: inputUser.username,
    time: `${Math.floor(game.timer / 60)}:${Math.floor(game.timer % 60)}`,
    breaks: game.breaks,
    tnt: game.tnt,
    ice: game.ice,
  })
  localStorage.setItem('scores', JSON.stringify(scores))
  loadScore()
}

function loadScore() {
  let html = ''
  const scores = JSON.parse(localStorage.getItem('scores') || '[]')

  scores.forEach(item => {
    html += `
         <tr>
            <th>${item.username}</th>
            <th>${item.time}</th>
            <th>${item.breaks}</th>
            <th>${item.tnt}</th>
            <th>${item.ice}</th>
          </tr>
    `
  })
  leaderboard.innerHTML = html;
}
loadScore()

function reset() {
  localStorage.removeItem('scores')
  loadScore()
}
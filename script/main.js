import Game from './Game.js'

// CONSTANTS
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 2.5
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)

const gameSettings = ({
  id: '#game-screen',
  loopInterval: LOOP_INTERVAL
})

const p1Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_HEIGHT
  },
  initVelocity: VELOCITY,
  initPos: { x: 0, y: 0},
  initBackground: 'blue',
  movementKeys: {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  },
  attackKeys:{
    left: 65,
    up: 87,
    right: 68,
    down: 83
  }
}

const p2Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_HEIGHT
  },
  initVelocity: VELOCITY,
  initPos: { x: GAME_WIDTH - CHARACTER_WIDTH, y: GAME_HEIGHT - CHARACTER_HEIGHT},
  initBackground: 'red',
  movementKeys: {
    left: 65,
    up: 87,
    right: 68,
    down: 83
  }
}

const game = new Game(gameSettings)
game.addCharacter(p1Settings)
game.addCharacter(p2Settings)
game.startGame()

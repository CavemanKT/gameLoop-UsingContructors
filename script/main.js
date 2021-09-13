import Game from './Game.js'

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
$(canvas).appendTo('#game-screen')

// CONSTANTS
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 5
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)

//ENEMY CONSTANT
const ENEMY_WIDTH = CHARACTER_WIDTH - 20
const ENEMY_HEIGHT = CHARACTER_HEIGHT - 20
const VELOCITYe = 1

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

const enemySetting = {                 // only define value, anything to do with motion, has to be done in Enemy.js
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: Math.round(Math.random() * (GAME_WIDTH - ENEMY_WIDTH)),
    Ye: Math.round(Math.random() * (GAME_HEIGHT - ENEMY_HEIGHT)),
  },
  initBackground: 'red',

}

const game = new Game(gameSettings)
game.addCharacter(p1Settings)
// game.addCharacter(p2Settings)



game.addEnemy(enemySetting)
game.addEnemy(enemySetting)

game.addEnemy(enemySetting)



// if( nextLevel && amountEnemy <= 10 ){
  // game.addCharacter(enemySetting)
// }

game.startGame()

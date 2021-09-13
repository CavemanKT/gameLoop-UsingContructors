import Game from './Game.js'

// CONSTANTS
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 10
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
  life: 3,
  initDimension: {
    WIDTHc: CHARACTER_WIDTH,
    HEIGHTc: CHARACTER_HEIGHT
  },
  initVelocity: VELOCITY,
  initPos: { Xc: 0, Yc: 0},
  initBackground: 'blue',
  movementKeys: {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  }
}


let randX = function randomPositionForX() {
  return Math.round(Math.random() * (GAME_WIDTH - ENEMY_WIDTH))
}

let randY = function randomPositionForY () {
  return Math.round(Math.random() * (GAME_HEIGHT - ENEMY_HEIGHT))
}

let randId = function randomIdForEnemy () {
  return `_${Math.random().toString(36).substring(2, 15)}`
}

const enemySetting = {                 // only define value, anything to do with motion, has to be done in Enemy.js
  newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'red'
}

const enemySetting2 = {
  // newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'green'
}


const enemySetting3 = {
  // newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'red'
}

const enemySetting4 = {
  // newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'green'
}


const game = new Game(gameSettings)
game.addCharacter(p1Settings)
game.addEnemy(enemySetting)
game.addEnemy(enemySetting2)
game.addEnemy(enemySetting3)
game.addEnemy(enemySetting4)



// if( nextLevel && amountEnemy <= 10 ){
//   game.addCharacter(enemySetting)
// }

game.startGame()

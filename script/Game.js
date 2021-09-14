import Character from './Character.js'
import Enemy from './Enemy.js'
import Cave from './Cave.js'

// CONSTANTS
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 10


//ENEMY CONSTANT
const ENEMY_WIDTH = CHARACTER_WIDTH - 20
const ENEMY_HEIGHT = CHARACTER_HEIGHT - 20
const VELOCITYe = 1

function Game({ id, loopInterval }) {
  const game = {
    $elem: $(id),
    id,
    loop: null,
    loopCollisionToEnemy: null,
    character: null,
    cave: null,
    enemies: []
  }

  // Handling Key Down
  const handleKeyDown = (e) => {
    game.character.setCharacterMovement(true, e.keyCode)
  }

  // Handling Key Up
  const handleKeyUp = (e) => {
    game.character.setCharacterMovement(false, e.keyCode)
  }

  const updateMovements = () => {
    game.character.moveCharacter()
    game.enemies.forEach((enemy) => {
      enemy.moveCharacter(game.character)
    })

  }

  const collisionSystem = () => {
    game.enemies.forEach((enemy) => {
      game.character.collisionToEnemy(enemy)
    })
  }

  const entryDetection = () => {
    var levelNum = game.cave.entryDetection(game.character)  // we have 'entryDetection' here
    this.nextLevel(levelNum)

  }

  this.nextLevel = (levelNum) => {
    game.enemies.forEach((enemy) => {
      enemy.triggerCharacterAttributeInNextLevel(game.character, levelNum)
      // game.cave.triggerEnemyAttributeInNextLevel(enemy)
    })
  }

  this.addCharacter = (setting) => {
    let newChar = new Character(setting, game.$elem)
    game.character = newChar

  }

  this.addEnemy = (setting) => {
    let newEnemy = new Enemy(setting)
    game.enemies.push(newEnemy)
  }

  this.addCave = (setting) => {
    game.cave = new Cave(setting)
  }

  this.startGame = () => {
    $(document).on('keydown', handleKeyDown)
    $(document).on('keyup', handleKeyUp)

    game.loop = setInterval(updateMovements, loopInterval)
    game.loopCollisionToEnemy = setInterval(collisionSystem, 300)
    game.loopEntryDetection = setInterval(entryDetection,1000)

  }

  // this.gameOver = () => {
  //   game.character
  // }

}

export default Game

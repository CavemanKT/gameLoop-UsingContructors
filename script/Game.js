import Character from './Character.js'
import Enemy from './Enemy.js'



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
    loopCollision: null,
    character: null,
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

  this.addCharacter = (setting) => {
    let newChar = new Character(setting, game.$elem)
    game.character = newChar

  }

  this.addEnemy = (setting) => {
    let newEnemy = new Enemy(setting, game.$elem)
    game.enemies.push(newEnemy)
  }

  this.startGame = () => {
    $(document).on('keydown', handleKeyDown)
    $(document).on('keyup', handleKeyUp)

    game.loop = setInterval(updateMovements, loopInterval)
    game.loopCollision = setInterval(collisionSystem, loopInterval / 5)


  }

  // this.gameOver = () => {
  //   game.character
  // }

}

export default Game

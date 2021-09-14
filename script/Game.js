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
    $divWrapper: null,
    $restartBtn: null,
    $restartMsg: null,
    $startBtn: null,
    $elem: $(id),
    id,
    loop: null,
    loopCollisionToEnemy: null,
    loopCheckIfLost: null,
    character: null,
    cave: null,
    enemies: [],
    prevLevel: 0,
    diffLevel: 0,
    levelNum: 0,

  }

  // Handling Key Down
  const handleKeyDown = (e) => {
    game.character.setCharacterMovement(true, e.keyCode)
  }

  // Handling Key Up
  const handleKeyUp = (e) => {
    game.character.setCharacterMovement(false, e.keyCode)
  }


// the BEGINNING of the startBtn        =============================================
  const wrapperForStartBtn = () => {
    game.$divWrapper = $('<div id="div-wrapper"></div>')
    game.$divWrapper
        .css('background-color', '#345B63')
        .css('width', '1024px')
        .css('height', '864px')
        .css('display', 'flex')
        .css('position', 'relative')
        .appendTo('#data-bar')
  }

  const start = () => {
    wrapperForStartBtn()
    game.$startBtn = $("<button id='#startBtn'>START</button>")
    game.$startBtn
        .css('width', '150px')
        .css('height', '80px')
        .css('background-color', '#D4ECDD')
        .css('position', 'relative')
        .css('justify-content', 'center')
        .css('align-item', 'center')
        .appendTo(game.$divWrapper)
  }

  const handleStartBtn = () => {
    game.$elem.removeAttr('hidden')
    game.$divWrapper.hide()
    game.$startBtn.hide()
  }
// the END of the startBtn  ========================================================

  const updateMovements = () => {
    game.character.moveCharacter()
    game.enemies.forEach((enemy) => {
      enemy.moveCharacter(game.character)
    })
  }

  const collisionSystem = () => {
    game.enemies.forEach((enemy) => {
      game.character.collisionToEnemy(enemy) // it returns value of life, in case you want to do something about it.
    })

  }

  const entryDetection = () => {
    game.levelNum = game.cave.entryDetection(game.character)  // we have 'entryDetection' here
    nextLevel(game.levelNum)
    checkIfReachTheGate(game.levelNum)
  }

  const checkIfReachTheGate = (levelNum) => {
    game.diffLevel = levelNum - game.prevLevel
    if(levelNum){
      game.prevLevel = levelNum
    }
    if (game.diffLevel) {
      game.character.charReachTheGate()
      game.character.addPoint()
      game.enemies.forEach((enemy) => {
        enemy.resetEnemyPos(GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT)
      })
    }
  }

  const nextLevel = (levelNum) => {
    game.enemies.forEach((enemy) => {
      enemy.triggerCharacterAttributeInNextLevel(game.character, levelNum)
    })
  }

// Beginning of the restartBtn      ===================================================
  const restartBtn = () => {
    game.$restartMsg = $('<h3 id="#restartMsg">You are being brought back to hell.</h3>')
    game.$restartMsg
        .css('text-align', 'center')
        .css('position', 'relative')
        .css('align-item', 'center')
        .css('justify-content', 'center')
        .css('font-size', '28px')
        .css('font-weight', '900')
        .appendTo(game.$divWrapper)
    game.$restartBtn = $('<button id="restartBtn">RESTART</button>')
    game.$restartBtn
        .css('width', '150px')
        .css('height', '80px')
        .css('background-color', '#E8F6EF')
        .css('position', 'relative')
        .css('justify-content', 'center')
        .css('align-item', 'center')
        .appendTo(game.$divWrapper)
  }

  const gameOverShowUp = () => {
    game.$elem.attr('hidden')
    game.$divWrapper.show()
    restartBtn()
  }

  const gameOver = () => {
    const {
      life
    } = game.character
    console.log('is this gameOver', life);
    if (life == -1) {
      gameOverShowUp()
    }
  }

  const handleRestartBtn = () => {
    game.$elem.removeAttr('hidden')
    game.$divWrapper.hide()
    game.$restartMsg.hide()
    game.$restartBtn.hide()
  }
// the END of the restartBtn  =======================================================

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
    start()
    game.$startBtn.on('click', handleStartBtn)
    // game.$restartBtn.on('click', handleRestartBtn)

    game.loop = setInterval(updateMovements, loopInterval)
    game.loopCollisionToEnemy = setInterval(collisionSystem, 300)
    game.loopEntryDetection = setInterval(entryDetection,500)
    game.loopCheckIfLost = setInterval(gameOver, 1000);

  }


}

export default Game

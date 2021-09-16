function Enemy ( { newId, initDimension, initVelocity, initPos, initBackground, } ) {
  const enemy = {
    level: 0,
    $elem: null,
    id: newId,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    background: initBackground,
    $levelBar: null,
    $bloodBar: null,
    $lifeBar: null,
    $pointBar: null,
    $eventBar: null,
    $dataBar: null
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { Xe, Ye }, dimension: { WIDTHe, HEIGHTe }, background } = enemy
    enemy.$elem = $(`<div id="${id}"></div>`)
      .css('left', Xe)
      .css('top', Ye)
      .css('background', background)
      .css('background-size', 'cover')
      .css('width', WIDTHe)
      .css('height', HEIGHTe)
      .css('position', 'absolute')
      .appendTo('#game-screen')
  }

  init()

  // trigger event
  this.slowDownSpeed = () => {
    if(enemy.velocity > 0.1) {
      enemy.velocity -= 0.09
    }
  }

  // Everytime this gets invoked, update character position
  this.moveCharacter = (character) => {

    const {
      velocity: Ve,
      position: { Xe, Ye }
    } = enemy

    const {
      position: { Xc, Yc}
    } = character

    let newX = Xe
    let newY = Ye

    if ( Xe < Xc ) {
      newX += Ve
    }
    if ( Xe > Xc ) {
      newX -= Ve
    }
    if ( Ye < Yc) {
      newY += Ve
    }
    if ( Ye > Yc) {
      newY -= Ve
    }




      // this.lv5Tactic = (GAME_WIDTH, GAME_HEIGHT) => {   // once enter lv5, trigger tactic every 10s
  //   const {
  //     velocity: Ve,
  //     position: { Xe, Ye }
  //   } = enemy
  // // change tactic according to which key I press

  // }

    this.updateEnemyPos(newX, newY)
  }

  let curLv = 0
  // let prevLv

  const changesInAttributesByLevel = ( sizechange, levelBar, levelNum, Ve, imgUrl ) => {
    sizeChange(sizechange)
    updateData(levelBar, levelNum)
    enemy.velocity = Ve
    imgChange(imgUrl)
    curLv = levelNum    // how to win by entering the final gate at lv 10
  }

  this.triggerEnemyAttributeInNextLevel = (character, levelNum) => {
    const {
      velocity,
      dimension: {
        WIDTHc,
        HEIGHTc
      },
      position: {
        Xc,
        Yc
      }
    } = character


    switch (levelNum) {
      case 1:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/Townsfolk_M_Walk_4.png' )
        break;
      case 2:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.6, 'img/Executioner_Walk_1.png' )
        break;
      case 3:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.6, 'img/Thief_Walk_3.png' )
      case 4:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/wraith.png' )
        break;
      case 5:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/GhostChloeSprite012.png' )
        break;
      case 6:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/HeavyKnight_Idle_1.png' )
        break;
      case 7:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/King_Idle_3.png' )
        break;
      case 8:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/LargeEliteKnight_Idle_1.png' )
        break;
      case 9:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/MountainKing_Idle + Walk_1.png')
        break;
        case 10:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/wraith.png' )
        break;
      default:
        break;
    }

    if ( levelNum > curLv ) {
      // prevLv = levelNum
      $('#game-screen').hide()
      $('#div-wrapper').show()
      $('h3').text('Congratulation!! you won !!').show()
      $('#restart-btn').show()
    }

  }

  const imgChange = (url) => {
    enemy.$elem
          .css('background', `url(${url})`)
          .css('background-size', 'cover')
  }

  this.resetEnemyPos = (GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT) => {
    // console.log('enemy.resetEnemyPos has been called');
    enemy.position.WIDTHe = Math.round(Math.random() * (GAME_WIDTH - ENEMY_WIDTH))
    enemy.position.HEIGHTe = Math.round(Math.random() * (GAME_HEIGHT - ENEMY_HEIGHT))
    this.updateEnemyPos(enemy.position.WIDTHe, enemy.position.HEIGHTe)

  }
  const sizeChange = (size) => {
    enemy.dimension.WIDTHe = size
    enemy.dimension.HEIGHTe = size
    enemy.$elem
      .css('width', enemy.dimension.WIDTHe)
      .css('height', enemy.dimension.HEIGHTe)
  }
  const removeData = (levelNumElem) => {
    levelNumElem.remove(":contains('level')")
  }
  const addData = (levelNumber) =>{
    enemy.$levelBar = $('<p id="levelNum"></p>')
    enemy.$levelBar
        .text(`level ${levelNumber}`)
        .css('font-size', '28px')
        .css('font-weight', '10')
        .css('position', 'absolute')
        .css('bottom', '-25px')
        .css('left', '20px')
        .appendTo('#data-bar')
  }
  addData(0)  // initialize the level number
  const updateData = (levelNumElem, levelNumber) => {
    removeData(levelNumElem)
    addData(levelNumber)
  }
  this.updateEnemyPos = (newX, newY) => {
    enemy.position.Xe = newX
    enemy.position.Ye = newY
    enemy.$elem.css('left', newX).css('top', newY)
  }

// beginning of the getters
  Object.defineProperties(this, {
    dimension: {
      get: function() {
        return {
          ...enemy.dimension
        }
      }
    },
    position: {
      get: function() {
        return {
          ...enemy.position
        }
      }
    }
  })
  // ends of the getters
}

export default Enemy

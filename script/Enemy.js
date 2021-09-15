function Enemy ( { newId, initDimension, initVelocity, initPos, initBackground, } ) {
  const enemy = {
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

  console.log(enemy.position);

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { Xe, Ye }, dimension: { WIDTHe, HEIGHTe }, background } = enemy
    enemy.$elem = $(`<div id="${id}"></div>`)
      .css('left', Xe)
      .css('top', Ye)
      .css('background', "url('img/wraith.png')")
      .css('background-size', 'cover')
      .css('width', WIDTHe)
      .css('height', HEIGHTe)
      .css('position', 'absolute')
      .appendTo('#game-screen')
  }

  init()

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
      sizeChange(40)
      speedChange(1)
      updateData(enemy.$levelBar, levelNum)
      break;
    case 2:
      sizeChange(40)
      speedChange(1.5)
      updateData(enemy.$levelBar, levelNum)
      break;
    case 3:
      sizeChange(50)
      speedChange(2)
      updateData(enemy.$levelBar, levelNum)
      break;
    case 4:
      imgChange('img/Executioner_Idle_4.png')
      break;
    default:
      // console.log(levelNum);
      break;
    }

  }


  this.updateLv0 = (levelNum) => {
    console.log('enemy.updateLv0 has been called');
    levelNum = 0
    updateData(enemy.$levelBar, levelNum)
  }

  this.resetEnemyPos = (GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT) => {
    console.log('enemy.resetEnemyPos has been called');
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
  const speedChange = (speed) => {
    enemy.velocity = speed
  }
  const imgChange = (url) => {
    enemy.$elem
        .removeClass('background')
        .css('background-image', url)
  }

// update levelNumber
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

// update Pos
  this.updateEnemyPos = (newX, newY) => {
    enemy.position.Xe = newX
    enemy.position.Ye = newY
    enemy.$elem.css('left', newX).css('top', newY)
  }


// beginning of the getters          ===========================================
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

// ends of the getters     =======================================================
  })
}

export default Enemy

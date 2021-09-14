function Enemy ( { newId, initDimension, initVelocity, initPos, initBackground, } ) {
  const enemy = {
    $elem: null,
    id: newId,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    background: initBackground,
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { Xe, Ye }, dimension: { WIDTHe, HEIGHTe }, background } = enemy
    enemy.$elem = $(`<div id="${id}"></div>`)
      .css('left', Xe)
      .css('top', Ye)
      .css('background', background)
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

    this.updateEnemyPos(newX, newY)
  }


  this.triggerCharacterAttributeInNextLevel = (character, levelNum) => {
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
        console.log(enemy.dimension.WIDTHe, enemy.dimension.HEIGHTe);
        enemy.dimension.WIDTHe = 100
        enemy.dimension.HEIGHTe = 100
        console.log(enemy.dimension.WIDTHe, enemy.dimension.HEIGHTe);
        enemy.$elem
              .css('width', enemy.dimension.WIDTHe)
              .css('height', enemy.dimension.HEIGHTe)
        console.log(
          $('<p id="levelNum"></p>').appendTo('#data-table').text(`${levelNum}`).css('float','right')

        );


        break;

      default:
        console.log('default');
        break;
    }
  }


  // this.lv5Tactic = (GAME_WIDTH, GAME_HEIGHT) => {   // once enter lv5, trigger tactic every 10s
  //   const {
  //     velocity: Ve,
  //     position: { Xe, Ye }
  //   } = enemy
  // // change tactic according to which key I press

  // }


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

// ends of the getters
  })
}

export default Enemy

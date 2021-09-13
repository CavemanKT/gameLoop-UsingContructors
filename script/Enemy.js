function Enemy ( { newId, initDimension, initVelocity, initPos, initBackground, }, $game ) {
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
      // console.log(Ve);
      // console.log(Xe);
    }
    if ( Xe > Xc ) {
      newX -= Ve
      // console.log(Xe);

    }
    if ( Ye < Yc) {
      newY += Ve
      // console.log(Ye);

    }
    if ( Ye > Yc) {
      newY -= Ve
      // console.log(Ye);
    }

    this.updateEnemyPos(newX, newY)
  }

  this.updateEnemyPos = (newX, newY) => {
    enemy.position.Xe = newX
    enemy.position.Ye = newY
    enemy.$elem.css('left', newX).css('top', newY)
  }

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
}

export default Enemy

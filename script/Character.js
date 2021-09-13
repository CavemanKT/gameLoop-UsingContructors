function Character({ life, initDimension, initVelocity, initPos, initBackground, movementKeys }, $game) {
  const character = {
    life: life,
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    background: initBackground,
    movementKeys,
    movement: {
      left: false,
      up: false,
      right: false,
      down: false
    },
    gameOver: false
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { Xc, Yc }, dimension: { WIDTHc, HEIGHTc }, background } = character
    character.$elem = $(`<div id="${id}"></div>`)
      .css('left', Xc)
      .css('top', Yc)
      .css('background', background)
      .css('width', WIDTHc)
      .css('height', HEIGHTc)
      .css('position', 'absolute')
      .appendTo('#game-screen')
  }

  init()

  // Toggle which direction the character is moving to
  this.setCharacterMovement = (value, keyCode) => {
    const { movementKeys: { left, up, right, down } } = character
    switch (keyCode) {
      case left:
        character.movement.left = value
        break
      case up:
        character.movement.up = value
        break
      case right:
        character.movement.right = value
        break
      case down:
        character.movement.down = value
        break
    }
  }

  // Everytime this gets invoked, update character position
  this.moveCharacter = () => {
    const gameW = $game.width()
    const gameH = $game.height()
    const {
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
      movement: { left, up, right, down }
    } = character

    let newX = Xc
    let newY = Yc

    if (left) {
      newX = Xc - velocity < 0 ? 0 : newX - velocity
    }
    if (up) {
      newY = Yc - velocity < 0 ? 0 : newY - velocity
    }
    if (right) {
      newX = Xc + WIDTHc + velocity > gameW ? gameW - WIDTHc : newX + velocity
    }
    if (down) {
      newY = Yc + HEIGHTc + velocity > gameH ? gameH - HEIGHTc : newY + velocity
    }

    this.updateCharacterPos(newX, newY)
  }

  this.collisionToEnemy = (enemy) => {
    const { position: {Xe, Ye}, dimension: { WIDTHe, HEIGHTe} } = enemy
    const {
      life: { life },
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    if (Xe < Xc + WIDTHc && Xe + WIDTHe > Xc &&
      Ye < Yc + HEIGHTc && Ye + HEIGHTe > Yc) {
        // collision detected!
        if(life > 0){
          life--
          setInterval(() => {
            character.$elem.toggleClass('get-hit')
          }, 10000);
        } else {
          // console.log(life);
        }
    }
  }


















  this.updateCharacterPos = (newX, newY) => {
    character.position.Xc = newX
    character.position.Yc = newY
    character.$elem.css('left', newX).css('top', newY)
  }

  Object.defineProperties(this, {
    dimension: {
      get: function() {
        return {
          ...character.dimension
        }
      }
    },
    position: {
      get: function() {
        return {
          ...character.position
        }
      }
    }
  })
}

export default Character

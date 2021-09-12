function Character({ initDimension, initVelocity, initPos, initBackground, movementKeys }, $game) {
  const character = {
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
    }
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { x, y }, dimension: { w, h }, background } = character
    character.$elem = $(`<div id="${id}"></div>`)
      .css('left', x)
      .css('top', y)
      .css('background', background)
      .css('width', w)
      .css('height', h)
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
      dimension: { w, h },
      position: { x, y },
      movement: { left, up, right, down }
    } = character

    let newX = x
    let newY = y


    if (left) {
      newX = x - velocity < 0 ? 0 : newX - velocity
    }
    if (up) {
      newY = y - velocity < 0 ? 0 : newY - velocity
    }
    if (right) {
      newX = x + w + velocity > gameW ? gameW - w : newX + velocity
    }
    if (down) {
      newY = y + h + velocity > gameH ? gameH - h : newY + velocity
    }

    character.position.x = newX
    character.position.y = newY
    character.$elem.css('left', newX).css('top', newY)
  }
}

export default Character

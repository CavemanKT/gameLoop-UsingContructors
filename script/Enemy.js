import Character from './Character.js'

function Enemy ( { initDimension, initVelocity, initPos, initBackground, }, $game ) {
    const enemy = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
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
    // console.log(character.position.x, character.position.y);
    character.$elem.css('left', newX).css('top', newY)
  }

}



export default Enemy

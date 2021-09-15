const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 10
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const initBlood = 5 // official initBlood is 5
const initLife = 10
const CHARACTER_POSITION = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - 100
}

function Character({points, blood, life, initDimension, initVelocity, initPos, initBackground, movementKeys }, $game) {
  const character = {
    points: points,
    blood: blood,
    life: life,
    $elem: null,
    $pointsElem: null,
    $lifeElem: null,
    $bloodElem: null,
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
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const {points, blood, life, id, position: { Xc, Yc }, dimension: { WIDTHc, HEIGHTc }, background } = character

    // body
    character.$elem = $(`<div id="${id}"></div>`)
      .css('left', Xc)
      .css('top', Yc)
      .css('background', "url('img/GhostWillySprite000.png')")
      .css('background-size', 'cover')
      .css('width', WIDTHc)
      .css('height', HEIGHTc)
      .css('position', 'absolute')
      .appendTo('#game-screen')

    // points
    character.$pointsElem = $(`<p id="pointsElem"></p>`)
    character.$pointsElem
      .text(`points: ${character.points}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '400px')
      .appendTo('#data-bar')

    // HP
    character.$bloodElem = $(`<p id="bloodElem"></p>`)
    character.$bloodElem
      .text(`HP: ${character.blood}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '800px')
      .appendTo('#data-bar')

    // LIFE
    character.$lifeElem = $(`<p id="lifeElem"></p>`)
    character.$lifeElem
      .text(`Life: ${character.life}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '1000px')
      .appendTo('#data-bar')

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
      // console.log(`${newX} = ${Xc} + ${character.WIDTHc} + ${velocity} > ${gameW} ? ${gameW} - ${WIDTHc} : ${newX} + ${velocity}`);
    }
    if (down) {
      newY = Yc + HEIGHTc + velocity > gameH ? gameH - HEIGHTc : newY + velocity
    }

    this.updateCharacterPos(newX, newY)
  }

  this.collisionToEnemy = (enemy) => {
    const { position: {Xe, Ye}, dimension: { WIDTHe, HEIGHTe} } = enemy
    const {
      blood,
      life,
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character
    // console.log(`Xe= ${Xe}, Xc=${Xc}, WIDTHc=${WIDTHc}, WIDTHe = ${WIDTHe}, Ye=${Ye}, Yc=${Yc}, HEIGHTc=${HEIGHTc}, HEIGHTe=${HEIGHTe}`);
    if (Xe < Xc + WIDTHc && Xe + WIDTHe > Xc &&
      Ye < Yc + HEIGHTc && Ye + HEIGHTe > Yc) {
        // collision detected!
        if(!character.$elem.hasClass('get-hit')){
          var invincible = setInterval(() => {
            character.$elem.toggleClass('get-hit')
          }, 100);
        }

        if(blood > 1){
          console.log(blood);
          character.blood--
          updateHp()
          console.log('lose 1 blood');
        } else {
          character.blood--
          this.resetCharacter()   // basically mean I die
          character.life--
          updateLife()
          console.log('lose 1 life');
        }
    }
    if (true) {
      setTimeout(() => {
        clearInterval(invincible);
        if(character.$elem.hasClass('get-hit')) {
          character.$elem.removeClass('get-hit')
        }
      }, 3000);
    }
  }

  this.resetCharacter = () => {
    const {
      blood,
      life,
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    // character.blood = initBlood
    character.dimension = {
      WIDTHc: WIDTHc,
      HEIGHTc: HEIGHTc
    }
    character.blood = initBlood
    updateHp()
    character.velocity = velocity
    character.position = {Xc: GAME_WIDTH / 2, Yc: GAME_HEIGHT - 100}
  }

  this.restartGame = () => {
  console.log('character.restartGame has been called ');
    const {
      life,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character
    character.velocity = VELOCITY
    console.log('char.velocity', character.velocity);
    character.points = 0
    character.life = initLife
    character.dimension = {CHARACTER_WIDTH, CHARACTER_HEIGHT}
    updateLife()
    updatePoints()
    // points = 0
    // level = 0     // increase enemy's speed along with the level up
    this.resetCharacter()
    console.log('game over, restart the game');
  }

  this.addPoint = () => {
    character.points += 10
    character.$pointsElem
      .text(`points: ${character.points}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '400px')
      .appendTo('#data-bar')
  }

  const updateHp = () => {
    const {
      blood
    } = character
    character.$bloodElem
      .text(`HP: ${blood}`)
      // .css('font-size', '28px')
      // .css('font-weight', '10')
      // .css('position', 'absolute')
      // .css('bottom', '-25px')
      // .css('left', '800px')
      // .appendTo('#data-bar')
  }

  const updateLife = () => {
    const {
      life
    } = character
    character.$lifeElem
      .text(`Life: ${life}`)
      // .css('font-size', '28px')
      // .css('font-weight', '10')
      // .css('position', 'absolute')
      // .css('bottom', '-25px')
      // .css('left', '1000px')
      // .appendTo('#data-bar')
  }

  const updatePoints = () => {
    character.$pointsElem
      .text(`Points: ${character.points}`)
  }
// additional feature: event would be increase life, heal,
// slow enemy down
// increase or slow down character's speed





  this.updateCharacterPos = (newX, newY) => {
    character.position.Xc = newX
    character.position.Yc = newY
    character.$elem.css('left', newX).css('top', newY)
  }

// beginning of the getters
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
    },
    life: {
      get: function () {
        return character.life
      }
    }

  })
  // ends of the getters
}

export default Character

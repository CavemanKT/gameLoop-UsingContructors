const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 10
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const initBlood = 1 // official initBlood is 5


function Character({ blood, life, initDimension, initVelocity, initPos, initBackground, movementKeys }, $game) {
  const character = {
    blood: blood,
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
    // gameOver: false
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
      blood,
      life,
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    if (Xe < Xc + WIDTHc && Xe + WIDTHe > Xc &&
      Ye < Yc + HEIGHTc && Ye + HEIGHTe > Yc) {
        // collision detected!
        if(!character.$elem.hasClass('get-hit')){
          var invincible = setInterval(() => {
            character.$elem.toggleClass('get-hit')
          }, 100);
        }

        if(blood > 0){
          // console.log(blood);
          character.blood--
          console.log('lose 1 blood');
        } else {
          this.resetCharacter()   // basically mean I die
          character.life--
          console.log('lose 1 life');
          if(life === 0) {
            // $('<div id="veil"></div>').appendTo('#game-screen');
            //don't know if it will work
            this.restartGame()     // mean I lost
          }
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

    character.blood = initBlood
    character.dimension = {
      WIDTHc: WIDTHc,
      HEIGHTc: HEIGHTc
    }
    character.velocity = velocity
    character.position = {Xc: GAME_WIDTH / 2, Yc: GAME_HEIGHT - 100}
  }

  this.restartGame = () => {
    const {
      life,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    character.life = life
    character.dimension = {WIDTHc, HEIGHTc}
    // points = 0
    // level = 0     // increase enemy's speed along with the level up
    this.resetCharacter()
    console.log('game over, restart the game');
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
    }

  })
  // ends of the getters
}

export default Character

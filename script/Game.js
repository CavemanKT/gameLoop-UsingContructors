import Character from './Character.js'

function Game({ id, loopInterval }) {
  const game = {
    $elem: $(id),
    id,
    loop: null,
    characters: []
  }

  // Handling Key Down
  const handleKeyDown = (e) => {
    game.characters.forEach((character) => {
      character.setCharacterMovement(true, e.keyCode)
    })
  }

  // Handling Key Up
  const handleKeyUp = (e) => {
    game.characters.forEach((character) => {
      character.setCharacterMovement(false, e.keyCode)
    })
  }

  const updateMovements = () => {
    game.characters.forEach((character) => {
      character.moveCharacter()
    })
  }

  this.addCharacter = (setting) => {
    game.characters.push(new Character(setting, game.$elem))
  }

  this.startGame = () => {
    $(document).on('keydown', handleKeyDown)
    $(document).on('keyup', handleKeyUp)

    game.loop = setInterval(updateMovements, loopInterval)
  }
}

export default Game

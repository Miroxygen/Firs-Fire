import './components/html/game-window.js'

export class FirsAndFire {
  constructor() {

  }

  startGame(startButton, attachment) {
    startButton.addEventListener('click', () =>{
      const gameWindow = document.createElement('game-window')
      attachment.append(gameWindow)
    })
  }
}
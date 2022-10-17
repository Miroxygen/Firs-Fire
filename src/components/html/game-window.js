/**
 * Mountain for map.js
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

import './button.js'
import './before-start.js'
import './game-board.js'
import './die-ui.js'
import './game-piece.js'
import './event-handler.js'
import './game-battle.js'
import './end-screen.js'
import './game-instructions.js'

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #window {
     height:800px;
     width:1600px;
     background: #A9B34C;
     position:absolute;
 }

 #beforeStart {
  position:absolute;
  z-index:10;
 }
 #dieUi {
  margin:600px 0px 0px 950px;
  position:absolute;
 }

 #battle {
  z-index:10;
  position:absolute;
 }

 .hidden {
  display:none;
 }
 </style>
 <end-screen id="endScreen" class="hidden"></end-screen>
 <div id="window">
    <game-instructions></game-instructions>
    <game-battle id="battle" class="hidden"></game-battle>
    <event-handler id="eventHandler" class="hidden"></event-handler>
    <game-board id="gameBoard" class="hidden">
        <game-piece id="piece"></game-piece>
    </game-board>
    <die-ui id="dieUi" class="hidden"></die-ui>
    <simple-button id="moveButton" class="hidden">Make move</simple-button>
    <before-start id="beforeStart"></before-start>
 </div>
 `
 
  
 /**
  * The backbone of the gamingcomponent.
  * @type {HTMLElement}
  */
  export class GameWindow extends HTMLElement {
     
     #window
     #beforeStart
     #gameBoard
     #mapHolder
     #moveButton
     #dieUi
     #piece
     #mapConfirmation
     #eventHandler
     #battle
     #endScreen

     constructor () {
       super()

       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
         
       this.#window = this.shadowRoot.querySelector('#window')
       this.#beforeStart = this.shadowRoot.querySelector('#beforeStart')
       this.#gameBoard = this.shadowRoot.querySelector('#gameBoard')
       this.#moveButton = this.shadowRoot.querySelector('#moveButton')
       this.#dieUi = this.shadowRoot.querySelector('#dieUi')
       this.#piece = this.shadowRoot.querySelector('#piece')
       this.#eventHandler = this.shadowRoot.querySelector('#eventHandler')
       this.#battle = this.shadowRoot.querySelector('#battle')
       this.#endScreen = this.shadowRoot.querySelector('#endScreen')

       this.characterForBattle = undefined
       this.monsterForBattle = undefined

       this.#window.addEventListener('parametersDecided', () => {
        this.generateGameBoard()
       })

       this.#window.addEventListener('mapDecided', () => {
        this.startGame()
       })

       this.#window.addEventListener('dieRolled', () => {
        this.makeMove()
        this.getEvent()
       })

       this.#window.addEventListener('eventOver', () => {
        this.newTurn()
       })

       this.#window.addEventListener('monsterFight', () => {
        this.doBattle()
       })

       this.#window.addEventListener('monsterDied', () => {
        this.endBattleMonsterDied()
       })

       this.#window.addEventListener('characterDied', () => {
        this.endBattleCharacterDied()
       })
     }

     startGame() {
      this.#dieUi.classList.remove('hidden')
      this.#eventHandler.classList.remove('hidden')
     }

      generateGameBoard() {
        const numberOfCharacters = this.#beforeStart.getGameParameters()
        this.#beforeStart.remove()
        this.#gameBoard.classList.remove('hidden')
        this.#gameBoard.generateGameContent(numberOfCharacters)
      }

      newTurn() {
        this.#dieUi.makeRollVisible()
        this.#dieUi.removeFaces()
      }

      makeMove() {
        const dieValue = this.#dieUi.getDieValue()
        this.#piece.move(dieValue)
      }

      getEvent() {
        this.#eventHandler.getRandomEvent()
        this.#eventHandler.showEventButton()
      }

      doBattle() {
        this.pauseDieAndEvent()
        if(this.isBossReady()) {
          this.getBoss()
          this.getBossEvent()
        } else {
          this.getRegularMonster()
        }
        this.getCharacter()
        this.startBattle()
      }

      /**
       * Hides the die and eventhandler during battle.
       */
       pauseDieAndEvent() {
        this.#eventHandler.hideEventButton()
        this.#dieUi.classList.toggle('hidden')
      }

      isBossReady() {
        if(this.#gameBoard.getNumberOfMonsters() === 0) {
          return true
        } else {
          return false
        }
      }

      getBoss() {
        this.#battle.bossBattle()
        this.monsterForBattle = this.#gameBoard.getBoss()
      }

      getBossEvent() {
        this.#eventHandler.getBossEvent()
      }

      getRegularMonster() {
        this.monsterForBattle = this.#gameBoard.getMonsterForFight()
      }

      getCharacter() {
        this.characterForBattle = this.#gameBoard.getCharacterForFight()
      }

      startBattle() {
        this.#battle.classList.toggle('hidden')
        this.#battle.startBattle(this.monsterForBattle.getMonsterAttributes(),this.characterForBattle.getCharacterAttributes(), false)
      }

      endBattleCharacterDied() {
        this.removeDeadCharacter()
        if(this.#gameBoard.getNumberOfCharacters() !== 0) {
          this.getCharacter()
          this.continueBattleWithNewCharacter()
        } else {
          this.gameLost()
        }
      }

      removeDeadCharacter() {
        this.#gameBoard.removeCharacter(this.characterForBattle)
      }

      /**
       * If character died and player still has character, continue the battle with new one.
       */
      continueBattleWithNewCharacter() {
        this.#battle.continueBattle(this.characterForBattle.getCharacterAttributes())
      }

      endBattleMonsterDied() {
        if(this.isBossReady()) {
          this.gameWon()
        } else {
          this.removeDeadMonster()
          this.resetUiAfterBattle()
          this.newTurn()
        }
      }

      removeDeadMonster() {
        this.#gameBoard.removeMonster(this.monsterForBattle)
      }

      /**
       * Hides battle window and shows the die again.
       */
      resetUiAfterBattle() {
        this.#battle.classList.add('hidden')
        this.#dieUi.classList.toggle('hidden')
      }

      gameWon() {
        this.displayEndScreen()
        this.#endScreen.displayWin()
      }

      gameLost() {
        this.displayEndScreen()
        this.#endScreen.displayLoss()
      }

      displayEndScreen() {
        this.#window.remove()
        this.#endScreen.classList.remove('hidden')
      }
   }

   customElements.define('game-window', GameWindow)
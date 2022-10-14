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

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #window {
     height:800px;
     width:1600px;
     background: linear-gradient(194deg, rgba(186,184,182,1) -100%, rgba(62,60,60,1) 100%);
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

 <div id="window">
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
        this.#eventHandler.setRandomEvent(this.isBossReady())
        this.#eventHandler.showEventButton()
      }

      isBossReady() {
        if(this.#gameBoard.getNumberOfMonsters() === 0) {
          return true
        } else {
          return false
        }
      }

      doBattle() {
        this.#eventHandler.hideEventButton()
        this.#dieUi.classList.toggle('hidden')
        if(this.isBossReady()) {
          this.#battle.bossBattle()
          this.monsterForBattle = this.#gameBoard.getBoss()
        } else {
          this.monsterForBattle = this.#gameBoard.getMonsterForFight()
        }
        this.characterForBattle = this.#gameBoard.getCharacterForFight()
        this.#battle.classList.toggle('hidden')
        this.#battle.startBattle(this.monsterForBattle.getMonsterAttributes(),this.characterForBattle.getCharacterAttributes(), "character", false)
      }

      endBattleCharacterDied() {
        this.#gameBoard.removeCharacter(this.characterForBattle)
        if(this.#gameBoard.areThereCharactersLeft()) {
          this.characterForBattle = this.#gameBoard.getCharacterForFight()
          this.#battle.startBattle(this.monsterForBattle.getMonsterAttributes(),this.characterForBattle.getCharacterAttributes(), "character", true)
        } else {
          this.gameOver()
        }
      }

      endBattleMonsterDied() {
        if(this.isBossReady) {
          this.gameWon()
        } else {
          this.#battle.classList.add('hidden')
          this.#dieUi.classList.toggle('hidden')
          this.#gameBoard.removeMonster(this.monsterForBattle)
          this.newTurn()
        }
      }

      gameOver() {
        this.#window.remove()
      }

      gameWon() {

      }
   }

   customElements.define('game-window', GameWindow)
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

 .hidden {
  display:none;
 }
 </style>

 <div id="window">
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
        this.#eventHandler.setRandomEvent()
        this.#eventHandler.showEventButton()
      }
   }

   customElements.define('game-window', GameWindow)
/**
 * Mountain for map.js
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

import './button.js'
import './select-game-parameters.js'
import { FantasyContentGenerator } from '../imported/fantasy-component-generator/fantasy-content-generator.js'

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #window {
     height:800px;
     width:1600px;
     background: linear-gradient(194deg, rgba(186,184,182,1) -100%, rgba(62,60,60,1) 100%);
     position:absolute;
 }
 #mapHolder {
  margin-left:500px;
  margin-top:50px;
  position:absolute;
 }

 #charHolder {
  position:absolute;
 }

 #monsterHolder {
  margin-left:900px;
  position:absolute;
 }
 </style>
 <div id="window">
  <div id="startedGame">
    <div id="mapHolder"></div>
    <div id="charHolder"></div>
    <div id="monsterHolder"></div>
  </div>
  <div id="beforeStart">
    <select-game-parameters id="parameters">
    </select-game-parameters>
    <simple-button id="button">
      Start Game
    </simple-button>
  </div>
 </div>
 `
 
  
 /**
  * The backbone of the gamingcomponent.
  * @type {HTMLElement}
  */
  export class GameWindow extends HTMLElement {
     
     #window
     #parameters
     #button
     #startedGame
     #beforeStart
     #mapHolder
     #charHolder
     #monsterHolder

     constructor () {
       super()

       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
         
       this.#window = this.shadowRoot.querySelector('#window')
       this.#parameters = this.shadowRoot.querySelector('#parameters')
       this.#button = this.shadowRoot.querySelector('#button')
       this.#beforeStart = this.shadowRoot.querySelector('#beforeStart')
       this.#startedGame = this.shadowRoot.querySelector('#startedGame')
       this.#charHolder = this.shadowRoot.querySelector('#charHolder')
       this.#mapHolder = this.shadowRoot.querySelector('#mapHolder')
       this.#monsterHolder = this.shadowRoot.querySelector('#monsterHolder')
       this.contentGenerator = new FantasyContentGenerator()

       this.#button.addEventListener('click', () => {
        this.startGame()
        this.#beforeStart.remove()
       })
     }

      startGame() {
        this.addMap()
        this.addCharacters()
        this.addMonsters()
      }

      addMap() {
        this.contentGenerator.connectMap(this.#mapHolder)
      }

      addCharacters() {
        this.contentGenerator.connectCharacterCard(this.#mapHolder)
        for(let iterator = 0; iterator < this.#parameters.getNumberOfCharacters(); iterator++) {
          const newCardHolder = this.addAndReturnHolder(this.#charHolder)
          this.contentGenerator.connectCharacterCard(newCardHolder)
        }  
      }

      addMonsters() {
        for(let iterator = 0; iterator < 4; iterator++) {
          const newCardHolder = this.addAndReturnHolder(this.#monsterHolder)
          this.contentGenerator.connectMonsterCard(newCardHolder)
        }
      }

      addAndReturnHolder(HTMLElement) {
        const holder = document.createElement('div')
        HTMLElement.append(holder)
        return holder
      }
   }

   customElements.define('game-window', GameWindow)
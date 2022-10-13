/**
 * A ui for die events.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

import { Die } from "../die.js"

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #dieElement {
    height:55px;
    width:55px;
    background:white;
    border:solid 2px;
    margin-bottom:30px;
    
 }
 .face {
  display: inline-block;
  vertical-align:middle;
  background: black;
  border-radius: 50%;
  height:12px;
  width:12px;
  margin:-2px 5px 0px 7px;
 }
 .hidden {
  display:none;
 }
 </style>
 <div id="dieElement"></div>
 <button id="roll">Roll die</button>
 <p id="value"></p>
 `
 
 customElements.define('die-ui',
 /**
  * The die for the game.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #dieElement
     #roll
     #value
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
       this.#dieElement = this.shadowRoot.querySelector('#dieElement')
       this.#roll = this.shadowRoot.querySelector('#roll')
       this.#value = this.shadowRoot.querySelector('#value')

       this.die = new Die()
       this.dieValue = 0

       this.#roll.addEventListener('click', () => {
        this.changeFace()
        this.#value.textContent = this.dieValue
        this.#roll.classList.add('hidden')
        this.dispatchEvent(new CustomEvent('dieRolled', {
          bubbles: true
        }))
       })
     }

     changeFace() {
      this.removeFaces()
      this.newDieValue()
      this.addFacesToDie()
     }

     removeFaces() {
      while (this.#dieElement.firstChild) {
        this.#dieElement.removeChild(this.#dieElement.lastChild)
      }
      this.#value.textContent = ""
     }

     newDieValue() {
      this.die.rollDie()
      this.dieValue = this.die.getDieValue()
     }

     addFacesToDie() {
      for(let iteration = 0; iteration < this.dieValue; iteration++) {
        const face = document.createElement('div')
        face.classList.add('face')
        this.#dieElement.append(face)
      }
     }

     getDieValue() {
      return this.dieValue
     }

     makeRollVisible() {
      this.#roll.classList.remove('hidden')
     }
   })
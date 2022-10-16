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
     /**
      * A button to roll the die.
      */
     #roll
     /**
      * The die's value.
      */
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
        this.dispatchEvent(new CustomEvent('dieRolled', {
          bubbles: true
        }))
       })
     }

     /**
      * A face is the side the die is showing upwards,
      * displaying its value by number of black dots.
      */
     changeFace() {
      this.removeFaces()
      this.newDieValue()
      this.addFacesToDie()
      this.makeRollInvisble()
     }

     /**
      * This is a reset, so the die is always blank for a new roll.
      */
     removeFaces() {
      while (this.#dieElement.firstChild) {
        this.#dieElement.removeChild(this.#dieElement.lastChild)
      }
      this.#value.textContent = ""
     }

     newDieValue() {
      this.die.rollDie()
      this.dieValue = this.die.getDieValue()
      this.#value.textContent = this.dieValue
     }

     getDieValue() {
      return this.dieValue
     }

     addFacesToDie() {
      for(let iteration = 0; iteration < this.dieValue; iteration++) {
        this.#dieElement.append(this.getDieFace())
      }
     }

     getDieFace() {
      const face = document.createElement('div')
      face.classList.add('face')
      return face
     }

     /**
      * "Roll" is a button with the function to roll the die.
      */
     makeRollVisible() {
      this.#roll.classList.remove('hidden')
     }

     makeRollInvisble() {
      this.#roll.classList.add('hidden')
     }
   })
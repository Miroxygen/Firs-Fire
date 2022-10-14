/**
 * Handles game events.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

import { RandomEvent } from "../random-event.js"

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #eventWindow {
    height:100px;
    width:400px;
    background: pink;
    position:absolute;
    margin-top:600px;
    margin-left:500px;
    border:solid 3px;
 }
 #button {
  margin-top:78px;
  margin-left:125px;
 }
 .hidden {
  display:none;
 }
 </style>
 <div id="eventWindow">
    <p id="eventText"></p>
    <button id="button" class="hidden">Okay, let's go!</button>
  </div>
 `
 
 customElements.define('event-handler',
 /**
  * The die for the game.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
    #eventWindow
    #button
    #eventText

     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
         
        this.#eventWindow = this.shadowRoot.querySelector('#eventWindow')
        this.#button = this.shadowRoot.querySelector('#button')
        this.#eventText = this.shadowRoot.querySelector('#eventText')

        this.randomEvent = new RandomEvent()

        this.#button.addEventListener('click', () => {
          this.hideEventButton()
          this.clearEventText()
          this.dispatchEvent(new CustomEvent('eventOver', {
            bubbles: true
          }))
        })
       }

       showEventButton() {
        this.#button.classList.toggle('hidden')
       }

       hideEventButton() {
        this.#button.classList.toggle('hidden')
       }

       setRandomEvent(bossIsReady) {
        const newEvent = this.randomEvent.getRandomEvent()
        this.#eventText.textContent = newEvent.description
        this.ifMonsterEvent(newEvent.name, bossIsReady)
       }

       ifMonsterEvent(eventName, bossIsReady) {
        if(eventName === "Monster") {
          if(bossIsReady) {
            const bossEvent = this.randomEvent.getBossEvent()
            this.#eventText.textContent = bossEvent.description
          } 
            this.dispatchEvent(new CustomEvent('monsterFight', {
              bubbles: true
            }))
        }
       }

       clearEventText() {
        this.#eventText.textContent = ""
       }

     })
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
    background: #B34CA9;
    position:absolute;
    margin-top:600px;
    margin-left:550px;
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
    <button id="button" class="hidden">Okay, move on!</button>
  </div>
 `
 
 customElements.define('event-handler',
 /**
  * Games event-handler..
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
        this.event = ""

        this.#button.addEventListener('click', () => {
          this.hideEventButton()
          this.clearEventText()
          this.dispatchEvent(new CustomEvent('eventOver', {
            bubbles: true
          }))
        })
       }

       getRandomEvent() {
        this.setRandomEvent()
        this.setEventText()
        this.ifMonsterEvent(this.event.name)
       }

       setRandomEvent() {
        this.event = this.randomEvent.getRandomEvent()
       }

       setEventText() {
        this.#eventText.textContent = this.event.description
       }

       ifMonsterEvent(eventName) {
        if(eventName === "Monster") {
            this.dispatchEvent(new CustomEvent('monsterFight', {
              bubbles: true
            }))
        }
       }

       getBossEvent() {
        this.event = this.randomEvent.getBossEvent()
        this.setEventText()
       }

       showEventButton() {
        this.#button.classList.toggle('hidden')
       }

       hideEventButton() {
        this.#button.classList.toggle('hidden')
       }

       clearEventText() {
        this.#eventText.textContent = ""
       }

     })
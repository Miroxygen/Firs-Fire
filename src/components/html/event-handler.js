/**
 * Handles game events.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */


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

       setRandomEvent() {
        const text = "Nothing happened this time."
        this.#eventText.textContent = text
       }

       clearEventText() {
        this.#eventText.textContent = ""
       }

     })
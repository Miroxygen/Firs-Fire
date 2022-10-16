/**
 * For selecting parameters..
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 import './select-game-parameters.js'

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
  #parameters {
    margin-left:300px;
  }
 </style>
 <div id="beforeStart">
    <select-game-parameters id="parameters">
    </select-game-parameters>
    <simple-button id="button">
      Start Game
    </simple-button>
  </div>
 `
 
 customElements.define('before-start',
 /**
  * A screen beofre game has started.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #beforeStart
     #parameters
     #button
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

       this.#beforeStart = this.shadowRoot.querySelector('#beforeStart')
       this.#parameters = this.shadowRoot.querySelector('#parameters')
       this.#button = this.shadowRoot.querySelector('#button')

       this.numberOfCharacters

       this.#button.addEventListener('click', () => {
        this.setGameParameters()
        this.dispatchEvent(new CustomEvent('parametersDecided', {
          bubbles: true
        }))
       })
       }

       /**
        * At the moment only number of characters.
        */
       setGameParameters() {
        this.numberOfCharacters = this.#parameters.getNumberOfCharacters()
       }

       getGameParameters() {
        return this.numberOfCharacters
       }
     })
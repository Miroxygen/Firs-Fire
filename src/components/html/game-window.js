/**
 * Mountain for map.js
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

import './button.js'
import './select-game-parameters.js'

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #window {
     height:800px;
     width:1200px;
     background: linear-gradient(194deg, rgba(186,184,182,1) -100%, rgba(62,60,60,1) 100%);
     position:absolute;
 }
 </style>
 <div id="window">
 <select-game-parameters></select-game-parameters>
 <simple-button>
 Start Game
 </simple-button>
 </div>
 `
 
 customElements.define('game-window',
 /**
  * The backbone of the gamingcomponent.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
     /**
      * Just a coloured div.
      * @type {HTMLElement}
      */
     #window
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
       this.#window = this.shadowRoot.querySelector('#window')
     }
   })
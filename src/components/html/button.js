/**
 * A simple button.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #button {
     
 }
 </style>
 <button id="button">
 <slot></slot>
 </button>
 `
 
 customElements.define('simple-button',
 /**
  * The backbone of the gamingcomponent.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
     /**
      * Just a coloured div.
      * @type {HTMLElement}
      */
     #button
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
       this.#button = this.shadowRoot.querySelector('#window')
     }
   })
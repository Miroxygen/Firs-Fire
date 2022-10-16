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
    height:50px;
    width:150px;
    font-size:20px;
    margin-top:300px;
 }
 </style>
 <button id="button">
 <slot></slot>
 </button>
 `
 
 customElements.define('simple-button',
 /**
  * A button.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
     /**
      * Multipurpose.
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
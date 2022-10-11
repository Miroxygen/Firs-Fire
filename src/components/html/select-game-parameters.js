/**
 * For selecting things such as number of characters.
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 </style>
 <label for"characterAmount">How many characters do you want in the game?</label>
 <select name="characterAmount" id="characterAmount">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
 </select>
 `
 
 customElements.define('select-game-parameters',
 /**
  * The backbone of the gamingcomponent.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
     /**
      * Just a coloured div.
      * @type {HTMLElement}
      */
     #characterAmount
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
       this.#characterAmount = this.shadowRoot.querySelector('#characterAmount')
     }
   })
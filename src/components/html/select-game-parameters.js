/**
 * For selecting things such as number of characters.
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
  label {
    font-size:30px;
    padding:20px;
  }
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
  * Parameters.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
  
     #characterAmount

     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))
         
       this.#characterAmount = this.shadowRoot.querySelector('#characterAmount')
     }

     getNumberOfCharacters() {
      const value = this.#characterAmount.options[this.#characterAmount.selectedIndex].value
      return value;
     }
   })
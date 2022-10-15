/**
 * End screen for winning and loosing.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 import { BattleCalculator } from "../battle-calculator.js"

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #endScreen {
  margin:0 auto;
  height:300px;
  width:500px;
 }
 .winTheme {
  background: radial-gradient(circle, rgba(252,213,161,1) 0%, rgba(65,122,40,1) 100%);
  border:solid white 5px;
 }

 .loseTheme {
  background: radial-gradient(circle, rgba(129,14,6,1) 0%, rgba(16,20,14,1) 100%);
  border:solid 5px;
  color:white;
 }

 h1 {
  text-align:center;
 }

 #close {
  margin-left:480px;
 }
 </style>
  <div id="endScreen">
  <button id="close">X</button>
  <h1 id="endText">.</h1>
  </div>
 `
 
 customElements.define('end-screen',
 /**
  * Endscreen.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #endScreen
     #endText
     #close
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

         this.#endScreen = this.shadowRoot.querySelector('#endScreen')
         this.#endText = this.shadowRoot.querySelector('#endText')
         this.#close = this.shadowRoot.querySelector('#close')

         this.#close.addEventListener('click', () => {
          this.#endScreen.remove()
         })
     }

     displayWin() {
      this.#endScreen.classList.add('winTheme')
      this.#endText.textContent = "Congratulations! You won the game."
     }

     displayLoss() {
      this.#endScreen.classList.add('loseTheme')
      this.#endText.textContent = "Winning isn't everything."
     }
     
   })
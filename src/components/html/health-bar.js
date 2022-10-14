/**
 * Health for battles.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 import { BattleCalculator } from "../battle-calculator.js"

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #healthBar {
  height:30px;
  width:150px;
  background: linear-gradient(270deg, rgba(204,76,76,1) 0%, rgba(134,14,28,1) 100%);
  border:solid white 3px;
  border-radius:20%
 }

 #healthNumber {
  font-size:20px;
 }
 </style>
  <slot></slot>
  <div id="healthBar">
  <p id="healthNumber"></p>
  </div>
 `
 
 customElements.define('health-bar',
 /**
  * Handles the battle.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #healthBar
     #healthNumber
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

         this.#healthBar = this.shadowRoot.querySelector('#healthBar')
         this.#healthNumber = this.shadowRoot.querySelector('#healthNumber')

       this.health = 0
     }

     calculateHealth(constitution) {
      this.health = constitution * 10
      this.#healthNumber.textContent = this.health
     }

     removeHealth(strike) {
      this.health = this.health - strike
      if(this.health < 0) {
        this.health = 0
      } 
      this.#healthNumber.textContent = this.health
     }

     getHealth() {
      return this.health
     }
     
   })
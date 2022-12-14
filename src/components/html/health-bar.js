/**
 * Health for battles.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #healthBar {
  height:30px;
  width:150px;
  background: linear-gradient(93deg, rgba(134,14,28,1) 100%, rgba(246,239,239,1) 100%);
  border:solid white 3px;
  border-radius:20%
 }

 #healthNumber {
  font-size:30px;
 }
 </style>
  <slot></slot>
  <div id="healthBar">
  <p id="healthNumber"></p>
  </div>
 `
 
 customElements.define('health-bar',
 /**
  * Healthbar.
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

       this.currentHealth = 0
       this.fullHealth = 0
     }

     calculateHealth(constitution) {
      this.currentHealth = constitution * 10
      this.fullHealth = this.currentHealth
      this.#healthNumber.textContent = this.currentHealth
     }

     removeHealth(strike) {
      this.currentHealth = this.currentHealth - strike
      if(this.currentHealth < 0) {
        this.currentHealth = 0
        this.resetHealthVisible()
      } 
      this.#healthNumber.textContent = this.currentHealth
      this.removeHealthVisible()
     }

     /**
      * Makes a part of the healthbar white instead of red.
      */
     removeHealthVisible() {
      const percentage = this.currentHealth / this.fullHealth * 100
      this.#healthBar.style.background = `linear-gradient(93deg, rgba(134,14,28,1) ${percentage}%, rgba(246,239,239,1) 100%)`
     }

     /**
      * Goes back to full red.
      */
     resetHealthVisible() {
      this.#healthBar.style.background = `linear-gradient(93deg, rgba(134,14,28,1) 100%, rgba(246,239,239,1) 100%)`
     }

     getHealth() {
      return this.currentHealth
     }
     
   })
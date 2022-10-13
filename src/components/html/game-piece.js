/**
 * A piece for the "gameboard".
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */


 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #piece {
  position:absolute;
  z-index:1;
 }

 #head {
  background: radial-gradient(circle, rgba(210,190,171,1) 0%, rgba(168,143,120,1) 100%);
  width:15px;
  height:15px;
  border-radius:50%;
  margin-left:2px;
 }

 #body {
  background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,127,1) 50%, rgba(195,69,252,1) 100%);
  width:20px;
  height:20px;
  border-radius:30%
 }
 </style>
 <div id="piece">
  <div id="head"></div>
  <div id="body"></div>
 </div>
 `
 
 customElements.define('game-piece',
 /**
  * The die for the game.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #piece
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

       this.#piece = this.shadowRoot.querySelector('#piece')
       this.currentPosition = {
        left : 0,
        top: 0,
       }
     }

     move(dieValue) {
      this.getRandomDirection(dieValue)
      this.setPosition()
     }

     setPosition() {
      this.#piece.style.top = `${this.currentPosition.top}px`
      this.#piece.style.left = `${this.currentPosition.left}px` 
     }

     getRandomDirection(dieValue) {
      if(dieValue < 4) {
        this.currentPosition.left += dieValue * 20
      } else {
        this.currentPosition.top += dieValue * 20
      }
     }
     
   })
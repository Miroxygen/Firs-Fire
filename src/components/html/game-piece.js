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
  * The game-piece.
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
       this.moveValue = 0
     }

     move(moveValue) {
      this.setMoveValue(moveValue)
      this.getRandomDirection()
      this.setPosition()
     }

     setMoveValue(moveValue) {
      this.moveValue = moveValue
     }

     setPosition() {
      this.#piece.style.top = `${this.currentPosition.top}px`
      this.#piece.style.left = `${this.currentPosition.left}px` 
     }

     getRandomDirection() {
      if(this.moveValue < 4) {
        this.setMinusDirection()
      } else {
        this.setPlusDirection()
      }
        this.outOfBoundsLeft()
        this.outOfBoundsTop()
     }

     /**
      * The piece will walk upwards and right.
      */
     setMinusDirection() {
      this.currentPosition.top -= this.moveValue * 20
      this.currentPosition.left -= this.moveValue * 20
     }

     /**
      * The piece will walk downwards and left.
      */
     setPlusDirection() {
      this.currentPosition.top += this.moveValue * 10
      this.currentPosition.left += this.moveValue * 10
     }

     /**
      * So the piece is inside the map visually.
      */
     outOfBoundsTop() {
      if(this.currentPosition.top > 450) {
        this.currentPosition.top = 450
      } else if(this.currentPosition.top < 0) {
        this.currentPosition.top = 0
      }
     }

     outOfBoundsLeft() {
      if(this.currentPosition.left > 450) {
        this.currentPosition.left = 450
      }else if(this.currentPosition.left < 0) {
        this.currentPosition.left = 0
      }
     }
   })
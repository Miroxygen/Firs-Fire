/**
 * Displays how to play the game..
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 import { BattleCalculator } from "../battle-calculator.js"

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
  #howTo {
    height:710px;
    width:200px;
    background:pink;
    position:absolute;
    margin-left:-200px;
    border:solid;
  }

  h3 {
    text-align:center;
  }
  p {
    margin-left:5px;
  }
 </style>
  <div id="howTo">
  <h3>How do I play?</h3>
  <p>Select the number of characters you want to play with (the more, the hopefully easier).</p>
  <p>Randomize a map until your're satisfied.</p>
  <p>Roll the die to initate your turn.</p>
  <p>You will be shown what event happened to you.</p>
  <p>The goal is to beat all the monsters, and one
  random event will be a monster.</p>
  <p>Fight the monster with your character/s until it is dead, or you die (then you lose!).</p>
  <p>If you have more than 1 character the character next in line will take over the fight if
  the first one dies.</p>
  <p>When you've beaten three monsters, the next monsterevent will be the boss.</p>
  <p>Beat the boss and you have won.</p>
  <p><b>To show character and monster stats, click on the balls!</b></p>
  </div>
 `
 
 customElements.define('game-instructions',
 /**
  * Instructions window.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #howTo
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

        this.#howTo = this.shadowRoot.querySelector('#howTo')
     }
   })
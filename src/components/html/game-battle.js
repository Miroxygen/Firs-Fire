/**
 * For handling monster battles.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

import { BattleCalculator } from "../battle-calculator.js"
import './health-bar.js'

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #holder {
  margin-left:515px;
  margin-top:50px;
  position:absolute;
  background:white;
  height:500px;
  width:550px;
  text-align:center;
 }
 #header {
  font-size:100px;
  z-index:10;
  color:red;
 }
 #monsterHealthbar {
  left:1070px;
  top:40px;
  position:absolute;
 }
 #characterHealthbar {
  left:350px;
  top:40px;
  position:absolute;
 }
 #strike {
  padding:10px;
 }

 #battleText {
  font-size:30px;
 }
 .hidden { 
  display: none;
 }
 .characterTurn {
  background: blue;
 }
 .monsterTurn {
  background:red;
 }
 </style>
 <div id="holder">
    <p id="header">BATTLE!</p>
    <button id="strike">hej</button>
    <p id="battleText">hej</p>
    <button id="closeWindow" class="hidden">End battle.</button>
  </div>
  <health-bar id="monsterHealthbar">
    <p>Monster</p>
  </health-bar>
  <health-bar id="characterHealthbar">
    <p>Character</p>
  </health-bar>

 `
 
 customElements.define('game-battle',
 /**
  * Handles the battle.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #header
     #battleText
     #monsterHealthbar
     #characterHealthbar
     #strike
     #closeWindow

     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

        this.#header = this.shadowRoot.querySelector('#header')
        this.#battleText = this.shadowRoot.querySelector('#battleText')
        this.#monsterHealthbar = this.shadowRoot.querySelector('#monsterHealthbar')
        this.#characterHealthbar = this.shadowRoot.querySelector('#characterHealthbar')
        this.#strike = this.shadowRoot.querySelector('#strike')
        this.#closeWindow = this.shadowRoot.querySelector('#closeWindow')

       this.battleCalculator = new BattleCalculator()
       this.monsterAttributes = {Strength : 0, Charisma : 0, Dexterity : 0, Intelligence : 0, Wisdom : 0, Constituion : 0}
       this.characterAttributes = {Strength : 0, Charisma : 0, Dexterity : 0, Intelligence : 0, Wisdom : 0, Constituion : 0}
       this.attacker = undefined
       this.defender = undefined
       this.outcome = undefined
       this.whosOnTurn = ""
       this.battleIsOngoing = true
       this.savedMonsterHealthForRerun = 0

       this.#strike.addEventListener('click', () => {
        this.doBattle()
       })

       this.#closeWindow.addEventListener('click', () => {
        this.closeWindow()
       })
     }

     startBattle(monster, character, turn, rerun) {
      this.battleIsOngoing = true
      this.whosOnTurn = turn
      this.setMonsterAttributes(monster)
      this.setCharacterAttributes(character)
      this.#monsterHealthbar.calculateHealth(this.monsterAttributes.Constituion)
      this.#characterHealthbar.calculateHealth(this.characterAttributes.Constituion)
      this.#strike.classList.remove('hidden')
      if(rerun) {
        this.#battleText.textContent = ""
        this.#monsterHealthbar.calculateHealth(this.savedMonsterHealthForRerun / 10)
      }
      this.setTurn()
     }

     doBattle() {
      if(this.battleIsOngoing) {
        this.strike()
        this.displayOutCome()
        this.enforceOutcome()
      }
      if(this.#characterHealthbar.getHealth() === 0 || this.#monsterHealthbar.getHealth() === 0) {
        this.endBattle()
      }
     }

     strike() {
      this.setTurn()
      this.battleCalculator.setStats(this.attacker.Strength, this.attacker.Intelligence,
         this.defender.Wisdom, this.defender.Charisma, this.defender.Dexterity)
      this.outcome = this.battleCalculator.determineBattleOutcome()
     }

     setTurn() {
      if(this.whosOnTurn === "character") {
        this.characterTurn()
      } else {
        this.monsterTurn()
      }
     }

     characterTurn() {
      this.#strike.textContent = "CHARACTER TURN"
      this.#strike.classList.add('characterTurn')
      this.#strike.classList.remove('monsterTurn')
      this.attacker = this.monsterAttributes
      this.defender = this.characterAttributes
      this.whosOnTurn = "monster"
     }

     monsterTurn() {
      this.#strike.textContent = "MONSTER TURN"
      this.#strike.classList.add('monsterTurn')
      this.#strike.classList.remove('characterTurn')
      this.attacker = this.characterAttributes
      this.defender = this.monsterAttributes
      this.whosOnTurn = "character"
     }

     displayOutCome() {
      this.#battleText.textContent = this.outcome.description
     }

     enforceOutcome() {
      if(this.outcome.name === "Strike" || this.outcome.name === "Legendary") {
        if(this.defender === this.monsterAttributes) {
          this.#monsterHealthbar.removeHealth(Math.floor(this.outcome.amount))
        } else if(this.defender === this.characterAttributes) {
          this.#characterHealthbar.removeHealth(Math.ceil(this.outcome.amount))
        }
      }
     }

     endBattle() {
      this.battleIsOngoing = false
      this.#strike.classList.add('hidden')
      if(this.#monsterHealthbar.getHealth() === 0) {
        this.#battleText.textContent = "Monster has died! You won this time."
      } else {
        this.#battleText.textContent = "You diead! Better luck next time."
        this.savedMonsterHealthForRerun = this.#monsterHealthbar.getHealth()
      }    
      this.#closeWindow.classList.remove('hidden')
     }

     closeWindow() {
      if(this.#monsterHealthbar.getHealth() === 0) {
        this.#battleText.textContent = "Monster has died! You won this time."
        this.dispatchEvent(new CustomEvent('monsterDied', {
          bubbles: true
        }))
      } else {
        this.#battleText.textContent = "You diead! Better luck next time."
        this.dispatchEvent(new CustomEvent('characterDied', {
          bubbles: true
        }))
     }
     this.#closeWindow.classList.add('hidden')
     }

     bossBattle() {
      this.#header.textContent = "BOSSBATTLE!"
     }

     setMonsterAttributes(attributes) {
      this.putAttributeNumbersIntoObject(attributes, this.monsterAttributes)
     }

     setCharacterAttributes(attributes) {
      this.putAttributeNumbersIntoObject(attributes, this.characterAttributes)
     }

     /**
      * The regex finds numbers in strings.
      * @param {Array} attributesArray Array with string attributes.
      * @param {object} object Monster or character.
      */
     putAttributeNumbersIntoObject(attributesArray, object) {
      Object.keys(object).forEach((key, index) => {
        object[key] = parseInt(attributesArray[index].replace(/\D/g, ""))
      })
     }
   })
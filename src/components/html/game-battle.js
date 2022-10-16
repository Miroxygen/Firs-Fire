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
    <button id="strike"></button>
    <p id="battleText"></p>
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
        this.attacker = {health : "", stats: ""}
        this.defender = {health : "" , stats : ""}
        this.outcome = undefined
        this.whosOnTurn = "character"
        this.savedMonsterHealthForRerun = 0

        this.#strike.addEventListener('click', () => {
        this.doOneAttack()
       })

       this.#closeWindow.addEventListener('click', () => {
        this.closeWindow()
       })
     }

     startBattle(monster, character) {
      this.setMonsterAttributes(monster)
      this.setMonsterHealthBar()
      this.setCharacterAttributes(character)
      this.setCharacterHealthBar()
      this.showStrikeButton()
      this.setTurn()
     }

     setMonsterAttributes(attributes) {
      this.putAttributeNumbersIntoObject(attributes, this.monsterAttributes)
     }

     setMonsterHealthBar() {
      this.#monsterHealthbar.calculateHealth(this.monsterAttributes.Constituion)
     }

     setCharacterAttributes(attributes) {
      this.putAttributeNumbersIntoObject(attributes, this.characterAttributes)
     }

     setCharacterHealthBar() {
      this.#characterHealthbar.calculateHealth(this.characterAttributes.Constituion)
     }

     setTurn() {
      if(this.whosOnTurn === "character") {
        this.characterTurn()
        this.whosOnTurn = "monster"
      } else {
        this.monsterTurn()
        this.whosOnTurn = "character"
      }
     }

     characterTurn() {
      this.setCharacterStyle()
      this.setMonsterAsAttacker()
      this.setCharacterAsDefender()
     }

     setCharacterAsAttacker() {
      this.attacker.health = this.#characterHealthbar
      this.attacker.stats = this.characterAttributes
     }

     setCharacterAsDefender() {
      this.defender.health = this.#characterHealthbar
      this.defender.stats = this.characterAttributes
     }

     setCharacterStyle() {
      this.#strike.textContent = "CHARACTER TURN"
      this.#strike.classList.add('characterTurn')
      this.#strike.classList.remove('monsterTurn')
     }

     monsterTurn() {
      this.setMonsterStyle()
      this.setCharacterAsAttacker()
      this.setMonsterAsDefender()
     }

     setMonsterAsAttacker() {
      this.attacker.health = this.#monsterHealthbar
      this.attacker.stats = this.monsterAttributes
     }

     setMonsterAsDefender() {
      this.defender.health = this.#monsterHealthbar
      this.defender.stats = this.monsterAttributes
     }

     setMonsterStyle() {
      this.#strike.textContent = "MONSTER TURN"
      this.#strike.classList.add('monsterTurn')
      this.#strike.classList.remove('characterTurn')
     }

     showStrikeButton() {
      this.#strike.classList.remove('hidden')
     }

     doOneAttack() {
      this.strike()
      this.getOutcome()
      this.displayOutCome()
      this.enforceOutcome()
      this.didAnyoneDie()
     }

     strike() {
      this.setTurn()
      this.battleCalculator.setStats(this.attacker.stats.Strength, this.attacker.stats.Intelligence,
         this.defender.stats.Wisdom, this.defender.stats.Charisma, this.defender.stats.Dexterity)
     }

     getOutcome() {
      this.outcome = this.battleCalculator.determineBattleOutcome()
     }

     displayOutCome() {
      this.#battleText.textContent = this.outcome.description
     }

     enforceOutcome() {
      if(this.outcome.name === "Strike" || this.outcome.name === "Legendary") {
        this.defender.health.removeHealth(Math.ceil(this.outcome.amount))
      }
     }

     didAnyoneDie() {
      if(this.#characterHealthbar.getHealth() === 0 || this.#monsterHealthbar.getHealth() === 0) {
        this.endBattle()
      }
     }

     endBattle() {
      if(this.#monsterHealthbar.getHealth() === 0) {
        this.monsterDiedText()
        this.resetMonsterHealth()
      } else {
        this.characterDiedText()
      }    
      this.resetCharacterHealth()
      this.hideBattleWindow()
     }

     monsterDiedText() {
      this.#battleText.textContent = "Monster has died! You won this time."
     }

     resetMonsterHealth() {
      this.#monsterHealthbar.resetHealthVisible()
     }

     characterDiedText() {
      this.#battleText.textContent = "You diead! Better luck next time."
     }

     resetCharacterHealth() {
      this.#characterHealthbar.resetHealthVisible()
     }

     hideBattleWindow() {
      this.#strike.classList.add('hidden')
      this.#closeWindow.classList.remove('hidden')
     }

     continueBattle(character) {
      this.setCharacterAttributes(character)
      this.setCharacterHealthBar()
      this.whosOnTurn = "character"
      this.setTurn()
      this.showStrikeButton()
     }

     

     closeWindow() {
      if(this.#monsterHealthbar.getHealth() === 0) {
        this.monsterDiedDispatchEvent()
      } else {
       this.characterDiedDispatchEvent()
     }
     this.resetBattleText()
     this.hideCloseWindowButton()
     }

     monsterDiedDispatchEvent() {
      this.dispatchEvent(new CustomEvent('monsterDied', {
        bubbles: true
      }))
     }

     characterDiedDispatchEvent() {
      this.dispatchEvent(new CustomEvent('characterDied', {
        bubbles: true
      }))
     }

     resetBattleText() {
      this.#battleText.textContent = ""
     }

     hideCloseWindowButton() {
      this.#closeWindow.classList.add('hidden')
     }

     bossBattle() {
      this.#header.textContent = "BOSSBATTLE!"
     }


     /**
      * The regex finds numbers in strings.
      * The purpose of this function is to find numbers
      * in arrays with strings, extract them and turn them 
      * into the type number.
      * @param {Array} attributesArray Array with string attributes.
      * @param {object} object Monster or character.
      */
     putAttributeNumbersIntoObject(attributesArray, object) {
      Object.keys(object).forEach((key, index) => {
        object[key] = parseInt(attributesArray[index].replace(/\D/g, ""))
      })
     }
   })
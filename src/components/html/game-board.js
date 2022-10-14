/**
 * For holding game pieces.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

 import { FantasyContentGenerator } from "../imported/fantasy-component-generator/fantasy-content-generator.js"

 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 #board {
  height:800px;
  width:1600px;
  position:absolute;
 }
 #mapHolder {
  margin-left:550px;
  margin-top:50px;
  position:absolute;
 }

 #charHolder {
  height:800px;
  width:500px;
  position:absolute;
 }

 random-character-card {
  margin:50px;
 }

 #currentMonster {
  height:800px;
  width:500px;
  margin-left:1050px;
  margin-top:40px;
  position:absolute;
 }

 #bossHolder {
  height:800px;
  width:500px;
  margin-left:1050px;
  position:absolute;
 }

 #mapConfirmation {
  position:absolute;
  margin-top:500px;
  margin-left:200px;
 }

 .hidden {
  display:none;
 }
 </style>
 <div id="gameBoard">
    <div id="mapHolder">
      <slot></slot>
      <button id="mapConfirmation" class="hidden">I want this map!</button>
    </div>
    <div id="charHolder"></div>
    <div id="monsterHolder" class="hidden"></div>
    <div id="currentMonster"></div>
    <div id="bossHolder" class="hidden"></div>
  </div>
 `
 
 customElements.define('game-board',
 /**
  * The die for the game.
  * @type {HTMLElement}
  */
   class extends HTMLElement {
    
     #gameBoard
     #mapHolder
     #mapConfirmation
     #charHolder
     #monsterHolder
     #currentMonster
     #bossHolder
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

         this.#gameBoard = this.shadowRoot.querySelector('#gameBoard')
         this.#mapHolder = this.shadowRoot.querySelector('#mapHolder')
         this.#mapConfirmation = this.shadowRoot.querySelector('#mapConfirmation')
         this.#charHolder = this.shadowRoot.querySelector('#charHolder')
         this.#monsterHolder = this.shadowRoot.querySelector('#monsterHolder')
         this.#currentMonster = this.shadowRoot.querySelector('#currentMonster')
         this.#bossHolder = this.shadowRoot.querySelector('#bossHolder')

         this.contentGenerator = new FantasyContentGenerator()
         this.bossMonster = ""

         this.#gameBoard.addEventListener('click', () => {
          this.decideMap()
         })

         this.#mapConfirmation.addEventListener('click', () => {
          this.#mapHolder.children[2].removeMapGeneratorButton()
          this.#mapConfirmation.remove()
          this.dispatchEvent(new CustomEvent('mapDecided', {
            bubbles: true
          }))
         })
       }

       generateGameContent(numberOfCharacters) {
        this.addMap()
        this.addCharacters(numberOfCharacters)
        this.addMonsters()
        this.decideOnBoss()
      }

      decideMap() {
        const map = this.#mapHolder.children[2]
        if(map.hasMapBeenGenerated()) {
          this.#mapConfirmation.classList.remove('hidden')
        }
      }

       addMap() {
        this.contentGenerator.connectMap(this.#mapHolder)
      }

       addCharacters(numberOfCharacters) {
        for(let iterator = 0; iterator < numberOfCharacters; iterator++) {
          this.contentGenerator.connectCharacterCard(this.#charHolder)
        }  
      }

      addMonsters() {
        for(let iterator = 0; iterator < 4; iterator++) {
          this.contentGenerator.connectMonsterCard(this.#monsterHolder)
        }
      }

      decideOnBoss() {
        this.bossMonster = this.#monsterHolder.children[Math.floor(Math.random() * 4)]
        this.bossMonster.setCardAsBoss()
        this.#bossHolder.appendChild(this.bossMonster)
        this.bossMonster.dataset.boss = true
      }

      addAndReturnHolder(HTMLElement) {
        const holder = document.createElement('div')
        holder.style.position = "absolute"
        HTMLElement.append(holder)
        return holder
      }

      getMonsterForFight() {
        let randomMonster = this.#monsterHolder.children[Math.floor(Math.random() * 3)]
        this.#currentMonster.appendChild(randomMonster)
        return randomMonster
      }

      getCharacterForFight() {
        const chosenCharacter = this.#charHolder.children[0]
        return chosenCharacter
      }

      areThereCharactersLeft() {
        if(this.#charHolder.children.length !== 0) {
          return true
        } else {
          return false
        }
      }

      removeCharacter(character) {
        character.remove()
      }

      removeMonster(monster) {
        monster.remove()
      }

     })
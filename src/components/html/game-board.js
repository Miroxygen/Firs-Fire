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

 #monsterHolder {
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
    <div id="monsterHolder"></div>
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
     constructor () {
       super()
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

         this.#gameBoard = this.shadowRoot.querySelector('#gameBoard')
         this.#mapHolder = this.shadowRoot.querySelector('#mapHolder')
         this.#mapConfirmation = this.shadowRoot.querySelector('#mapConfirmation')
         this.#charHolder = this.shadowRoot.querySelector('#charHolder')
         this.#monsterHolder = this.shadowRoot.querySelector('#monsterHolder')

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
        console.log(this.bossMonster)
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
        let margin = 20
        for(let iterator = 0; iterator < numberOfCharacters; iterator++) {
          console.log(margin)
          const newCardHolder = this.addAndReturnHolder(this.#charHolder)
          newCardHolder.textContent = `Character number ${iterator + 1}`
          newCardHolder.style.marginTop = `${margin}px`
          this.contentGenerator.connectCharacterCard(newCardHolder)
          margin = margin + 200
        }  
      }

      addMonsters() {
        let margin = 20
        for(let iterator = 0; iterator < 4; iterator++) {
          const newCardHolder = this.addAndReturnHolder(this.#monsterHolder)
          newCardHolder.style.marginTop = `${margin}px`
          this.contentGenerator.connectMonsterCard(newCardHolder)
          margin = margin + 200
        }
      }

      decideOnBoss() {
        this.bossMonster = this.#monsterHolder.children[Math.floor(Math.random() * 4)].children[0]
        this.bossMonster.setCardAsBoss()
      }

      addAndReturnHolder(HTMLElement) {
        const holder = document.createElement('div')
        holder.style.position = "absolute"
        HTMLElement.append(holder)
        return holder
      }

     })
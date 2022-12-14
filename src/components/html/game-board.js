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
  margin-top:60px;
 }

 h1{
  position:absolute;
  margin-bottom: 0;
 }

 #monsterText {
  margin-left:1300px;
 }

 #charText {
  margin-left:200px;
 }

 random-character-card {
  position:absolute;
 }

 #currentMonster {
  height:800px;
  width:500px;
  margin-left:1050px;
  margin-top:60px;
  position:absolute;
 }

 #bossHolder {
  height:800px;
  width:500px;
  margin-left:1050px;
  margin-top:60px;
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
    <h1 id="charText">Characters</h1>
    <div id="charHolder"></div>
    <div id="monsterHolder" class="hidden"></div>
    <h1 id="monsterText">Monster</h1>
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

      addMap() {
        this.contentGenerator.connectMap(this.#mapHolder)
      }

       addCharacters(numberOfCharacters) {
        for(let iterator = 0; iterator < numberOfCharacters; iterator++) {
          this.contentGenerator.connectCharacterCard(this.#charHolder)
          this.setCharacterCardMargin()
        }  
      }

      setCharacterCardMargin() {
        let margin = 20
        for(let index = 0; index < this.#charHolder.children.length; index++) {
          this.#charHolder.children[index].style.marginTop = `${margin}px`
          margin = margin + 180
        }
      }

      addMonsters() {
        for(let iterator = 0; iterator < 4; iterator++) {
          this.contentGenerator.connectMonsterCard(this.#monsterHolder)
        }
      }

      decideOnBoss() {
        this.bossMonster = this.#monsterHolder.children[Math.floor(Math.random() * 4)]
        this.#bossHolder.appendChild(this.bossMonster)
        this.bossMonster.dataset.boss = true
      }

      decideMap() {
        const map = this.#mapHolder.children[2]
        if(map.hasMapBeenGenerated()) {
          this.#mapConfirmation.classList.remove('hidden')
        }
      }

      getMonsterForFight() {
        let monster = this.#monsterHolder.children[0]
        monster.openCard()
        this.#currentMonster.appendChild(monster)
        return monster
      }

      getCharacterForFight() {
        const chosenCharacter = this.#charHolder.children[0]
        chosenCharacter.openCard()
        return chosenCharacter
      }

      getNumberOfCharacters() {
        return this.#charHolder.children.length 
      }

      removeCharacter(character) {
        character.remove()
        this.removeCharacterCardMargin()
      }

      /**
       * Since the cards have to have position absolute,
       * here the margin is removed by 200 for each card so 
       * that they all get bumped up when one is removed.
       */
      removeCharacterCardMargin() {
        if(this.getNumberOfCharacters() !== 0) {
          for(let index = 0; index < this.#charHolder.children.length; index++) {
            const currentMargin = parseInt(this.#charHolder.children[index].style.marginTop.replace(/\D/g, ""))
            this.#charHolder.children[index].style.marginTop = `${currentMargin - 200}px`
          }
        }
      }

      removeMonster(monster) {
        monster.remove()
      }

      getNumberOfMonsters() {
        return this.#monsterHolder.children.length + this.#currentMonster.children.length
      }

      getBoss() {
        this.#bossHolder.classList.remove('hidden')
        const boss = this.#bossHolder.children[0]
        boss.openCard()
        return boss
      }

     })
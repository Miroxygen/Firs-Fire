import './road.js'
import './land.js'
import './mountain.js'
import './town.js'


const template = document.createElement('template')
template.innerHTML = `
<style>
#map {
    height:500px;
    width:500px;
    background:blue;
    overflow:hidden;
    contain:content;
}
</style>
<div id="map">
</div>
<button id="getMap">Randomize map</button>
`

customElements.define('fantasy-map', 

class extends HTMLElement {
    #map
    #getMap
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#map = this.shadowRoot.querySelector('#map')
        this.#getMap = this.shadowRoot.querySelector('#getMap')

        this.isMapGenerated = false
        this.currentRoad = ""
        this.currentMountain = ""
        this.topValue = 0
        this.leftValue = 0
        this.topDirection = 0
        this.leftDirection = 0
        this.roadUpOrDown = 0
        this.roadLeftOrRight = 0

        this.#getMap.addEventListener('click', () => {
            this.destroyCurrentMap()
            this.makeLand()
            this.constructRoads()
            this.makeMountainRanges()
            this.constructTowns()
            this.isMapGenerated = true
        })
    }

    /**
     * Make 20 roads with a random starting point (top and left values set)
     * with a random direction (plus is ether down and left, minus will be up or right direction).
     */
    constructRoads() {
        for (let index = 0; index < 20; index++) {
          this.makeOneRoad(300, 50)
        }   
    }


    makeOneRoad(max, min) {
      this.setRandomStartTop(max, min)
      this.setRandomStartLeft(max, min)
      this.setRoadUpOrDown(1)
      this.setRoadLeftOrRight(1)
      for(let index = 0; index < 100; index++) {
        this.getRoad()
        this.changeRoadCssLook()
        this.appendRoad()
        this.changeLeftDirection()
        this.changeTopDirection()
        this.makeRoadDirection()
      }
    }

    getRoad() {
      const road = document.createElement('fantasy-road')
      this.currentRoad = road
    }

    changeRoadCssLook() {
      this.currentRoad.style.position = "absolute"
      this.currentRoad.style.zIndex = "10"
    }

    setRoadUpOrDown(changeValue) {
      this.roadUpOrDown = this.getRandomRoadDirectionValue(changeValue)
    }

    setRoadLeftOrRight(changeValue) {
      this.roadLeftOrRight = this.getRandomRoadDirectionValue(changeValue)
    }

    makeRoadDirection() {
      this.currentRoad.style.left = `${this.leftDirection}px`
      this.currentRoad.style.top = `${this.topDirection}px`
    }

    appendRoad() {
      this.#map.append(this.currentRoad)
    }

    makeMountainRanges() {
      for (let index = 0; index < 7; index++) {
          this.makeMountain(400, 20)  
      }
  }

     /**
     * 20 elemtens stacked on each other to resemble a mountain.
     * The position is randomize with CSS top and left values.
     * Each elements position is then incresed OR decresed by 0.5 to
     * make them stack irregulerly.
     */
      makeMountain(max, min) {
        this.setRandomStartTop(max, min)
        this.setRandomStartLeft(max, min)
        for(let index = 0; index < 20; index++) {
          this.getMountain()
          this.setMountainCssStyle()
          this.changeLeftDirection()
          this.changeTopDirection()
          this.setMountainDirection()
          this.appendMountain()
        }
      }
  
    getMountain() {
      const mountain = document.createElement('fantasy-mountain')
      this.currentMountain = mountain
    }
  
    setMountainCssStyle() {
      this.currentMountain.style.position = "absolute"
      this.currentMountain.style.zIndex = "9"
    }
  
    setMountainDirection() {
      this.currentMountain.style.left = `${this.leftDirection}px`
      this.currentMountain.style.top = `${this.topDirection}px`
    }
  
    appendMountain() {
      this.#map.append(this.currentMountain)
    }

    setRandomStartTop(max, min) {
      this.topValue = this.getRandomStartValue(max, min)
      this.topDirection = this.topValue
    }

    setRandomStartLeft(max, min) {
      this.leftValue = this.getRandomStartValue(max, min)
      this.leftDirection = this.leftValue
    }

    getRandomStartValue(max, min) {
      return Math.random() * (max - min) + min
    }

    changeLeftDirection() {
      this.leftDirection +=  (this.getRandomRoadDirectionValue(2) + this.roadLeftOrRight)
    }

    changeTopDirection() {
      this.topDirection += (this.getRandomRoadDirectionValue(2) + this.roadUpOrDown)
    }

    getRandomRoadDirectionValue(changeValue) {
      return Math.random() < 0.5 ? -changeValue : changeValue
    }


    constructTowns() {
        for (let index = 0; index < 5; index++) {
            const town = document.createElement('fantasy-town')
            town.style.position = "absolute"
            this.setAtRandomPosition(20, (430), town)
            this.#map.append(town)
        }
    }


    makeLand() {
        for (let index = 0; index < 300; index++) {
            const land = document.createElement('fantasy-land')
            land.style.position = "absolute"
            this.setAtRandomPosition(20, (430), land)
            this.#map.append(land)          
        }
    }

    setAtRandomPosition(max, min, element) {
        const randomLeftValue = Math.random() * (max - min) + min
        const randomTopValue = Math.random() * (max - min) + min
        element.style.left = `${randomLeftValue}px`
        element.style.top = `${randomTopValue}px`
    }


    destroyCurrentMap() {
        while (this.#map.firstChild) {
            this.#map.removeChild(this.#map.lastChild)
        }
    }

    hasMapBeenGenerated() {
      return this.isMapGenerated
    }

    removeMapGeneratorButton() {
      this.#getMap.remove()
    }
})
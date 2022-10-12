import './html-components/random-character-card.js'
import './html-components/random-monster-card.js'
import './html-components/map.js'


/**
 * The fantasy component are custom HTML components.
 * This class can connect the custom ones to an HTML
 * component in your document.
 */
export class FantasyContentGenerator {
    #characterCard
    #monsterCard
    #map
    constructor() {
        this.#characterCard = document.createElement('random-character-card')
        this.#monsterCard = document.createElement('random-monster-card')
        this.#map = document.createElement('fantasy-map')
    }

    connectCharacterCard(HTMLElement) {
        HTMLElement.append(this.#characterCard)
    }

    connectMonsterCard(HTMLElement) {
        HTMLElement.appendChild(this.#monsterCard)
    }  

    connectMap(HTMLElement) {
        HTMLElement.appendChild(this.#map)
    }
}
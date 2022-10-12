import './html-components/random-character-card.js'
import './html-components/random-monster-card.js'
import './html-components/map.js'


/**
 * The fantasy component are custom HTML components.
 * This class can connect the custom ones to an HTML
 * component in your document.
 */
export class FantasyContentGenerator {
    
    constructor() {
         
    }

    connectCharacterCard(HTMLElement) {
        const characterCard = document.createElement('random-character-card')
        HTMLElement.append(characterCard)
    }

    connectMonsterCard(HTMLElement) {
        const monsterCard = document.createElement('random-monster-card')
        HTMLElement.appendChild(monsterCard)
    }  

    connectMap(HTMLElement) {
        const map = document.createElement('fantasy-map')
        HTMLElement.appendChild(map)
    }
}
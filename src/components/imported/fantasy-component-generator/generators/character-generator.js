import { CharacterRaces } from "../resources/character-races.js";
import { FantasyClasses } from "../resources/fantasy-classes.js";
import { Attributes } from "../resources/attributes.js";
import { CharacterNames } from "../resources/character-names.js";


/**
 * Can be used on its own to get an object with a random character.
 */
export class CharacterGenerator {
    #characterRaces
    #fantasyClasses
    #attributes
    #characterName
    #name
    #race
    #charClass
    #charAttributes
    constructor() {
        this.#characterRaces = new CharacterRaces()
        this.#fantasyClasses = new FantasyClasses()
        this.#attributes = new Attributes()
        this.#characterName = new CharacterNames()
        this.#name
        this.#race
        this.#charClass
        this.#charAttributes
    }

    #setName() {
        this.#name = this.#characterName.getRandomNameBasedOnRace(this.#race)
    }

    #setRace() {
        this.#race = this.#characterRaces.getRandomRace()
        
    }

    #setClass() {  
        this.#charClass = this.#fantasyClasses.getRandomFantasyClass()
    }

    #setAttributes() {
        this.#charAttributes = this.#attributes.getAttributes()
    }

    #setAllCharacterStats() {
        this.#setRace()
        this.#setClass()
        this.#setAttributes()
        this.#setName()
    }

    getCharacter() {
        this.#setAllCharacterStats()
        return {"Name" : this.#name, "Race" : this.#race, "Class" : this.#charClass, "Traits": this.#charAttributes}
    }
}
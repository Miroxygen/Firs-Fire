import { Resource } from "./resource.js";


export class Attributes extends Resource {
    #strength
    #wisdom
    #dexterity
    #intelligence
    #charisma
    #constitution
    #attributeValues
    #attributeString
    constructor() {
        super()
        this.#attributeValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        this.#strength
        this.#charisma
        this.#dexterity
        this.#intelligence
        this.#wisdom
        this.#constitution
        this.#attributeString
    }

    #getRandomAttributeValue() {
        const attributeValue =  super.getRandomResource(this.#attributeValues)
        return attributeValue
    }

    #setRandomStrength() {
        this.#strength = this.#getRandomAttributeValue()
    }

    #setRandomCharisma() {
        this.#charisma = this.#getRandomAttributeValue()
    }

    #setRandomDexterity() {
        this.#dexterity = this.#getRandomAttributeValue()
    }

    #setRandomIntelligence() {
        this.#intelligence = this.#getRandomAttributeValue()
    }

    #setRandomWisdom() {
        this.#wisdom = this.#getRandomAttributeValue()
    }

    #setRandomConstitution() {
        this.#constitution = this.#getRandomAttributeValue()
    }

    #setAllValuesRandom() {
        this.#setRandomCharisma()
        this.#setRandomConstitution()
        this.#setRandomDexterity()
        this.#setRandomIntelligence()
        this.#setRandomWisdom()
        this.#setRandomStrength()
    }

    /**
     * Values need to be randomized first with setAllValuesRandom.
     */
    #makeStringFromRandomValues() {
        this.#attributeString = `Strength ${this.#strength}, Charisma ${this.#charisma}, Dexterity ${this.#dexterity}, Intelligence ${this.#intelligence},
        Wisdom ${this.#wisdom}, Constituion ${this.#constitution}`
    }

    getAttributes() {
        this.#setAllValuesRandom()
        this.#makeStringFromRandomValues()
        return this.#attributeString
    }
}
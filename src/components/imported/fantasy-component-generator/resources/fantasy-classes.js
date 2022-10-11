import { Resource } from "./resource.js"

export class FantasyClasses extends Resource {
    #allFantasyClasses
    constructor() {
        super()
        this.#allFantasyClasses = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin",
        "ranger", "rogue", "sorcerer", "warlock", "wizard"]
    }


    getAllFantasyClasses() {
        const arrayCopy = Array.from(this.#allFantasyClasses)
        return arrayCopy
    }

    getRandomFantasyClass() {
        const randomFantasyClass = super.getRandomResource(this.#allFantasyClasses)
        return randomFantasyClass
    }
}
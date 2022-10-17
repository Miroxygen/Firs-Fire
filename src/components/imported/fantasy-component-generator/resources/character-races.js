import { Resource } from "./resource.js"

export class CharacterRaces extends Resource {
    #allRaces
    constructor () {
        super()
        this.#allRaces = ["human", "elf", "dragonborn", "dwarf", "gnome", "half-elf", "halfling",
         "half-orc", "tiefling"]
    }

    getAllRaces() {
        const arrayCopy = Array.from(this.#allRaces)
        return arrayCopy
    }

    getRandomRace() {
        const randomRace = super.getRandomResource(this.#allRaces)
        return randomRace
    }
}
/*
* All names are courtesy of https://www.fantasynamegenerators.com/
*/

import { Resource } from "./resource.js";



export class CharacterNames extends Resource {
    #humanNames
    #elfNames
    #dragonbornNames
    #dwarfNames
    #gnomeNames
    #halfElfNames
    #halfOrcNames
    #tieflingNames
    #halflingNames
    constructor() {
        super()
        this.#dragonbornNames = ["Kipekmus Therlyassa","Tompanshton Oribith", "Yimpac BelfyireCuuxakmik", "JogissaNimbak Ushidrish", "Fumrashkmal Malcoria",
            "Yaaccatuash Jesfyire", "Oltar Xisyries", "Gialtheshkmurgak Ozita", "Myithtuanuath Iriecys"]
        this.#dwarfNames = ["Brilnia Frozenboots", "Annora Broadbane", "Tishros Greatbottom", "Tazris Drunkbeard", "Byldeth Wildshield", "Lysria Gurthehr",
            "Nalvian Brolbreger", "Dearlinn Thrafdeln", "Myrvia Cunhoveg", "Gwindryn Gruthgonehk"]
        this.#elfNames = ["Phirie Nightgift", "Inaxina Cedarheel", "Ulakalyn Hazelmind", "Xyrqirelle Farheart", "Davaris Sunbreeze", "Ularoris Wultho",
            "Orilynn Astaviphal", "Miaralei Urdavosi", "Biralei Drildra", "Daebanise Lashon"]
        this.#gnomeNames = ["Zanidira Marbledust", "Odaxi Bronzeheart", "Grenceli Quietfern", "Spinoa Brassbelt", " Grenci Irontrick", "Selsany Hofisebi",
            "Ylorhana Manggarotimp", "Loriwyse Offudir", "Nyxis Hoplus", "Qikasys Ramlisan"]
        this.#halfElfNames = ["Ventrana", "Galtihne", "Qitheris", "Wolpisys", "Therrila", "Mareseris", "Carona", "Phayeelor", "Loraona", "Delzenya"]
        this.#halfOrcNames = ["Garanar", "Moragur", "Rashunur", "Uminur", "Gajigri", "Ubonur", "Tuigur", "Sosha", "Karitar", "Sharel"]
        this.#humanNames = ["Zeifeihmuh Dimal", "Ohluh Pihum", "Kondruchill Bloodflow", "Mosva Wyvernwood", "Hino Shev", "Ven Kokrotsk", "Bothralo Emberbrooke",
        "Kostro Coldrunner","Cimiro Sanzavakt", "Somo Muvakt", "Thafemza Gobeveku", "Nivruth Norkirgu", "Qui Qiao", "Tsiao An", "Mitd Jehundos", "Bans Pezorne"]
        this.#tieflingNames = ["Zafirith", "Nethmeia", "Yuhiri", "Zedoris", "Nelies", "Levfirith", "Orifaris", "Inmaia", "Afyis", "Nithseis"]
        this.#halflingNames = ["Kithprys Fogcrest", "Froyra Rumbleberry", "Erasira Cherrybrook", "Fendrey Moonblossom", "Jayvira Summerdancer", "Arila Earthgrove",
            "Verzira Commonrabbit", "Eilile Brushmane", "Frozira Grandmouse", "Welsica Rosebottle"]
    }

    /**
     * @param {string} race Race variable from the class CharacterRaces. See character-races.js
     */
    getRandomNameBasedOnRace(race) {
        const nameArray = this.#getCorrectNameArray(race)
        const randomName = super.getRandomResource(nameArray)
        return randomName
    }

    /**
     * @param {string} race Race variable from the class CharacterRaces. See character-races.js
     * @returns Array with strings.
     */
    #getCorrectNameArray(race) {
        switch (race) {
            case "dragonborn":
                return this.#dragonbornNames
            case "dwarf":
                return this.#dwarfNames
            case "elf":
                return this.#elfNames
            case "gnome":
                return this.#gnomeNames
            case "half-elf":
                return this.#halfElfNames
            case "half-orc":
                return this.#halfOrcNames
            case "human":
                return this.#humanNames   
            case "tiefling":
                return this.#tieflingNames
            case "halfling":
            return this.#halflingNames
        }
    }
}
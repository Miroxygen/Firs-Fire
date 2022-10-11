import { Attributes } from "../resources/attributes.js";
import { MonsterType } from "../resources/monster-type.js";
import { MonsterSubType } from "../resources/monster-sub-type.js";
import { MonsterAttack } from "../resources/monster-attacks.js";


/**
 * Can be used on its own to get an object with a random monster.
 */
export class MonsterGenerator {
    #attributes
    #type
    #subType
    #attack
    #monsterAttributes
    #monsterType
    #monsterSubType
    #monsterNormalAttack
    #monsterLegendaryAttack
    constructor() {
        this.#attributes = new Attributes()
        this.#type = new MonsterType()
        this.#subType = new MonsterSubType()
        this.#attack = new MonsterAttack()
        this.#monsterAttributes
        this.#monsterType
        this.#monsterSubType
        this.#monsterNormalAttack
        this.#monsterLegendaryAttack
    }

    #setAttributes() {
        this.#monsterAttributes = this.#attributes.getAttributes()
    }

    #setType() {
        this.#monsterType = this.#type.getRandomType()
    }

    #setSubType() {
        this.#monsterSubType = this.#subType.getRandomSubtypeBasedOnType(this.#monsterType)
    }

    #setAttacks() {
        const monsterAttacks = this.#attack.getRandomAttacksBasedOnType(this.#monsterType)
        this.#monsterNormalAttack = monsterAttacks.Normal
        this.#monsterLegendaryAttack = monsterAttacks.Legendary
    }

    #setAllMonsterStats() {
        this.#setAttributes()
        this.#setType()
        this.#setSubType()
        this.#setAttacks()
    }

    getRandomMonster() {
        this.#setAllMonsterStats()
        const randomMonster = {"Type" : this.#monsterType, "Subtype" : this.#monsterSubType, "Traits" : this.#monsterAttributes,
            "NormalAttack" : this.#monsterNormalAttack, "LegendaryAttack" : this.#monsterLegendaryAttack} 
        return randomMonster
    }
}
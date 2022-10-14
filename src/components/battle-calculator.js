import { ResistanceCalculator } from "./resistance-calculator.js"
import { WillChanceOccurCalculator } from "./will-chance-occur-calculator.js"

/**
 * Determines who wins a single battle.
 */
export class BattleCalculator {
  constructor() {
    this.hitNumber = 0
    this.strike = 0
    this.strength = 0
    this.intelligence = 0
    this.wisdom = 0
    this.charisma = 0
    this.dexterity = 0
    this.resistanceCalculator = new ResistanceCalculator()
    this.chanceCalculator = new WillChanceOccurCalculator()
  }

    setStats(strength, intelligence, wisdom, charisma, dexterity) {
      this.strength = strength
      this.intelligence = intelligence
      this.wisdom = wisdom
      this.charisma = charisma
      this.dexterity = dexterity
    }

   /*
   * Determines if hit should be physical.
   */
   isPhysicallHit() {
    if(this.strength > this.intelligence) {
      return true
    } 
  }

  /**
   * Determines if hit should be magical.
   * @param {string} intelligence 
   * @param {string} strength 
   */
  isMagicalHit(intelligence, strength) {
    if(intelligence > strength) {
      return true
    }
  }

  setHitNumber() {
    if(this.isMagicalHit) {
      this.hitNumber = this.intelligence * 2
    } else {
      this.hitNumber = this.strength * 2
    }
  }

  isLegendaryAttack() {
    return this.chanceCalculator.willItOccur(5)
  }

  setMagicalStrikeImpact() {
    this.resistanceCalculator.setMagicResistance(this.wisdom)
    const magicResistance = this.resistanceCalculator.getMagicResistance()
    this.strike = (magicResistance / 100) * this.hitNumber
  }

  setPhysicalStrikeImpact() {
    this.resistanceCalculator.setPhysicalResistance(this.dexterity)
    const physicalResistance = this.resistanceCalculator.getPhysicalResistance()
    this.strike = (physicalResistance / 100) * this.hitNumber
  }

  willAttackBeDodged() {
    this.resistanceCalculator.setDodgeChance(this.charisma)
    const dodgeChance = this.resistanceCalculator.getDodgeChance()
    return this.chanceCalculator.willItOccur(dodgeChance)
  }

  determineBattleOutcome() {
    this.setHitNumber()
    if(this.willAttackBeDodged()) {
      return  {
        name : "Dodge",
        description : "Attack is dodged"}
    }
    
    if(this.isPhysicallHit) {
      this.setPhysicalStrikeImpact()
    } else {
      this.setMagicalStrikeImpact()
    }

    if(this.isLegendaryAttack()) {
      this.strike = this.strike * 3
      return {
        name: "Legendary",
        amount : this.strike,
        description : `Legendary! Defender is severly deprecated and loses ${Math.ceil(this.strike)} hitpoints!`
      }
    }

    return {
      name: "Strike",
      amount : this.strike,
      description : `Its a hit! Defender loses ${Math.ceil(this.strike)} hitpoints!`
    }
  }
}
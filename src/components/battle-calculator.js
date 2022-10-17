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

  /**
   * Monster or characters stats.
   * @param {string} strength 
   * @param {string} intelligence 
   * @param {string} wisdom 
   * @param {string} charisma 
   * @param {string} dexterity 
   */
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
   */
  isMagicalHit() {
    if(this.intelligence > this.strength) {
      return true
    }
  }

  /**
   * Numerical figure how high the hit shoudl be.
   */
  setHitNumber() {
    if(this.isMagicalHit) {
      this.hitNumber = this.intelligence * 2
    } else {
      this.hitNumber = this.strength * 2
    }
  }

  /**
   * Legendary just means a higher number.
   * @returns Boolean.
   */
  isLegendaryAttack() {
    return this.chanceCalculator.willItOccur(5)
  }

  /**
   * How high the actual strike will be.
   */
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

  /**
   * Dodge means that no health will be extracted.
   * @returns Boolean
   */
  willAttackBeDodged() {
    this.resistanceCalculator.setDodgeChance(this.charisma)
    const dodgeChance = this.resistanceCalculator.getDodgeChance()
    return this.chanceCalculator.willItOccur(dodgeChance)
  }

  /**
   * Based on percentages a hit will
   * be dodged, legendary or strike.
   * If strike, calculate how much in numbers
   * it will retract from opponents health.
   * @returns An object.
   */
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
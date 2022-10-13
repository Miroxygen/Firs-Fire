import { ResistanceCalculator } from "./resistance-calculator"
import { WillChanceOccurCalculator } from "./will-chance-occur-calculator"

/**
 * Determines who wins a single battle.
 */
export class BattleCalculator {
  constructor() {
    this.hitNumber = 0
    this.strike = 0
    this.resistanceCalculator = new ResistanceCalculator()
    this.chanceCalculator = new WillChanceOccurCalculator()
  }

   /*
   * Determines if hit should be physical.
   */
   isPhysicallHit(strength, intelligence) {
    if(strength > intelligence) {
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

  isLegendaryAttack() {
    return this.chanceCalculator.willItOccur(5)
  }

  setMagicalStrikeImpact() {
    this.resistanceCalculator.setMagicResistance(30)
    const magicResistance = this.resistanceCalculator.getMagicResistance()
    this.strike = (magicResistance / 100) * this.hitNumber
  }

  setPhysicalStrikeImpact() {
    this.resistanceCalculator.setPhysicalResistance(20)
    const physicalResistance = this.resistanceCalculator.getPhysicalResistance()
    this.strike = (physicalResistance / 100) * this.hitNumber
  }

  willAttackBeDodged() {
    this.resistanceCalculator.setDodgeChance(10)
    const dodgeChance = this.resistanceCalculator.getDodgeChance()
    return this.chanceCalculator.willItOccur(dodgeChance)
  }

  determineBattleOutcome(health) {
    if(this.willAttackBeDodged) {
      return "Attack is dodged"
    }
    
    if(this.isPhysicallHit) {
      this.setPhysicalStrikeImpact
    } else {
      this.setMagicalStrikeImpact
    }

    if(this.isLegendaryAttack) {
      this.strike = this.strike * 3
    }

    health -= this.strike
  }
}
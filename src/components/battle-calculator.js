import { ResistanceCalculator } from "./resistance-calculator"
import { WillChanceOccurCalculator } from "./will-chance-occur-calculator"

/**
 * Determines who wins a single battle.
 */
export class BattleCalculator {
  constructor() {
    this.hitNumber = 0
    this.magicalStrike = 0
    this.physicalStrike = 0
    this.resistanceCalculator = new ResistanceCalculator()
    this.chanceCalculator = new WillChanceOccurCalculator()
  }

   /*
   * Determines if hit should be physical.
   */
   isphysicallHit(strength, intelligence) {
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

  getMagicalStrikeImpact() {
    this.resistanceCalculator.setMagicResistance(30)
    const magicResistance = this.resistanceCalculator.getMagicResistance()
    let strike = (magicResistance / 100) * this.hitNumber
    return strike
  }

  getPhysicalStrikeImpact() {
    this.resistanceCalculator.setPhysicalResistance(20)
    const physicalResistance = this.resistanceCalculator.getPhysicalResistance()
    let strike = (physicalResistance / 100) * this.hitNumber
    return strike
  }

  willAttackBeDodged() {
    this.resistanceCalculator.setDodgeChance(10)
    const dodgeChance = this.resistanceCalculator.getDodgeChance()
    return this.chanceCalculator.willItOccur(dodgeChance)
  }
}
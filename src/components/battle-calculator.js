
/**
 * Determines who wins a single battle.
 */
export class BattleCalculator {
  constructor() {
    this.hitType = ''
    this.hitNumber = 0
    this.magicResistance = 0
    this.physicalResistance = 0
    this.dodgeChance = 20
  }

  getMagicalStrikeImpact() {
    let strike = (this.magicResistance / 100) * this.hitNumber
    return strike
  }

  getPhysicalStrikeImpact() {
    let strike = (this.physicalResistance / 100) * this.hitNumber
    return strike
  }

  willAttackBeDodged() {
    const chanceNumbers = []
    for(let iterator = 0; iterator < this.dodgeChance; iterator++) {
      chanceNumbers.push(Math.floor(Math.random() * 100))
    }
    console.log(chanceNumbers)
    if(chanceNumbers.includes(42)) {
      return "true"
    } else {
      return "false"
    }
  }

  /*
   * Determines if hit should be physical.
   */
  isphysicallHit(strength, intelligence) {
    if(strength > intelligence) {
      this.hitType = "physical"
    } 
  }

  /**
   * Determines if hit should be magical.
   * @param {string} intelligence 
   * @param {string} strength 
   */
  isMagicalHit(intelligence, strength) {
    if(intelligence > strength) {
      this.hitType = "magical"
    }
  }

  /**
   * Gets resistance as a percentage parameter, from 5 to 50.
   * @param {number} wisdom 
   */
  setMagicResistance(wisdom) {
    for(let iterator = 0; iterator < wisdom; iterator++) {
      this.magicResistance += 5
    }
  }

  /**
   * Same as magc resistance.
   * @param {number} dexterity 
   */
  setPhysicalResistance(dexterity) {
    for(let iterator = 0; iterator < dexterity; iterator++) {
      this.physicalResistance += 5
    }
  }

  setDodgeChance(charisma) {
    for(let iterator = 0; iterator < charisma; iterator++) {
      this.dodgeChance += 3
    }
  }
}
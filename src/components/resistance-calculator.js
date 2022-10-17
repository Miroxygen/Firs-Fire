
/**
 * Determines a character or monster's resistance.
 */
export class ResistanceCalculator {
  constructor() {
    this.magicResistance = 0
    this.physicalResistance = 0
    this.dodgeChance = 0
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

  /**
   * If an attack will be avoided.
   * @param {number} charisma 
   */
  setDodgeChance(charisma) {
    for(let iterator = 0; iterator < charisma; iterator++) {
      this.dodgeChance += 0.5
    }
  }

  getMagicResistance() {
    return this.magicResistance
  }

  getPhysicalResistance() {
    return this.physicalResistance
  }

  getDodgeChance() {
    return this.dodgeChance
  }
}
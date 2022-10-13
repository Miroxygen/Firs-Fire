
/**
 * Determines if a certain event will happen.
 */
export class WillChanceOccurCalculator {
  constructor() {

  }

  /**
   * Determines if the event happens or not.
   * @param {number} percentage Chance of happening, e.g 20%.
   */
  willItOccur(percentage) {
    const chanceNumbers = []
    const random = Math.floor(Math.random() * 100)
    for(let iterator = 0; iterator < percentage; iterator++) {
      chanceNumbers.push(Math.floor(Math.random() * 100))
    }
    console.log(chanceNumbers)
    console.log(random)
    if(chanceNumbers.includes(random)) {
      return true
    } else {
      return false
    }
  }
}
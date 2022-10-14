
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
    for(let iterator = 0; iterator < percentage; iterator++) {
      chanceNumbers.push(Math.floor(Math.random() * 100))
    }
    if(chanceNumbers.includes(Math.floor(Math.random() * (100 - 1 + 1) + 1))) {
      return true;
    } else {
      return false
    }
  }
}
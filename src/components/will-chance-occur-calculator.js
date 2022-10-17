
/**
 * Determines if a certain event will happen.
 */
export class WillChanceOccurCalculator {
  constructor() {

  }

  /**
   * Determines if the event happens or not.
   * Lets say percentage is 20, then 20 numbers
   * between 1-100 will be added to an array.
   * A random number will then be decided between 1-100.
   * If that random number is in the array, the event will occur.
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
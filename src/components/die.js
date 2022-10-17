


export class Die {
  constructor() {
    this.dieValue = 0
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 6)
  }

  /**
   * + 1 since randomnumber is between 0-5.
   */
  rollDie() {
    const randomNumber = this.getRandomNumber()
    this.dieValue = randomNumber + 1
  }

  getDieValue() {
    return this.dieValue
  }
}
import { Die } from "../src/components/die.js";


const die = new Die()


test('Die gives a value between 1-6', () => {
  const expectedValues = [1, 2, 3, 4, 5, 6]
  die.rollDie()
  expect(expectedValues.includes(die.getDieValue())).toEqual(true)
})
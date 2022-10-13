import { WillChanceOccurCalculator } from "../src/components/will-chance-occur-calculator.js";

const chanceTester = new WillChanceOccurCalculator()

test('If 100% chance works', () => {
  expect(chanceTester.willItOccur(100)).toEqual(true)
}) 
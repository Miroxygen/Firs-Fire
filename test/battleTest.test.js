import { BattleCalculator } from "../src/components/battle-calculator.js";

const battleCalculator = new BattleCalculator()

test('Getting magical damage works', () => {
  expect(battleCalculator.isMagicalHit(6,3)).toEqual(true)
})

test('Getting physical damage works', () => {
  expect(battleCalculator.isPhysicallHit(7, 4)).toEqual(true)
})
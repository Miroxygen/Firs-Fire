import { ResistanceCalculator } from "../src/components/resistance-calculator.js";


const resistanceCalculator = new ResistanceCalculator()

resistanceCalculator.setMagicResistance(5)
resistanceCalculator.setDodgeChance(10)
resistanceCalculator.setPhysicalResistance(2)

test('Resistances are properly set', () => {
  expect(resistanceCalculator.getMagicResistance()).toEqual(25)
  expect(resistanceCalculator.getDodgeChance()).toEqual(30)
  expect(resistanceCalculator.getPhysicalResistance()).toEqual(10)
})


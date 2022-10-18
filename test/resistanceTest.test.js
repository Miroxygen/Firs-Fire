import { ResistanceCalculator } from "../src/components/resistance-calculator.js";


const resistanceCalculator = new ResistanceCalculator()

resistanceCalculator.setMagicResistance(5)
resistanceCalculator.setDodgeChance(10)
resistanceCalculator.setPhysicalResistance(2)

test('Magc resistances are properly set', () => {
  expect(resistanceCalculator.getMagicResistance()).toEqual(25)
})

test('Physical resistances are properly set', () => {
  expect(resistanceCalculator.getPhysicalResistance()).toEqual(10)
})

test('Dodge resistances are properly set', () => {
  expect(resistanceCalculator.getDodgeChance()).toEqual(30)
})


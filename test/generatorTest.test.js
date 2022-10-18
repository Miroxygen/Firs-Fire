import { CharacterGenerator } from "../src/components/imported/fantasy-component-generator/generators/character-generator.js";
import { MonsterGenerator } from "../src/components/imported/fantasy-component-generator/generators/monster-generator.js";

const characterGenerator = new CharacterGenerator()

const monsterGenerator = new MonsterGenerator()

const character = characterGenerator.getCharacter()

const monster = monsterGenerator.getRandomMonster()

test('Character generator delivers object', () => {
  expect(typeof(character) === "object").toEqual(true)
})

test('Monster generator delivers object', () => {
  expect(typeof(monster) === "object").toEqual(true)
})


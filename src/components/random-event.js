

export class RandomEvent {
  constructor() {
    this.events = [this.monsterEvent, this.beggarEvent, this.innEvent, this.madmanEvent]

    this.monsterEvent = {
      name : "Monster",
      description : "A monster has appeared. Fight it!"
    }

    this.beggarEvent = {
      name : "Beggar",
      description : "You find a beggar on the road. You donate 5 silver coins."
    }

    this.innEvent = {
      name : "Inn",
      description : "There is a local inn on the road. You stop for refreshments."
    }

    this.madmanEvent = {
      name : "Madman",
      description : "You find a soaked and dirty old man praying to a dead tree. He whispers 'The milk is in the hare!' You quickly walk away."
    }
  }

  getRandomEvent() {
    const randomEvent = this.events[3]
    return "hej"
  }
}
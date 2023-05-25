const { AbstractAnimalSpecies } = require("../animal-species.abstract");

class Dog extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "guau";
  }
}

module.exports = { Dog }
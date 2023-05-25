const { AbstractAnimalSpecies } = require("../animal-species.abstract");

class Duck extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "quack";
  }
}

module.exports = { Duck }
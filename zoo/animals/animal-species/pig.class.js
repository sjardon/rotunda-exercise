const { AbstractAnimalSpecies } = require("../animal-species.abstract");

class Pig extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "oink";
  }
}

module.exports = { Pig }
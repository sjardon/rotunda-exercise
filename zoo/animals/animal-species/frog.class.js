const { AbstractAnimalSpecies } = require("../animal-species.abstract");

class Frog extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "ribbit";
  }
}

module.exports = { Frog }
const { AbstractAnimalSpecies } = require("../animal-species.abstract");

class Cow extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "moo";
  }
}

module.exports = { Cow }
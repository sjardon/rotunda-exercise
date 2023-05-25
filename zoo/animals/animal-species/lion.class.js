const { AbstractAnimalSpecies } = require("../animal-species.abstract");

class Lion extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "roar";
  }
}

module.exports = { Lion }
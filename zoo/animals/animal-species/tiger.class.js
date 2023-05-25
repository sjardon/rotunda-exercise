const { AbstractAnimalSpecies } = require("../animal-species.abstract");

class Tiger extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "grrr";
  }
}

module.exports = { Tiger }
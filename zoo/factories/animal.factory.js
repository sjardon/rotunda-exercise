const { Cow } = require("../animals/animal-species/cow.class");
const { Dog } = require("../animals/animal-species/dog.class");
const { Lion } = require("../animals/animal-species/lion.class");
const { Tiger } = require("../animals/animal-species/tiger.class");
const { Duck } = require("../animals/animal-species/duck.class");
const { Frog } = require("../animals/animal-species/frog.class");
const { Pig } = require("../animals/animal-species/pig.class");

const animalTypeMapper = {
  cow: new Cow(),
  dog: new Dog(),
  duck: new Duck(),
  frog: new Frog(),
  lion: new Lion(),
  pig: new Pig(),
  tiger: new Tiger(),
};

class AnimalFactory {
  createByType(type) {
    if (!animalTypeMapper[type]) {
      throw new Error("Animal type not found");
    }

    return animalTypeMapper[type];
  }
}

module.exports = { AnimalFactory };
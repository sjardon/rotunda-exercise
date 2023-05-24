import { Animal } from "../animals/animal.interface";
import { Cow } from "../animals/animal-species/cow.class";
import { Dog } from "../animals/animal-species/dog.class";
import { Lion } from "../animals/animal-species/lion.class";
import { Tiger } from "../animals/animal-species/tiger.class";
import { Duck } from "../animals/animal-species/duck.class";
import { Frog } from "../animals/animal-species/frog.class";
import { Pig } from "../animals/animal-species/pig.class";

import { ENUM_ANIMAL_TYPES } from "../animals/constants/animal-type.enum.constant";

const animalTypeMapper = {
  cow: new Cow(),
  dog: new Dog(),
  duck: new Duck(),
  frog: new Frog(),
  lion: new Lion(),
  pig: new Pig(),
  tiger: new Tiger(),
};

export class AnimalFactory {
  createByType(type: ENUM_ANIMAL_TYPES): Animal {
    if (!animalTypeMapper[type]) {
      throw new Error("Animal type not found");
    }

    return animalTypeMapper[type];
  }
}

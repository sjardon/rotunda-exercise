import { Lion } from "../animals/animal-species/lion.class";
import { Tiger } from "../animals/animal-species/tiger.class";
import { Animal } from "../animals/animal.interface";

import { ENUM_ANIMAL_TYPES } from "../animals/constants/animal-type.enum.constant";

const animalTypeMapper = {
  lion: new Lion(),
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

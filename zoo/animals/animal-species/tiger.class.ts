import { AbstractAnimalSpecies } from "./animal-species.abstract";

export class Tiger extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "grrr";
  }
}

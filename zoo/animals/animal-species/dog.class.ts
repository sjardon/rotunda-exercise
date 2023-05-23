import { AbstractAnimalSpecies } from "./animal-species.abstract";

export class Dog extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "guau";
  }
}

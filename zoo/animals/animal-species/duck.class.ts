import { AbstractAnimalSpecies } from "./animal-species.abstract";

export class Duck extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "quack";
  }
}

import { AbstractAnimalSpecies } from "./animal-species.abstract";

export class Pig extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "oink";
  }
}

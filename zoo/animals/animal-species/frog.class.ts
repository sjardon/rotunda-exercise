import { AbstractAnimalSpecies } from "./animal-species.abstract";

export class Frog extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "ribbit";
  }
}

import { AbstractAnimalSpecies } from "./animal-species.abstract";

export class Cow extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "moo";
  }
}

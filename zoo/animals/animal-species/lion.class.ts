import { Animal } from "../animal.interface";
import { AbstractAnimalSpecies } from "./animal-species.abstract";

export class Lion extends AbstractAnimalSpecies {
  constructor() {
    super();
    this.animalSound = "roar";
  }
}

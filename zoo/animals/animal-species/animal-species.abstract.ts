import { Animal } from "../animal.interface";

export abstract class AbstractAnimalSpecies implements Animal {
  protected animalSound: string;

  // abstract speak(phrase: string): string;

  speak(phrase: string): string {
    return phrase
      .split(" ")
      .map((word) => `${word} ${this.animalSound}`)
      .join(" ");
  }
}

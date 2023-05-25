class AbstractAnimalSpecies {
  animalSound;

  speak(phrase) {
    // TODO: validate, is string
    return phrase
      .split(" ")
      .map((word) => `${word} ${this.animalSound}`)
      .join(" ");
  }
}

module.exports = { AbstractAnimalSpecies };
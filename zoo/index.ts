import { ENUM_ANIMAL_TYPES } from "./animals/constants/animal-type.enum.constant";
import { AnimalFactory } from "./factories/animal.factory";

function run() {
  const [animalType, phrase] = process.argv.slice(2);

  if (!animalType || !phrase) {
    console.log("Please, send {animalType} {someMessage}");
    return;
  }

  try {
    const animalFactory = new AnimalFactory();
    const animal = animalFactory.createByType(animalType as ENUM_ANIMAL_TYPES);
    console.log(animal.speak(phrase));
  } catch (error) {
    console.log(error.message);
  }

  return;
}

run();

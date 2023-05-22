import { ENUM_ANIMAL_TYPES } from "./animals/constants/animal-type.enum.constant";
import { AnimalFactory } from "./factories/animal.factory";

const [animalType, phrase] = process.argv.slice(2);

const animalFactory = new AnimalFactory();

const animal = animalFactory.createByType(animalType as ENUM_ANIMAL_TYPES);

console.log(animal.speak(phrase));

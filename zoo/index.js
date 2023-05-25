const { AnimalFactory } = require("./factories/animal.factory");

function run() {
  const [animalType, phrase] = process.argv.slice(2);

  if (!animalType || !phrase) {
    console.log("Please, send {animalType} {someMessage}");
    return;
  }

  try {
    const animalFactory = new AnimalFactory();
    const animal = animalFactory.createByType(animalType);
    console.log(animal.speak(phrase));
  } catch (error) {
    console.log(error.message);
  }

  return;
}

run();

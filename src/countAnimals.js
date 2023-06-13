const data = require('../data/zoo_data');

const countAnimals = (animal) => {
  if (!animal) {
    return data.species
      .reduce((countSpecies, specie) =>
        ({ ...countSpecies, [specie.name]: specie.residents.length }), {});
  }

  const { species: specieAnimal, sex } = animal;
  const animalData = data.species
    .find((specie) => specie.name === specieAnimal);

  if (sex) {
    return animalData.residents
      .filter((residents) => residents.sex === sex).length;
  }

  return animalData.residents.length;
};

console.log(countAnimals());
module.exports = countAnimals;

const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) =>
  data.species.find(({ name }) => name === animal).residents
    .every((animalResidents) => animalResidents.age > age);

console.log(getAnimalsOlderThan('bears', 3));

module.exports = getAnimalsOlderThan;

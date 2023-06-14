const data = require('../data/zoo_data');

const findEmployee = (employeeId) => data.employees
  .find(({ id }) => id === employeeId);

const getOldest = (specieId) =>
  data.species.find(({ id }) => id === specieId).residents
    .reduce((Oldest, animal) => Oldest.age > animal.age ? Oldest : animal, 0);

const getOldestFromFirstSpecies = (id) => {
  const employeeData = findEmployee(id);
  if (employeeData) {
    const fistSpecieId = employeeData.responsibleFor[0];
    const {name, sex, age} = getOldest(fistSpecieId)
    return [name, sex, age];
  }
  return 'Colaborador não encontrado.'
};

console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

module.exports = getOldestFromFirstSpecies;

const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => {
  // seu código aqui
  const speciesName = [];
  if (ids.length !== 0) {
    ids.forEach((id) => {
      const specieData = data
        .species.find((specie) => specie.id === id);

      if (specieData) speciesName.push(specieData);
    });
    return speciesName;
  }
  return [];
};

// console.log(getSpeciesByIds(frogsId, 'e8481c1d-42ea-4610-8e1-1752cfc05a46'));
module.exports = getSpeciesByIds;

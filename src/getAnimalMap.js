const { species } = require('../data/zoo_data');

const getUniqueLocations = () => [...new Set(species
  .map(({ location }) => location))];

const getSpeciesNameByRegion = (region) => species
  .filter(({ location }) => location === region)
  .map(({ name }) => name);

const getAnimalsNameBySpecie = (region, filterRule) =>
  getSpeciesNameByRegion(region)
    .map((specieName) => ({
      [specieName]: species.find((specie) => specie.name === specieName).residents
        .filter(({ sex }) => (filterRule ? (sex === filterRule) : true))
        .map(({ name }) => name),
    }));

const getSpeciesMapByRegion = (callback, filterRule) => {
  const regions = getUniqueLocations();

  return regions.reduce((speciesMap, region) =>
    ({
      ...speciesMap,
      [region]: callback(region, filterRule),
    }), {});
};

const sortAnimalsName = (animalsMap) => {
  const regions = getUniqueLocations();

  return regions.reduce((speciesMap, region) =>
    ({
      ...speciesMap,
      [region]: animalsMap[region].map((specie) => {
        const specieName = Object.keys(specie);
        return { [specieName]: specie[specieName].sort() };
      }),
    }), {});
};

const verifyFilter = (filtered) => {
  switch (filtered) {
  case 'male':
    return getSpeciesMapByRegion(getAnimalsNameBySpecie, filtered);
  case 'female':
    return getSpeciesMapByRegion(getAnimalsNameBySpecie, filtered);
  default:
    return getSpeciesMapByRegion(getAnimalsNameBySpecie);
  }
};

const verifyParameter = (options) => {
  const { includeNames = false, sex = '', sorted = false } = options;

  if (!includeNames) return getSpeciesMapByRegion(getSpeciesNameByRegion);

  const animalsMap = verifyFilter(sex);

  if (sorted) return sortAnimalsName(animalsMap);

  return animalsMap;
};

const getAnimalMap = (options) => {
  if (!options
    || (options && (!Object.keys(options).length))
    || (typeof options === 'string')) {
    return getSpeciesMapByRegion(getSpeciesNameByRegion);
  }

  return verifyParameter(options);
};

// console.log(getAnimalMap({includeNames: true})['NE']);
// console.log('sorder abaixo');
// console.log(getAnimalMap({includeNames: true, sorted: true})['NE']);
// console.log('Filtrado por female');
// console.log(getAnimalMap({includeNames: true, sorted: true, sex: 'female'})['NE']);
// console.log('Filtrado por male');
// console.log(getAnimalMap({includeNames: true, sorted: true, sex: 'male'})['NE']);

module.exports = getAnimalMap;

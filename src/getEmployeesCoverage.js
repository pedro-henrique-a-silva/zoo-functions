const data = require('../data/zoo_data');

const getEmployee = (employeeName = '', employeeId = '') =>
  data.employees
    .find(({ id, firstName, lastName }) =>
      id === employeeId || employeeName === firstName || employeeName === lastName);

const getSpeciesName = (speciesList, info) => speciesList
  .map((specieId) => data.species.find(({ id }) => id === specieId)[info]);

const getAllEmployeesCoverage = () =>
  data.employees
    .reduce((allEmployees, employee) => {
      const { id, firstName, lastName, responsibleFor } = employee;
      const fullName = `${firstName} ${lastName}`;
      const species = getSpeciesName(responsibleFor, 'name');
      const locations = getSpeciesName(responsibleFor, 'location');
      return [
        ...allEmployees,
        { id, fullName, species, locations },
      ];
    }, []);

const getEmployeesCoverage = (employeeInfo) => {
  if ((!employeeInfo)) return getAllEmployeesCoverage();

  const { name = '', id = '' } = employeeInfo;
  const employeeData = getEmployee(name, id);

  if (!employeeData) throw new Error('Informações inválidas');

  return {
    id: employeeData.id,
    fullName: `${employeeData.firstName} ${employeeData.lastName}`,
    species: getSpeciesName(employeeData.responsibleFor, 'name'),
    locations: getSpeciesName(employeeData.responsibleFor, 'location'),
  };
};

// console.log(getEmployeesCoverage());

module.exports = getEmployeesCoverage;

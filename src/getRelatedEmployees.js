const data = require('../data/zoo_data');

const isManager = (id) => {
  const { employees } = data;
  return employees
    .some((employee) => employee.managers.includes(id));
};

const getRelatedEmployees = (managerId) => {
  // seu código aqui
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  const { employees } = data;

  return employees.filter(({ managers }) => managers.includes(managerId))
    .map(({ firstName, lastName }) => `${firstName} ${lastName}`);
};

// console.log(isManager(stephanieId));
module.exports = { isManager, getRelatedEmployees };

const data = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => {
  const { employees: employeeData } = data;
  const employee = employeeData
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);

  return (employee !== undefined) ? employee : {};
};

// console.log(getEmployeeByName());

module.exports = getEmployeeByName;

const data = require('../data/zoo_data');

// getSchedule('lions');
// // o retorno será [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ];

const getScheduleAnimalDay = (weekDay) => data.species
  .filter(({ availability }) => availability.includes(weekDay))
  .map(({ name }) => name);

const getScheduleHourDay = (weekDay) => {
  const { open, close } = data.hours[weekDay];
  if (open <= 0 && close <= 0) {
    return 'CLOSED';
  }

  return `Open from ${open}am until ${close}pm`;
};

const getScheduleObject = (weekDay) => {
  const animals = getScheduleAnimalDay(weekDay);
  return { [weekDay]: {
    officeHour: getScheduleHourDay(weekDay),
    exhibition: (!animals.length) ? 'The zoo will be closed!' : animals,
  } };
};

const getCompleteSchedule = (weekDays) => weekDays
  .reduce((scheduleComplete, weekDay) => ({
    ...scheduleComplete,
    ...getScheduleObject(weekDay),
  }), {});

const getSchedule = (scheduleTarget) => {
  // seu código aqui
  const animalSchedule = data.species.find((specie) => specie.name === scheduleTarget);
  if (animalSchedule) return animalSchedule.availability;

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'];

  if (weekDays.includes(scheduleTarget)) return getScheduleObject(scheduleTarget);

  return getCompleteSchedule(weekDays);
};

// console.log(getSchedule('xablau'));
module.exports = getSchedule;

const data = require('../data/zoo_data');

const countEntrants = (entrants) => ({
  child: entrants.filter(({ age }) => age < 18).length,
  adult: entrants.filter(({ age }) => age >= 18 && age < 50).length,
  senior: entrants.filter(({ age }) => age >= 50).length,
});

// Ao receber um array de pessoas com 3 crianças, 2 pessoas adultas e 1 pessoa mais velha retorna o valor correto;
// Ao receber um array com 1 pessoa adulta retorna o valor correto;
// Ao receber um array com 1 pessoa mais velha retorna o valor correto;
// Ao receber um array com 1 criança retorna o valor correto;
// Ao receber um array com 1 criança e 1 pessoa mais velha retorna o valor correto.

const calculateEntry = (entrants) => {
  if ((!entrants) || (!entrants.length)) return 0;

  const entrantsCounted = countEntrants(entrants);
  const { prices } = data;

  return Object.keys(entrantsCounted)
    .reduce((total, faixaEtaria) =>
      total + (entrantsCounted[faixaEtaria] * prices[faixaEtaria]), 0);
};

// console.log(calculateEntry(entrants));
module.exports = { calculateEntry, countEntrants };
